const express = require('express');
const app = express();
const path = require('path');
const { get } = require("http");
const alert = require('alert');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
var collection = require('./models/register');
var collection2 = require('./models/registerHosp');
var Feedback = require('./models/feedback');
var appointments = require('./models/appoint');
var blogs = require('./models/blogs');
const collection4 = require('./models/admin');
const collection6 = require('./models/registerDoc');
const { log } = require('console');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.get('/', function (req, res) {
   res.render('home');
})

app.get('/home', function (req, res) {
   res.render('home');
})

app.get('/profile', async function (req, res) {
   const details = await collection.findOne({ username: UN })
   console.log(details)
   res.render('profile', { details: details })
})

app.post('/pathist',async (req,res) => {
   try{
      const data = []
      const username = req.body.usernameUs
      console.log(username);
      let result = (await appointments.find({username:username})).forEach((user)=>{
         data.push(user)
      })
      res.render('iframe-profile',{data,username})
   }catch(err){
      console.log(err);
   }
})

app.post('/prof', async (req,res)=>{
   const username = req.body.usernameUse;
   const result = await collection.findOne({username:username})
   res.render('profile',{details:result})
})

app.get('/iframe-profile',(req,res)=>{
   res.render('iframe-profile')
})

app.post('/home-page', function (req, res) {
   res.render('home-page');
})

app.get('/aboutUs', function (req, res) {
   res.render('aboutUs');
})

app.post('/editUser', function (req, res) {
   const usernameUser = req.body.usernameUser
   res.render('profile-edited', { usernameUser });
})

app.post('/editHosp', function (req, res) {
   const usernameUser = req.body.usernameUser
   res.render('hospital-profile-edited', { usernameUser });
})

app.post('/save-hosp', async (req, res) => {
   try {
      const username = req.body.usernameUser
      UN = username;
      try {
         const result = await collection2.updateOne({ userID: UN }, {
            $set: {
               hospName: req.body.hospName,
               mobNum: req.body.mobNum,
               city: req.body.city,
               ifDiag: req.body.DiagnosisCenter,
               bloodBank: req.body.BBHosp,
               odCamp: req.body.ODCamp
            }
         })
      } catch (err) {
         console.log(err);
      }
      const data2 = await collection2.findOne({ userID: UN });
      res.render('hospital-profile', { details: data2 })
   } catch (err) {
      console.log(err);
   }
})

app.get('/home-page', async function (req, res) {
   res.render('home-page');
})

app.get('/login', function (req, res) {
   res.render('login');
})

app.get('/getAppointment', function (req, res) {
   res.render('getAppointment');
})

app.get('/registerDoc', async (req, res) => {
   const details = [];
   const patientData = (await collection2.find().sort({ hospName: 1 })).forEach((user) => {
      details.push(user);
   });
   res.render('registerDoc', { details: details });
})

app.get('/registerHosp', function (req, res) {
   res.render('registerHosp');
})

app.get('/register', function (req, res) {
   res.render('register');
})

app.get('/blogs', function (req, res) {
   res.render('blogs');
})

// app.get('/formAdmin-bb', function (req, res) {
//    res.render('formAdmin-bb');
// })

// app.get('/formAdmin-diag', function (req, res) {
//    res.render('formAdmin-diag');
// })

app.post('/submit-login-doc', async (req, res) => {
   try {
      const username = req.body.username;
      UN = username;
      const approval1 = 'true';
      const approval2 = 'false';
      const check = await collection6.findOne({ docID: username })
      if(check){
      if (check.pass === req.body.password && check.approved === approval1) {
         res.render('profile-doc', { details: check })
      }
      else if (check.pass === req.body.password && check.approved === approval2) {
         alert('Your registration is successful Please wait for approval');
         res.render('login')
      }
      else if (check.pass === null) {
         alert('No such Doctor Exists')
      }
      else {
         alert('Incorrect Credentials')
      }
   }else{
      res.render('login');
      alert('Invalid Credentials')
     
   }
   }
   catch (error) {
      console.log(error.message)
   }
})

app.post('/edit-profile-doc', async function (req, res) {
   let docID = req.body.userID
   res.render('profile-doc-edited', {docID});
})

app.post('/editDocProfile',async (req,res)=>{
   let obs = req.body
   const docID = obs.docID
   UN = docID
   try{
      const result = await collection6.updateOne({docID:UN},{
         $set: {
            doctName: obs.docName,
            mobNum: obs.mobNum,
            price: obs.price,
            spec: obs.spec.toLowerCase()
         }
      })
   }catch(err){
      console.log(err);
   }
   const data = await collection6.findOne({docID: UN});
   res.render('profile-doc',{details:data})
})

