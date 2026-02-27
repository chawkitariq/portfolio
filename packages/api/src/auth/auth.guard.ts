import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { AuthAccesTokenPayload } from './auth.type';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      this.logger.debug('Public route accessed, skipping authentication');
      return true;
    }

    const request = this.getRequest(context);
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.warn('No JWT token found in request headers');
      throw new UnauthorizedException();
    }

    try {
      const payload: AuthAccesTokenPayload =
        await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        this.logger.warn('JWT token has expired');
        throw new UnauthorizedException('JWT token has expired');
      } else if (error instanceof JsonWebTokenError) {
        this.logger.warn('Invalid JWT token');
        throw new UnauthorizedException('Invalid JWT token');
      }
      this.logger.error('Error verifying JWT token', error);
      throw new UnauthorizedException();
    }

    return true;
  }

  /**
   * Extracts the request object from the execution context, handling both HTTP and GraphQL requests.
   * @param {ExecutionContext} context The execution context of the request, which can be either HTTP or GraphQL
   * @returns {Request} The extracted request object from the context, depending on the type of request (HTTP or GraphQL)
   */
  private getRequest(context: ExecutionContext): Request {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest<Request>();
    }

    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext<{ req: Request }>().req;
  }

  /**
   * Extracts the JWT token from the Authorization header of the request.
   * @param {Request} request The incoming HTTP request object
   * @returns {string | undefined} The extracted token if present and valid, otherwise undefined
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
