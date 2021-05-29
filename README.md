# NotifyMe - What does it do?
A backend service which does long polling on users DB to get the latest notifications about vaccine slots in India for every user stored.


#How do I run this?
1) Clone the repo
2) Provide the Mongo DB URI (can be local or cloud) inside database.js
3) Provide the authentication details for using gmail api for sending emails in EmailService.js(Please refer: https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a)
4) Hit npm install
5) Hit npm run start

#Backend is nice, where is the UI?
In progress.
