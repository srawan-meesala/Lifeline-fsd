const express = require('express');
const app = express();
const path = require('path');
const { get } = require("http");
const alert = require('alert');
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.get('/', function (req, res) {
   res.render('home');
})

app.get('/home', function (req, res) {
   res.render('home');
})

app.get('/profile', function (req, res) {
   res.render('profile');
   res.render('iframe-profile');
})

app.get('/iframe-profile', function (req, res) {
   res.render('iframe-profile');
})


app.post('/home-page', function (req, res) {
   res.render('home-page');
})


app.get('/aboutUs', function (req, res) {
   res.render('aboutUs');
})

app.get('/profile', function (req, res) {
   res.render('profile');
})

app.get('/profile-edited', function (req, res) {
   res.render('profile-edited');
})

app.get('/home-page', function (req, res) {
   res.render('home-page');
})

app.get('/login', function (req, res) {
   res.render('login');
})

app.get('/getAppointment', function (req, res) {
   res.render('getAppointment');
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

app.get('/formAdmin-bb', function (req, res) {
   res.render('formAdmin-bb');
})

app.get('/formAdmin-diag', function (req, res) {
   res.render('formAdmin-diag');
})

app.post('/submit-login-hosp', (req, res) => {
   res.render('hospital-profile');
})

app.post('/submit-login-doc', (req, res) => {
   res.render('profile-doc');
   res.render('iframe-profile-doc');
})

app.get('/iframe-profile-doc', function (req, res) {
   res.render('iframe-profile-doc');
})

app.get('/profile-doc-edited', function (req, res) {
   res.render('profile-doc-edited');
})

app.get('/profile-doc', function (req, res) {
   res.render('profile-doc');
})

app.post('/submit-login-hosp', (req, res) => {
   res.render('hospital-profile');
   res.render('iframe-hospital-profile');
})

app.get('/hospital-profile', (req, res) => {
   res.render('hospital-profile');
})

app.get('/hospital-profile-edited', (req, res) => {
   res.render('hospital-profile-edited');
})

app.get('/iframe-hospital-profile', (req, res) => {
   res.render('iframe-hospital-profile');
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

app.get('/formAdmin-user', function (req, res) {
   res.render('formAdmin-user');
})

app.post('/submit-login-admin', function (req, res) {
   res.render('admin');
})

/*app.post('/submit-login',(req,res)=>{
      res.render('home-page');
})*/

app.post('/ty', function (req, res) {
   res.render('ty');
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


app.get('/bloodbanks', function (req, res) {
   res.render('bloodbanks');
})


app.get('/diagnosis', function (req, res) {
   res.render('diagnosis');
})




// const deleter="delete from Register1";
//   db.run(deleter,err=>{
//     if(err){
//         return console.log(err.message);
//     }
//     console.log("data1 deleted");
//    });

// const deleter2="delete from Register2";
// db.run(deleter2,err=>{
//   if(err){
//       return console.log(err.message);
//   }
//   console.log("data2 deleted");
//    });






// if(usertype == 'Patient'){
//     app.post('/login-submit',(req,res)=>{
//     res.render('profile');
//     res.render('iframe-profile');
//     })
// };

// if(usertype == 'Doctor'){
//     res.render('')
// }

// if(usertype == 'Hospital'){
//     res.render('')
// }

// if(usertype == 'Administrator'){
//     app.post('/login-submit',(req,res)=>{
//     res.render('formAdmin-bb')
//     })
// }



// app.post('/login-submit', function(req,res){
//    res.render('profile');
//    res.render('iframe-profile');
// })

app.post('/submit-login', function (req, res) {
   const sql = `SELECT * from Register2 where username=?`
   const user = [req.body.username];
   db.get(sql, user, async (err, row) => {
      if (err) {
         return console.error(err.message);
      }
      if (row) {
         if (row.password !== req.body.password) {
            alert("incorrect Password\nplease enter correct password");
            res.redirect("/login");
         }
         else {
            res.render('home-page');
         }

      }
      else {
         alert("User is not registered\nGo to register page");
         res.redirect("/register")
      }
   })
})

app.listen(9000, function () {
   console.log('server started')
});