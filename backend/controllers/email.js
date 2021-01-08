
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'upsht88@gmail.com',
        pass: 'uindidlyvzypeeuf',
    },
});

function createEmailBody(name, message) {
    let body = `Hello ${name}, \n\n`;
    body += 'Thank you for contacting us.\n\n'
        + 'A team member will follow up with you as soon as possible.\n\n';

    body += 'Your message to us: \n\n'
    body += message;

    return `<pre>${body}</pre>`;
}

function createInquiryEmailBody(model) {
    const { email, name, phone, projectDetails, additionalDetails, projectType } = model;

    let body = `Inquiry Info : \n\n`;
    body += `Name: ${name} \n`;
    body += `Email: ${email} \n`;
    body += `Phone: ${phone} \n`;
    body += `Project Type: ${projectType} \n`;
    body += `Project Details: ${projectDetails} \n`;
    body += `Additional Details: ${additionalDetails} \n`;

    return `<pre>${body}</pre>`;


}


exports.sendEmail = async (req, res) => {
    try {
        const { email, name, message, additionalDetails } = req.body.model;
        if (message) {
            const mailOptions = {
                from: 'donotreply@3xcel.com',
                to: email,
                bcc : 'upsth88@gmail.com',
                subject: 'Message Received : Thank you for reaching out to us.',
                html: createEmailBody(name, message),
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        if (additionalDetails) {
            const mailOptions2 = {
                from: 'donotreply@3xcel.com',
                to: 'upsth88@gmail.com',
                subject: '3xcel Inquiry',
                html: createInquiryEmailBody(req.body.model),
            };

            transporter.sendMail(mailOptions2, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};