app.post('/manageAppoint',async(req,res)=>{
 const username = req.body.docID;
 let data = []
 let patName = []
 let dName = []
 const fal = 'false'
 const result=(await appointments.find({docID:username, finished:fal})).forEach(async (user)=>{
   data.push(user)
 })
 res.render('profile-doc-show',{data})
})

app.get('/profile-doc-show',(req,res)=>{
   res.render('profile-doc-show')
})

app.post('/edit', async (req, res) => {
   try {
      const username = req.body.usernameUser
      UN = username;
      try {
         const result = await collection.updateOne({ username: UN }, {
            $set: {
               firstName: req.body.firstname,
               lastName: req.body.lastname,
               mobileNumber: req.body.mobile,
               dob: req.body.dob,
               bloodGroup: req.body.bloodGroup,
               maritalStatus: req.body.maritalStatus,
               gender: req.body.Gender
            }
         })
      } catch (err) {
         console.log(err);
      }
      const data2 = await collection.findOne({ username: UN });
      res.render('profile', { details: data2 })
   }
   catch (error) {
      console.log(error)
   }
})

app.post('/approveAppoint', async(req,res)=>{
   const did= req.body.did;
   const id= req.body.id;
   const time= req.body.time;
   const date= req.body.date;

   try{
      await appointments.updateOne({username:id, docID:did, Timeslot:time, Date:date},{
         $set: {
            approved:'true'
         }
      });
      res.render('approved',{did})
   }catch(err){
      console.log(err);
   }
})

app.post('/backapprove',async (req,res)=>{
   try {
      const username = req.body.did;
      UN = username;
      const check = await collection6.findOne({ docID: username })
      res.render('profile-doc', { details: check })
   }
   catch (error) {
      console.log(error.message)
   }
})

app.post('/submit-login-hosp', async (req, res) => {
   try {
      const username = req.body.username;
      UN = username
      const approval1 = 'true';
      const approval2 = 'false';
      const check = await collection2.findOne({ userID: username })
      if(check){
      if (check.pass === req.body.password && check.approved === approval1) {
         res.render('hospital-profile', { details: check })
      }
      else if (check.pass === req.body.password && check.approved === approval2) {
         alert('Your registration is successful Please wait for approval')
      }
      else if (check.pass === null) {
         alert('No such Hospital Exists')
      }
      else {
         alert('Incorrect Credentials')
      }
   }
   else {
      alert('Incorrect Credentials')
   }
   }
   catch (error) {
      console.log(error.message)
   }
})

app.get('/formAdmin-od', function (req, res) {
   res.render('formAdmin-od');
})

app.get('/formAdmin-doc', function (req, res) {
   res.render('formAdmin-doc');
})

app.get('/formAdmin-hosp', function (req, res) {
   res.render('formAdmin-hosp');
})

// app.get('/formAdmin-user',async function (req, res) {
//    try {
//       let allUserInfo = await collection.find({})
//       res.render('formAdmin-user', {data : allUserInfo});
//    } catch(err){
//       console.log(err);
//    }

// })

app.get('/formAdmin-user', (req, res) => {
   res.render('formAdmin-user');
})

app.post('/viewUser', async (req, res) => {

   const details = [];
   const patientData = (await collection.find().sort({ firstName: 1 })).forEach((user) => {
      details.push(user);
   });
   res.render('formAdmin-viewUser', { details: details });
})

app.get('/docRegister', (req, res) => {
   res.render('docRegister')
})

app.post('/applydoc', async (req, res) => {
   try {
      const username = req.body.username;
      const docData = await collection6.findOne({ docID: username });
      const city = await collection2.findOne({ userID: req.body.hospName })

      if (docData) {
         alert('User already exists');
      }
      else {
         const docdata = new collection6({
            doctName: req.body.doctName.toLowerCase(),
            mobNum: req.body.mobNum,
            emailID: req.body.emailID,
            hospName: city.hospName.toLowerCase(),
            city: city.city.toLowerCase(),
            hospID: req.body.hospName,
            spec: req.body.spec.toLowerCase(),
            price: req.body.price,
            docID: req.body.docID,
            pass: req.body.pass,
            approved: 'false'
         });

         const result = await docdata.save();

         if (docdata) {
            res.render('docRegister2');
         } else {
            alert('Your Registration has been failed.');
         }
      }
   }
   catch (error) {
      res.send(error.message);
   }
})


