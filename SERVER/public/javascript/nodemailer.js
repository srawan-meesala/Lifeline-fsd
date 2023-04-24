const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "lifeline.business.care@gmail.com",
        pass: "ntahlhazcazlasof"
    }
});

const options = {
    from: "lifeline.business.care@gmail.com",
    to: "mckcharan9@gmail.com",
    subject: "Verify your Lifeline Account.",
    text: "got it?"
};

transporter.sendMail(options, function (err, info) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("sent: " + info.response);
})
