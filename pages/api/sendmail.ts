// LIBS
import nodemailer from 'nodemailer';
import EMAIL_TEMPLATE from 'config/EmailTemplate';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        if (req?.method === 'POST') {
            console.log('::: BEGIN SEND EMAIL ::::');
            const transporter = nodemailer.createTransport({
                port: 465,
                host: 'smtp.migadu.com',
                auth: {
                    user: 'honghai@coderpush.com',
                    pass: 'admin@333',
                },
                secure: true,
            });

            const { SenderName, Email, ToName, LinkInvite } = req?.body;

            console.log('::: POST DATA :::');
            console.log(req?.body);

            let html = EMAIL_TEMPLATE;

            html = html.replace(/{{FULLNAME}}/g, ToName);
            html = html.replace(/{{SENDER_NAME}}/g, SenderName);
            html = html.replace(/{{LINK}}/g, LinkInvite);

            const mailData = {
                from: 'honghai@coderpush.com',
                to: Email,
                subject: `Invitation to join coderlab from ${SenderName} `,
                text: `Hello ${ToName} this is invitation send from CoderLab`,
                html,
            };

            transporter.sendMail(mailData, function (err: string, info: any) {
                if (err) console.log(err);
                else console.log(info);
            });

            res.status(200).json({ message: 'send mail success' });

            return true;
        }

        res.status(200).json({ message: 'something wrong' });
    } catch (err) {
        console.log('::: GOT SOME ISSUE :::', err);
        res.status(200).json({ message: 'something wrong' });
    }
}
