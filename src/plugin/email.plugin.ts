/* import nodemailer from "nodemailer"; */

/* export const transporterLead = nodemailer.createTransport({
  headers: {
    "x-priority": "1",
    "x-msmail-priority": "High",
    importance: "high",
  },
  service: "Hostinger",
  host: process.env.SMTP_HOST,
  port: +(process.env.SMTP_PORT ?? "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporterLead
  .verify()
  .then(() => {
    console.log(
      "Ready for send email for ".concat("[", CONTACT_INFO.businessTitle, "]")
    );
  })
  .catch((err: any) => {
    console.log("Error sending email", JSON.stringify(err));
  }); */