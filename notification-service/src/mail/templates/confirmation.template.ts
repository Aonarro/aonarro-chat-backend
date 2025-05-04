export function getConfirmationTemplate(token: string): string {
  const code = `${token}`;

  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f7fc;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            padding: 30px;
            text-align: center;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 30px auto;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            color: #3a3a3a;
            margin-bottom: 20px;
          }
          .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
          }
          .code {
            font-size: 28px;
            font-weight: bold;
            color: #007bff;
            padding: 10px 20px;
            background-color: #e7f4ff;
            border-radius: 4px;
            display: inline-block;
            margin: 20px 0;
          }
          .footer {
            font-size: 14px;
            color: #888;
            margin-top: 30px;
          }
          .footer a {
            color: #007bff;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Email Confirmation</div>
          <div class="message">
            <p>Hello!</p>
            <p>To confirm your email address, please use the following code:</p>
          </div>
          <div class="code">${code}</div>
          <div class="footer">
            <p>This code is valid for 1 hour. If you did not request this, please ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
