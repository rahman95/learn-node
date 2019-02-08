const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
  const inlined = juice(html); //turns to inline html, useful for email clients

  return inlined;
}

module.exports = mailer = {
  send: async (options) => {
    const html = generateHTML(options.filename, options);
    const text = htmlToText.fromString(html);

    const mailOptions = {
      from: "Rahman Younus <rahman_95@live.co.uk>",
      subject: options.subject,
      to: options.user.email,
      html,
      text
    }
    const sendMail = promisify(transport.sendMail, transport);

    return sendMail(mailOptions);
  },
}

//Test Mailer
// transport.sendMail({
//   from: 'Rahman Younus <rahman_95@live.co.uk>',
//   to: 'someone@example.com',
//   subject: 'Test Email',
//   html: '<h1>Hello World</h1>',
//   text: 'Hello World'
// })