import nodemailer from 'nodemailer'
import 'dotenv/config'

export const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD
      }
})

export async function sendMail(verificationLink,email,name) {
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