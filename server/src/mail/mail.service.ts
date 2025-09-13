// src/mail/mail.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // or use 'smtp.gmail.com' with port
      auth: {
        user: 'toriquldev000@gmail.com', // your gmail address
        pass: 'ymrr eoyh ifjq cxgn', // your app password
      },
    });
  }

async sendMail(mailOptions) {
  try {
 return await this.transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error)
    throw new Error('Failed to send email');
  }
}

}
