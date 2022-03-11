var express = require('express');
const path = require('path');
var connection = require('../database');
var router = express.Router();

var db = connection();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


/* GET registration page. */
router.get('/registration', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/registration.html'));
});


/**
 * POST adds the user to database
 */
router.post('/user/register', function(req, res, next) {
  // console.log(req.body)
  var fname = req.body.fname;
  var lname = req.body.lname;
  var bday = req.body.birthday;
  var gender = req.body.gender;
  var uni_email = req.body.uni_email;
  var uni_name = req.body.uni_email;
  var uni_program = req.body.uni_program;
  var password = req.body.password;
  var nationality = req.body.nationality;
  var diet_opt = req.body.diet_opt;
  var language = req.body.language;
  var sharing_opt = req.body.sharing_opt;
  var pets_opt = req.body.pets_opt;
  var smoking_habit = req.body.smoking_habit;
  var drinking_habit = req.body.drinking_habit;

  var insert_query = `INSERT INTO user (email_id, first_name, last_name, d_o_b, gender, university_name, 
    university_program, password, nationality, dietary, language, shared_occupancy, pet_preference, smoking_habit, drinking_habit, created_at) 
    VALUES ("${uni_email}", "${fname}", "${lname}", "${bday}", "${gender}" ,"${uni_name}", "${uni_program}", 
    "${password}", "${nationality}", "${diet_opt}", "${language}", "${sharing_opt}", "${pets_opt}",
    "${smoking_habit}", "${drinking_habit}", NOW())`;

  db.query(insert_query, (err, rows, fields) => {
    if (err) throw err
    console.log('user added to database');
  })

  console.log(insert_query)

  res.sendFile(path.join(__dirname, '../public/index.html'));
});


/**
 * POST authenticates the user based on the emailID and password. If Auth successful route to homepage.
 */
router.post('/user/login' , function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  var login_query = `SELECT count(email_id) AS isValid FROM user WHERE email_id = "${email}" AND password = "${password}"`

  db.query(login_query, (err, rows, fields) => {
    if (err) throw err;

    var isValidUser = rows[0].isValid > 0 ? true: false;

    if(!isValidUser){
      console.log('error', 'Email or Password invalid')
      res.sendFile(path.join(__dirname, '../public/index.html'));
    }
    else{
      console.log('user auth suceeded');
      res.sendFile(path.join(__dirname, '../public/homepage.html'));
    }
  })
});


/**
 * GET all users
 */
router.get('/user/all' , function(req,res,next){
  var all_users_query = "SELECT * FROM user"
  db.query(all_users_query, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});


/**
 * POST filter based on user preferences
 */
router.post("/user/preference", function(req,res,next){
  var sharing_opt = req.body.sharing_opt;
  var pets_opt = req.body.pets_opt;
  var smoking_habit = req.body.smoking_habit;
  var drinking_habit = req.body.drinking_habit;

  preference_query = "SELECT * FROM user "

  var hasWhereCondition = false;

  //filter for shared occupancy preference
  if(sharing_opt){
    if(hasWhereCondition){
      preference_query += `AND shared_occupancy = "${sharing_opt}" `
    }else{
      preference_query += `WHERE shared_occupancy = "${sharing_opt}" `
      hasWhereCondition = true;
    }
  }

  //filter for pet preference
  if(pets_opt){
    if(hasWhereCondition){
      preference_query += `AND pet_preference = "${pets_opt}" `
    }else{
      preference_query += `WHERE pet_preference = "${pets_opt}" `
      hasWhereCondition = true;
    }
  }

  //filter for smoking habit
  if(smoking_habit){
    if(hasWhereCondition){
      preference_query += `AND smoking_habit = "${smoking_habit}" `
    }
    else{
      preference_query += `WHERE smoking_habit = "${smoking_habit}" `
      hasWhereCondition = true;
    }
  }

  //filter for drinking habit
  if(drinking_habit){
    if(hasWhereCondition){
      preference_query += `AND drinking_habit = "${drinking_habit}" `
    }
    else{
      preference_query += `WHERE drinking_habit = "${drinking_habit}" `
      hasWhereCondition = true;
    }
  }

  //Run query
  db.query(preference_query, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });

})

router.post("/user/info", function(req,res,next){
  var email_id = req.body.email_id;

  var query_string = `SELECT * FROM user WHERE email_id = "${email_id}"`

  db.query(query_string, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });

})

router.get("/user/logout" , function(req, res){
  res.sendFile(path.join(__dirname, '../public/index.html'));
})


module.exports = router;
