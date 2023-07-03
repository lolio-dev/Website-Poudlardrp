import * as nodemailer from 'nodemailer';
import { env } from 'process';

//Singleton
export class MailServices {
  private _instance = null;
  private _transporter = null;

  constructor() {
    if (!this._instance) {
      this._transporter = nodemailer.createTransport({
        host: env.EMAIL_HOST,
        port: parseInt(env.EMAIL_PORT),
        secure: true,
        auth: {
          user: env.EMAIL_USER,
          pass: env.EMAIL_PASS,
        },
      });
      this._instance = this;
    }
  }

  getTransporter(): nodemailer.Transporter {
    return this._transporter;
  }
}
