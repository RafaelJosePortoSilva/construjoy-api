import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/infrastructure/persistence/prisma/prisma.module';
import { ClientModule } from './modules/clients/client.module';
import { UserModule } from './modules/users/user.module';
import { PaymentModule } from './modules/payments/payment.module';
import { ReceivableModule } from './modules/receivables/receivable.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    PrismaModule,
    ClientModule,
    UserModule,
    PaymentModule,
    ReceivableModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
