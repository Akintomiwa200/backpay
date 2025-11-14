import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { Web3Module } from '../web3/web3.module';
import { UsersModule } from '../users/users.module';
import { WhatsappModule } from '../whatsapp/whatsapp.module';

@Module({
  imports: [Web3Module, UsersModule, WhatsappModule],
  providers: [OnboardingService],
  exports: [OnboardingService],
})
export class OnboardingModule {}