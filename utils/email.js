import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.EMAIL_FROM || `no-reply@localhost`;

let transporter;
if (host && port && user && pass) {
  transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass }
  });
} else {
  transporter = null;
}

export async function sendResetPasswordEmail(to, token) {
  const frontend = process.env.FRONTEND_URL || `http://localhost:3000`;
  const resetUrl = `${frontend}/reset-password?token=${token}`;

  const subject = "Redefinição de senha";
  const text = `Para redefinir sua senha, acesse: ${resetUrl}`;
  const html = `<p>Para redefinir sua senha, clique no link abaixo:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`;

  if (!transporter) {
    
    return { info: "transporter not configured", token };
  }

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html
    });

    return info;
  } catch (err) {
    console.error("[email] Erro ao enviar e-mail:", err);
    throw err;
  }
}

export default { sendResetPasswordEmail };
