import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendResetPasswordEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Recuperação de Senha - Morada Igreja Batista',
    html: `
      <h1>Recuperação de Senha</h1>
      <p>Você solicitou a recuperação de senha para sua conta no site da Morada Igreja Batista.</p>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${resetUrl}">Redefinir Senha</a>
      <p>Este link é válido por 1 hora.</p>
      <p>Se você não solicitou esta recuperação, ignore este email.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};