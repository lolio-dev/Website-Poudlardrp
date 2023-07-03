import { TransactionsDto } from '../../resources/transactions/dto/transactions.dto';
import { PdfProduct } from '../../types/PdfProduct';
import * as PDFDocument from 'pdfkit';
import { mmToPt } from '../mmToPt/mmToPt';
import { ProfileSchema } from '../../resources/profile/entity/profile.schema';

const $space = 8;

export const generatePDF = async (
  transaction: TransactionsDto,
  profile: ProfileSchema,
  products: PdfProduct[]
): Promise<Buffer> => {
  return await new Promise(resolve => {
    const currency = transaction.currency === 'gem' ? 'G' : '€';
    const doc = new PDFDocument({
      size: 'A4',
      bufferPages: true,
    });
    doc.font('Helvetica');
    addHeader(doc, transaction, profile.email);
    addTableHeader(doc);
    addTableRows(doc, products, currency, transaction.price.toString());
    doc.end();

    const buffer = [];
    doc.on('data', buffer.push.bind(buffer));
    doc.on('end', () => {
      const data = Buffer.concat(buffer);
      resolve(data);
    });
  });
};

const addHeader = (doc: PDFKit.PDFDocument, transaction: TransactionsDto, email: string) => {
  doc
    .fontSize(10)
    .fillColor([150, 150, 150])
    .text(`Wizard Universe - ${transaction.date}`, mmToPt($space * 3), mmToPt($space))
    .text(
      `154 rue de la Croix de Tricoux 34980 Saint-Gély-du-Fesc`,
      mmToPt($space * 12),
      mmToPt($space)
    )
    .text(`${email}`, mmToPt($space * 3), mmToPt($space * 2))
    .text(`#${transaction.invoiceId}`, mmToPt($space * 14.5), mmToPt($space * 2));
};

const addTableHeader = (doc: PDFKit.PDFDocument) => {
  doc
    .moveTo(mmToPt($space * 2), mmToPt($space * 3))
    .lineWidth(mmToPt(0.5))
    .rect(mmToPt($space * 2), mmToPt($space * 3), mmToPt($space * 22.25), mmToPt($space * 2))
    .fillAndStroke([61, 177, 172], [29, 147, 141])
    .fontSize(12)
    .fillColor('white')
    .strokeColor([221, 221, 221])
    .text('NAME', mmToPt($space * 3), mmToPt($space * 3.8))
    .text('QUANTITY', mmToPt($space * 14), mmToPt($space * 3.8))
    .text('PRICE', mmToPt($space * 21), mmToPt($space * 3.8));
};

const addTableRows = (
  doc: PDFKit.PDFDocument,
  products: PdfProduct[],
  currency: string,
  prices: string
) => {
  let y = $space * 6;
  products.forEach((product, index) => {
    if (index !== 0 && index % 13 === 0) {
      addBorder(doc, y);
      doc.addPage();
      addTableHeader(doc);
      y = $space * 6;
    }
    addTableRow(doc, product, currency, y);
    y += $space * 2;
  });

  addBorder(doc, y);
  addTableFooter(doc, y, prices, currency);
};

const addTableRow = (doc: PDFKit.PDFDocument, product: PdfProduct, currency: string, y: number) => {
  const quantity = product.quantity.toString();
  const price = (product.amount * product.quantity).toString();

  doc
    .strokeColor([221, 221, 221])
    .fontSize(14)
    .fillColor([64, 64, 64])
    .text(product.item, mmToPt($space * 3), mmToPt(y))
    .text(quantity, mmToPt($space * 16.25 - (quantity.length - 1) * 2.7), mmToPt(y))
    .text(price, mmToPt($space * 21.8 - (price.length - 1) * 2.83), mmToPt(y))
    .moveTo(mmToPt($space * 2), mmToPt(y + $space * 1.25))
    .lineTo(mmToPt(194), mmToPt(y + $space * 1.25))
    .stroke();

  if (currency === 'G') {
    addGemIcon(doc, y, [64, 64, 64], [255, 255, 255]);
  } else {
    doc.text(currency, mmToPt($space * 22.15), mmToPt(y));
  }
};

const addBorder = (doc: PDFKit.PDFDocument, y: number) => {
  doc
    .strokeColor([221, 221, 221])
    .moveTo(mmToPt($space * 2), mmToPt($space * 5) + 1)
    .lineTo(mmToPt($space * 2), mmToPt(y - 6))
    .stroke()
    .moveTo(mmToPt($space * 24.25), mmToPt($space * 5) + 1)
    .lineTo(mmToPt($space * 24.25), mmToPt(y - 6))
    .stroke();
};

const addTableFooter = (doc: PDFKit.PDFDocument, y: number, price: string, currency: string) => {
  doc
    .moveTo(mmToPt($space * 2), mmToPt(y - 6))
    .lineWidth(mmToPt(0.5))
    .rect(mmToPt($space * 2), mmToPt(y - 6), mmToPt($space * 22.25), mmToPt($space * 2))
    .fillAndStroke([61, 177, 172], [29, 147, 141])
    .fillColor('white')
    .image('src/assets/logo.png', mmToPt($space * 2.9), mmToPt(y - 7), {
      width: mmToPt(18),
    })
    .text(price, mmToPt($space * 21.8 - (price.length - 1) * 2.83), mmToPt(y));

  if (currency === 'G') {
    addGemIcon(doc, y, [255, 255, 255], [61, 177, 172]);
  } else {
    doc.text(currency, mmToPt($space * 22.15), mmToPt(y));
  }
};

const addGemIcon = (
  doc: PDFKit.PDFDocument,
  y: number,
  strokeColor: PDFKit.Mixins.ColorValue,
  backColor: PDFKit.Mixins.ColorValue
) => {
  const circleX = mmToPt($space * 22.5) * 13.3333333;
  const circleY = mmToPt(y + 1.8) * 13.3333333;
  const r = mmToPt(30);

  const crownX = mmToPt($space * 22.35) * 13.3333333;
  const crownY = mmToPt(y + 1.85) * 13.3333333;

  doc
    .scale(0.075, 0.075)
    .path(
      `M ${circleX - r}, ${circleY}
      a ${r},${r} 0 1,0 ${r * 2},0
      a ${r},${r} 0 1,0 -${r * 2},0`
    )
    .fillAndStroke(strokeColor)
    .path(
      `M ${circleX - r * 0.75}, ${circleY}
      a ${r * 0.75},${r * 0.75} 0 1,0 ${r * 0.75 * 2},0
      a ${r * 0.75},${r * 0.75} 0 1,0 -${r * 0.75 * 2},0`
    )
    .fillAndStroke(backColor)
    .path(
      `M ${crownX} ${crownY} l -4 -25 15 6 15 6 9 -13 8 -13 8 13 9 13 15 -6 15 -6 -4 25 -5 26 -38 0 -38 0 -5 -26 z`
    )
    .fillAndStroke(strokeColor)
    .scale(13.3333333, 13.3333333);
};
