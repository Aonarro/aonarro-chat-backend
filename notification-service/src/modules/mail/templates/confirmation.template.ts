export function getConfirmationTemplate(token: string): string {
  const code = `${token}`;

  return `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h1>Email Confirmation</h1>
        <p>Hello! To confirm your email address, please enter the following code:</p>
        <p>${code}</p>
        <p>This link is valid for 1 hour. If you did not request confirmation, please ignore this message.</p>
      </body>
    </html>
  `;
}
