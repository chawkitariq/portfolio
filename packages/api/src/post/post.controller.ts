import {
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { v7 as uuidv7 } from 'uuid';
import { extname } from 'node:path';
import { PostService } from './post.service';
import { Public } from 'src/decorators/public.decorator';

export type UploadedFileResponse = {
  url: string;
};

@Controller()
export class PostController {
  private readonly logger = new Logger(PostController.name);
  private readonly s3: S3Client;
  private readonly bucketName: string;
  private readonly appUrl: string;

  constructor(
    private readonly postService: PostService,
    private readonly configService: ConfigService,
  ) {
    this.bucketName = this.configService.getOrThrow<string>('S3_BUCKET_NAME');
    this.appUrl = this.configService.getOrThrow<string>('APP_URL');

    this.s3 = new S3Client();
  }

  @Get('posts')
  @Public()
  findAll() {
    return this.postService.findAll();
  }

  @Get('posts/:id')
  @Public()
  findOne(@Param('id', new ParseIntPipe({ optional: false })) id: number) {
    return this.postService.findOne(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif|webp|pdf|svg)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024, // 10MB
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    const ext = extname(file.originalname);
    const filename = `${uuidv7()}${ext}`;
    const uploadParams = {
      Bucket: this.bucketName,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    await this.s3.send(new PutObjectCommand(uploadParams));
    return {
      url: `${this.appUrl}/assets/${filename}`,
    };
  }

  @Get('assets/:filename')
  async assets(@Param('filename') filename: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
    });
    let file: GetObjectCommandOutput | undefined;
    try {
      file = await this.s3.send(command);
    } catch (error) {
      this.logger.error(`Failed to get file ${filename} from S3`, error);
      throw new NotFoundException('File not found');
    }
    const body = await file?.Body?.transformToByteArray();
    return new StreamableFile(body!, {
      type: file.ContentType,
      disposition: `inline; filename="${filename}"`,
    });
  }
}
