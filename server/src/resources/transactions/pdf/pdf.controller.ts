import { Controller, UseGuards, Param, Get, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { Profile } from '../../../utils/decorators/profile.decorator';
import { PDFService } from './pdf.service';
import { Response } from 'express';
import { ProfileSchema } from '../../profile/entity/profile.schema';

@ApiTags('Pdf')
@Controller('pdf')
export class PDFController {
  constructor(private readonly pdfService: PDFService) {}

  @Get(':transactionId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generate Pdf' })
  @ApiResponse({ status: 200, description: 'Pdf created' })
  @ApiResponse({ status: 500, description: 'Unable to create Pdf' })
  async getPdf(
    @Param('transactionId') id: string,
    @Profile() profile: ProfileSchema,
    @Res() res: Response
  ): Promise<void> {
    const buffer: Buffer = await this.pdfService.generatePdf(profile, id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=facture_${id}.pdf`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
