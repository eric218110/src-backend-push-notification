import { Module } from '@nestjs/common';
import { PrismaModule } from './../../shared/infra/prisma/prisma.module';
import { UtilsModule } from './../../shared/utils/module/utils.module';
import { ApplicationController } from './application.controller';
import { ApplicationMapper } from './application.mapper';
import { ApplicationService } from './application.service';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationMapper]
})
export class ApplicationModule { }