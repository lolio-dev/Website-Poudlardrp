import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Response,
  HttpException,
  HttpStatus, Body, Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'graceful-fs';
import { Role } from '../../types/enums/role.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../utils/decorators/roles.decorator';
import { FilesService } from './files.service';
import * as fs from 'fs';
import * as path from "path";

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('*')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Upload a file' })
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Req() request) {
    return this.filesService.upload(file, this.getPath(request.url));
  }

  @Get('*')
  @ApiOperation({ summary: 'get a file' })
  getFile(@Response({ passthrough: true }) res, @Req() request): StreamableFile {
    const path = this.getPath(request.url);
    if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
      const file = createReadStream(path);

      res.set({
        'Content-Disposition': `attachment; filename="${path.split('/').slice(-1)}"`,
      });

      return new StreamableFile(file);
    } else {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'File not found' },
        HttpStatus.NOT_FOUND
      );
    }
  }

  private getPath(url: string) {
    const name: string[] = url.split('/');
    name.splice(0, 2);

    return path.join('.', 'src', 'assets',
        path
            .normalize(name.join('/'))
            .replace(/^(\.\.(\/|\\|$))+/, ''));
  }
}
