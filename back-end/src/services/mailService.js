import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Crypto Wallet Analytics. Активация аккаунта на ${process.env.CLIENT_URL}`,
      text: '',
      html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `,
    });
  }

  async sendPasswordMail(to, password) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Crypto Wallet Analytics. Вы зарегистрировались на ${process.env.CLIENT_URL}`,
      text: '',
      html: `
                <div>
                    <h1>Мы сгененрировали для Вас пароль.</h1>
                    <h4>Ваш пароль: ${password}</h4>
                </div>
            `,
    });
  }
}

export default new MailService();