app.post('/viewhosp', async (req, res) => {

   const details = [];
   const hospData = (await collection2.find().sort({ hospName: 1 })).forEach((user) => {
      details.push(user);
   });
   res.render('formAdmin-viewhosp', { details: details });
})

app.post('/viewdoc', async (req, res) => {

   const details = [];
   const docData = (await collection6.find().sort({ docName: 1 })).forEach((user) => {
      details.push(user);
   });
   res.render('formAdmin-viewdoc', { details: details });
})

app.get('/formAdmin-viewdoc', (req, res) => {
   res.render('formAdmin-viewdoc')
})

app.post('/approvedoc', async (req, res) => {

   try {
      const doctname = req.body.addDoctor;
      const approval = 'false';
      const approve = await collection6.findOne({ docID: doctname }, { approved: approval });
      if (approve) {
         const tru = 'true'
         const result = await approve.updateOne({ approved: tru });
         if (result) {
            res.render('formAdmin-doc')
         }
         else {
            alert('Approval failed');
         }
      }
      else {
         alert('No Such Doctor Exists to be Approved');
      }
   }
   catch (error) {
      console.log(error)
   }
})

app.post('/removedoc', async (req, res) => {

   try {
      const doctId = req.body.remDoctor;
      const remove2 = await collection6.findOne({ docID: doctId });
      const remove = await remove2.deleteOne({ docID: doctId });
      if (remove) {
         res.render('formAdmin-doc')
      }
      else {
         alert('No Such Doctor Exists');
      }
   }
   catch (error) {
      console.log(error)
   }
})

app.get('/formAdmin-viewdoc', (req, res) => {
   res.render('formAdmin-viewdoc');
})

app.get('/formAdmin-viewhosp', (req, res) => {
   res.render('formAdmin-viewhosp');
})

app.post('/removeUser', async (req, res) => {

   try {
      const username = req.body.remUser;
      const remove = await collection.deleteOne({ firstName: username });
      if (remove) {
         res.render('formAdmin-user')
      }
      else {
         console.log('error')
      }
   }
   catch (error) {
      console.log(error)
   }
})

app.post('/removehosp', async (req, res) => {

   try {
      const hospname = req.body.remHospital;
      const remove2 = await collection2.findOne({ userID: hospname });
      const remove = await remove2.deleteOne({ userID: hospname });
      const remove3 = await collection6.deleteMany({hospID:hospname});
      if (remove) {
         res.render('formAdmin-hosp')
      }
      else {
         alert('No Such Hospital Exists');
      }
   }
   catch (error) {
      console.log(error)
   }
})

app.post('/approvehosp', async (req, res) => {
   try {
      const hospname = req.body.addHospital;
      const approval = 'false';
      const approve = await collection2.findOne({ userID: hospname }, { approved: approval });
      if (approve) {
         const tru = 'true';
         const result = await approve.updateOne({ approved: tru });
         if (result) {
            res.render('formAdmin-hosp')
         }
         else {
            alert('Approval failed');
         }
      }
      else {
         alert('No Such Hospital Exists to be Approved');
      }
   }
   catch (error) {
      console.log(error)
   }
})

app.get('/formAdmin-viewUser', (req, res) => {
   res.render('formAdmin-viewUser');
})

app.get('/admin', (req, res) => {
   res.render('admin');
})

app.post('/submit-login-admin', async function (req, res) {

   try {
      const username = req.body.username;
      const check = await collection4.findOne({ username: username })
      if(check){
      if (check.password === req.body.password) {
         res.render('admin')
      }
      else {
         res.render('login', alert('Username/password incorrect'));
      }
   }else{
      alert('Invalid Credentialds');
      res.render('login')
   }
   }
   catch (error) {
      console.log(error.message)
   }

})

app.get('/services', function (req, res) {
   res.render('services');
})

app.get('/searchhospitals', function (req, res) {
   res.render('searchhospitals');
})

app.get('/card-open', function (req, res) {
   res.render('card-open');
})


app.get('/bloodbanks', async (req, res) => {
   let data = []
   try {
      const docData = (await collection2.find({ bloodBank: "available" })).forEach((user) => {
         data.push(user);
      })
      const docData2 = (await collection2.find({ odCamp: "available" })).forEach((user) => {
         if (!data.includes(user)) {
            data.push(user);
         }
      })
   } catch (err) {
      console.log(err);
   }
   res.render('bloodbanks', { data });
})

app.post('/addBlog',async(req,res)=>{
   let userID = req.body.docID
   try{
      let data = []
      let result = (await collection6.find({docID:userID})).forEach((user)=>{
         data.push(user)
      })
      res.render('addBlog',{data, userID})
   }catch(err){
      console.log(err);
   }
})

