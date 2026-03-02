import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { UserEntity } from '../../auth/entities/user.entity';
import datasource from '../datasource';

const logger = new Logger('SeedAdmin');

async function seedAdmin() {
  ConfigModule.forRoot();

  const configService = new ConfigService();

  const email = configService.getOrThrow<string>('ADMIN_EMAIL');
  const password = configService.getOrThrow<string>('ADMIN_PASSWORD');
  const hashRounds = +configService.getOrThrow<string>('HASH_ROUNDS');

  await datasource.initialize();

  const userRepository = datasource.getRepository(UserEntity);

  const exists = await userRepository.existsBy({ email });

  if (exists) {
    logger.log(`Admin "${email}" already exists, skipping seed.`);
    await datasource.destroy();
    return;
  }

  const hashedPassword = await hash(password, hashRounds);

  await userRepository.save(
    userRepository.create({ email, password: hashedPassword }),
  );

  logger.log(`Admin "${email}" created successfully.`);

  await datasource.destroy();
}

seedAdmin().catch((err) => {
  logger.error('Seed failed:', err);
  process.exit(1);
});
