import { Controller, Post, Get, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  upload(@UploadedFiles() data: any) {
    return this.appService.upload(data);
  }

  @Post('mergeShardFile')
  @UseInterceptors(AnyFilesInterceptor())
  mergeShardFile(
    @Body() data: { urls: string[], name: string, oneSlice: number }
  ) {
    return this.appService.mergeShardFile(data);
  }

  @Get()
  hello () {
    return 'hello'
  }
}
