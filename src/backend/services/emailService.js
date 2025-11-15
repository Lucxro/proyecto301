import nodemailer from "nodemailer";

export async function sendEmail(email, name, link) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const html = `
    <h2>Hola ${name}</h2>
    <p>Solicitaste cambiar tu contraseña.</p>
    <p>Haz clic aquí:</p>
    <a href="${link}" style="font-size:16px;color:#1d4ed8">${link}</a>
    <p>Este enlace expira en 30 minutos.</p>
  `;

  await transport.sendMail({
    from: "ALTech <no-reply@altech.com>",
    to: email,
    subject: "Recuperar contraseña",
    html
  });
}
