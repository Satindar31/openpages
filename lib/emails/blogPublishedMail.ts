import { render } from '@react-email/components';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import BlogPublished from '@/emails/blogPublished';
import React from 'react';

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

export default async function sendBlogPublishedEmail({username, title, url, to}: {username: string, title: string, url: string, to: {email: string, name: string}}) {
    const emailHtml = await render(React.createElement(BlogPublished, {
        username: username,
        blogTitle: title,
        blogUrl: url
      }));
    
      const sentFrom = new Sender("notifications@openpages.us.kg", "Blog Notifications");
      const recipients = [
        new Recipient(to.email, to.name)
      ];
    
      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject("New article published!")
        .setHtml(emailHtml)
    
      await mailerSend.email.send(emailParams);
}