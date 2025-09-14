// src/mail/mail.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

constructor() {
  this.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',       // Gmail SMTP server
    port: 465,                    // 465 for SSL (recommended), or 587 for TLS
    secure: true,                 // true for port 465, false for 587
    auth: {
      user: 'toriquldev000@gmail.com', // your Gmail address
      pass: 'wvmw edzc cyum aucw',     // your App Password (not your Gmail password!)
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
