

export const emailTemplates = {
  EMAIL_VERIFICATION: {
    subject: 'Verify Your Email Address | {{name}}',
    body: 'Hi, {{name}}, Thank you for registering on our platform. Please click on the link to verify your email {{url}}',
  },
  FORGOT_PASSWORD: {
    subject: 'Reset Your Password',
    body: 'Hi, {{name}}, You requested to reset your password. Please use the following link to reset it: {{resetUrl}}',
  }
};