/* eslint-disable no-unused-labels */
import { MailTransporter } from './mailTransporter';

export class DummyTransporter extends MailTransporter {
  createTransport() {
    return () => {
      sendMail: (mailOptions: any) => {
        console.log('Sending email', mailOptions);
      };
    };
  }
}