app.post('/createBlog',async(req,res)=>{
   let userID = req.body.docID
   let docname = req.body.docname
   let title = req.body.title
   let content = req.body.content
   try{
      const blog = new blogs({
         doctname: docname,
         docID: userID,
         title: title,
         content: content
      });
      const result = await blog.save();
      if(blog){
         res.render('blog-ty',{userID})
      }
   }catch(err){
      console.log(err);
   }
})

app.post('/gotoprofile',async(req,res)=>{
   let docID = req.body.docID
   console.log(docID);
   try{
      let check = await collection6.findOne({docID:docID})
      res.render('profile-doc',{details:check})
   }catch(err){
      console.log(err);
   }
})

//Get all blogs
app.post('/openBlog',async(req,res)=>{
   try{
      let blogger = []
      let result = (await blogs.find({})).forEach((blog)=>{
         blogger.push(blog)
      })
      res.render('blogs',{blogger})
   }catch(err){
      console.log(err);
   }
})

app.get('/diagnosis', async (req, res) => {
   let data = []
   try {
      const docData = (await collection2.find({ ifDiag: "available" })).forEach((user) => {
         data.push(user);
      })
   } catch (err) {
      console.log(err);
   }
   res.render('diagnosis', { data });
})

let arr = [];
let UN;

app.post('/proceed', async (req, res) => {
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;
   let mobileNumber = req.body.mobileNumber;
   let mailID = req.body.mailID;
   let dob = req.body.dob;
   let occupation = req.body.occupation;
   let bloodGroup = req.body.bloodGroup;
   let maritalStatus = req.body.maritalStatus;
   let gender = req.body.gender

   let karr = [firstName, lastName, mobileNumber, mailID, dob, occupation, bloodGroup, maritalStatus, gender]
   arr = karr
   res.render('register2')
});

const securePassword = async(password)=>{
    
   try{
       const passwordHash = await bcrypt.hash(password,10);
       return passwordHash;
   }
   catch(error){
      console.log(error.message);
   }
}


app.post('/submit', async (req, res) => {
   try {
      const username = req.body.username;
      const patientData = await collection.findOne({ username: username });

      if (patientData) {
         res.render('register2');
         alert('User already exists');
      }
      else {
         const spassword = await securePassword(req.body.password);
         const userdata = new collection({
            firstName: arr[0],
            lastName: arr[1],
            mobileNumber: arr[2],
            mailID: arr[3],
            dob: arr[4],
            occupation: arr[5],
            bloodGroup: arr[6],
            maritalStatus: arr[7],
            gender: arr[8],
            username: req.body.username,
            password: spassword,
         });

         const result = await userdata.save();

         if (userdata) {
            res.render('login');
         }

         else {
            alert('Your Registration has been failed.');
         }

      }
   }
   catch (error) {
      res.send(error.message);
   }
})


//Login
app.post('/submit-login', async (req, res) => {
   try {
      const username = req.body.username;
      const password = req.body.password;
      UN = username;
      const check = await collection.findOne({ username: username })
      const passwordMatch = await bcrypt.compare(password,check.password);
      if(check){
      if (passwordMatch) {
         res.redirect('home-page')
      }
      else {
         res.render('login');
         alert('Username/password incorrect')
      }
   }else{
      res.render('login');
      alert('Invalid Credentials')
   }
   }
   catch (error) {
      console.log(error.message)
   }

});

//
app.post('/apply', async (req, res) => {
   try {
      const userID = req.body.userID;
      const hospData = await collection2.findOne({ userID: userID });

      if (hospData) {
         res.render('registerHosp');
         alert('User already exists');
      }
      else {
         const Hospdata = new collection2({
            hospName: req.body.hospName,
            mobNum: req.body.mobNum,
            emailID: req.body.emailID,
            ifDiag: req.body.ifDiag,
            city: req.body.city.toLowerCase(),
            odCamp: req.body.odCamp,
            bloodBank: req.body.bloodBank,
            userID: req.body.userID,
            pass: req.body.pass,
            approved: "false",
         });

         const result = await Hospdata.save();

         if (Hospdata) {
            res.render('registerHosp2');
         }

         else {
            alert('Your Registration has been failed.');
         }

      }
   }
   catch (error) {
      res.send(error.message);
   }
})


// search page rendering
app.get('/search', (req, res) => {
   res.render('search')
})

