import nodemailer from "nodemailer";
import { emailTemplates } from "../templates/Email.template";

const gmailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  }
})

function replacePlaceholders(template: string, variables: { [key: string]: string }): string {
  return Object.keys(variables).reduce((result, key) => {
    const placeholder = `{{${key}}}`;
    return result.replace(new RegExp(placeholder, 'g'), variables[key]);
  }, template);
}

export async function sendEmail(
  templateName: keyof typeof emailTemplates,
  { to, cc = [], bcc = [] }: { to: string; cc?: string[]; bcc?: string[] },
  variables: { [key: string]: string }
) {
  const template = emailTemplates[templateName];

  if (!template) {
    throw new Error(`Template "${templateName}" not found`);
  }

  const { subject, body } = template;

  // Validate required variables are provided
  const subjectVariables = body.match(/{{\w+}}/g)?.map(v => v.slice(2, -2)) || [];
  const bodyVariables = body.match(/{{\w+}}/g)?.map(v => v.slice(2, -2)) || [];
  for (const variable of [...subjectVariables, ...bodyVariables]) {
    if (!variables[variable]) {
      throw new Error(`Missing variable for placeholder: ${variable}`);
    }
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    cc,
    bcc,
    subject: replacePlaceholders(subject, variables),
    html: replacePlaceholders(body, variables),
  };

  return gmailTransport.sendMail(mailOptions);
}