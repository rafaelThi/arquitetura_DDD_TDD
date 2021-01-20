import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvaider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    console.log('123456');
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      console.log(account);

      this.client = transporter;
    });
  }

  public async sendMail(to:string, body:string):Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarer <rafael.pereira20@icloud.com>',
      to,
      subject: 'Recuperação de senha ✔',
      text: body,
    });
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
