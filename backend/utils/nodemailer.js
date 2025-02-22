import nodemailer from 'nodemailer'
import 'dotenv/config'

export const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD
      }
})

export async function sendVerificationMail(verificationLink,email,name) {
    await transporter.sendMail({
        to: email,
        subject: 'Verify your email',
        html: `<head><style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
            line-height: 1.2;
        }
        a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 0.8em
        }
       .footer > p{
         color: grey;
       }
     a:hover{
      background-color: #4361EE; 
    }
        </style></head>
        <body>
         <div class="container">
            <h1>Welcome to Codebox!</h1>
            <p>Hi ${name},</p>
            <p>We just need to verify your email address before you can access Codebox.</p>
            <p>Please click the button below to verify your email address:</p>
            <p><a href=${verificationLink}>Verify your email address</a></p>
            <div class="footer">
                <p>&copy; 2025 Codebox. All rights reserved.</p>
            </div>
         </div>
       </body>
    `
      });
}

export async function sendResetPassMail({name,email,verificationLink}) {
  await transporter.sendMail({
    to: email,
    subject: 'Password reset',
    html : `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .content {
            font-size: 16px;
            color: #333333;
            line-height: 1.5;
        }
        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px;
            background: #007bff;
            color: #ffffff !important;
            text-align: center;
            text-decoration: none;
            font-size: 18px;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #777777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Reset Your Password</div>
        <div class="content">
            <p>Hello,${name}</p>
            <p>We received a request to reset your password. Click the button below to choose a new password:</p>
            <a href=${verificationLink} class="button">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thank you,${name}<br>Codebox</p>
        </div>
        <div class="footer">
            &copy; 2025 Codebox. All rights reserved.
        </div>
    </div>
</body>
</html>
`
  })
}