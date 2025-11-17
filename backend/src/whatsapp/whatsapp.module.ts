import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { Web3Module } from '../web3/web3.module';
import { UsersModule } from '../users/users.module';
import { OnboardingModule } from '../onboarding/onboarding.module';

@Module({
  imports: [ConfigModule, Web3Module, UsersModule, forwardRef(() => OnboardingModule)],
  providers: [WhatsappService],
  controllers: [WhatsappController],
  exports: [WhatsappService],
})
export class WhatsappModule {}