app.post('/editHosp', async (req, res) => {
   try {
      const username = req.body.usernameUser
      UN = username;
      const data = await collection.findOne({ userID: username });
      data.hospName = req.body.hospName
      data.mobNum = req.body.mobNum,
         data.city = req.body.city,
         data.ifDiag = req.body.DiagnosisCenter,
         data.odCamp = req.body.ODCamp,
         data.bloodBank = req.body.BBHosp
      try {
         const result = await collection.updateOne({ userID: UN }, {
            $set: {
               hospName: req.body.hospName,
               mobNum: req.body.mobNum,
               city: req.body.city,
               ifDiag: req.body.DiagnosisCenter,
               odCamp: req.body.ODCamp,
               bloodBank: req.body.BBHosp
            }
         })
      } catch (err) {
         console.log(err);
      }
      const data2 = await collection.findOne({ userID: UN });
      res.render('profile', { details: data2 })
   } catch (err) {
      console.log(err);
   }
})

// Shows Hospital's Appointment History
app.post('/hospHist',async (req,res) => {
   try{
      let data = []
      usernameH = req.body.userIDHosp
      console.log(usernameH);
      let result = (await appointments.find({hospID:usernameH})).forEach((user)=>{
         data.push(user)
      })
      res.render('iframe-hospital-profile',{data})
   }catch(err){
      console.log(err);
   }
})

//search to showing doctors based on searched
app.get('/explore', async (req, res) => {
   let searched_location = req.query.searchBar.toLowerCase()
   let data = []
   if(searched_location ===''){
      await collection6.find({})
         .then((x) => {
            console.log("search results successfully found")
            res.render('searchhospitals', { x , searched_location})
         })
         .catch((y) => {
            console.log("search results not found ....")
         })
   }else{
      await collection6.find({$or: [
         {city:searched_location},{spec:searched_location},
         {doctName:searched_location},{hospName:searched_location}
      ]})
         .then((x) => {
            console.log("search results successfully found")
            res.render('searchhospitals', { x , searched_location})
         })
         .catch((y) => {
            console.log("search results not found ....")
         })
   }
   
})

app.post('/bookApp', async(req,res)=>{
   const docID = req.body.docID
   let result = await collection6.findOne({docID:docID})
   const docName = result.doctName
   const hospName = result.hospName
   const price = result.price
   const hID = req.body.hID
   const charge = parseInt(parseInt(price) * 0.1);
   const final = parseInt(parseInt(price) + charge)
   const hjk = [docName, hospName, price,charge, final, docID, hID]
   res.render('getAppointment', { hjk })
})

app.post('/get', (req, res) => {
   const docName = req.body.doc;
   const hospName = req.body.hosp;
   const price = req.body.price;
   const Did = req.body.did;
   const hID = req.body.hid;
   console.log(hID)
   const charge = parseInt(parseInt(price) * 0.1);
   const final = parseInt(parseInt(price) + charge)
   const hjk = [docName, hospName, price, charge, final, Did, hID]
   res.render('getAppointment', { hjk })
})

//Confirm an Appointment
app.post('/ty', async function (req, res) {
   try {
      const Appoint = new appointments({
         patName: req.body.nameAppoint,
         Date: req.body.dateAppoint,
         Timeslot: req.body.timeAppoint,
         Contact: req.body.contactAppoint,
         docID: req.body.Did,
         hospID:req.body.hid,
         docName: req.body.dname,
         username: UN,
         approved: false,
         finished: false,
      });

      const result = await Appoint.save();

      if (Appoint) {
         res.render('ty');
      }else {
         alert('Your appointment has been failed');
      }
   }catch (error) {
      res.send(error.message);
   }

})

//Adding feedback into collection

app.post('/addquery', async(req,res)=>{
   const email = req.body.mailFooter;
   const result = await collection.findOne({mailID:email});
   if(result){
      try{
          const data =new Feedback({
            name:result.firstName,
            mobnum:result.mobileNumber,
            email:result.mailID,
            username:result.username,
            query:req.body.queryFooter
          })
          const result1 = await data.save()
          if(result1){
            console.log('FeedBack Sent');
            res.render('home-page')
          }
          else{
            alert('Error sending Feedback');
            res.render('home-page')
          }
      }catch(err){
         console.log(err.message);
      }
   }
   else{
      alert('No user exists with such mail id');
      res.redirect('home-page')
   }
})

// viewing feedbacks in admin portal

app.get('/formAdmin-feedback', async (req, res) => {
   const details = [];
   const docData = (await Feedback.find().sort({ id: -1 })).forEach((user) => {
      details.push(user);
   });
   res.render('formAdmin-feedback', { details: details });
})

//Connection through a port number
app.listen(9000, function (req, res) {
   console.log('server started')
});