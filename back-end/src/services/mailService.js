class MailService {
  async sendActivationMail(to, link) {
    return { to, link };
  }
}

export default new MailService();
