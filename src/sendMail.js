import { createRequire } from 'module';
const require = createRequire(import.meta.url);

require('dotenv').config()
const nodemailer = require("nodemailer");

import {genericTemplate} from './templates/generic/generic.js'

export async function sendMail(data) {

    let transporter = nodemailer.createTransport({
        host: process.env.HOST_SENDER,
        // pool: true,
        // port: 465,
        // secure: true,
        port: 587,
        secure: false,
        auth: {
        user: process.env.EMAIL_SENDER, 
        pass: process.env.PSW_SENDER, 
        },
        tls: { rejectUnauthorized: false }
    });

    let template;

    if(data.template == 'algumIdentificador de template'){
        // AQUI PODE VIR OUTROS TIPOS DE TEMPLATE
    }else{
        template = genericTemplate(data)
    }

    let info = await transporter.sendMail({
        from: process.env.EMAIL_SENDER, 
        to: data.to, 
        cc: data.cc,
        subject: data.subject, 
        html: template,
        text: data.descricao, 
        alternatives: [
            {
                contentType: 'text/x-web-markdown',
                content: data.descricao
            }
        ],
        list: {
            // List-Help: <mailto:admin@example.com?subject=help>
            help: process.env.EMAIL_SENDER + '?subject=help',
            // List-Unsubscribe: <http://example.com> (Comment)
            unsubscribe: {
                url: 'http://example.com',
                comment: 'Comment'
            },
            // List-Subscribe: <mailto:admin@example.com?subject=subscribe>
            // List-Subscribe: <http://example.com> (Subscribe)
            subscribe: [
                process.env.EMAIL_SENDER + '?subject=subscribe',
                {
                    url: 'http://example.com',
                    comment: 'Subscribe'
                }
            ],
            // List-Post: <http://example.com/post>, <mailto:admin@example.com?subject=post> (Post)
            post: [
                [
                    'http://example.com/post',
                    {
                        url: process.env.EMAIL_SENDER + '?subject=post',
                        comment: 'Post'
                    }
                ]
            ]
        },
        headers: {
            'key':'Email',
            'x-processed': 'a really long header or value with non-ascii characters 👮',
            'x-unprocessed': {
                prepared: true,
                value: 'a really long header or value with non-ascii characters 👮'
            }
        }
  });

  console.log(info);
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  console.log(new Date())

}

//sendMail().catch(console.error);