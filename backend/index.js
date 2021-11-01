const express= require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session'); 
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var path = require('path')
const app = express();
var passport = require('passport');
const employeeRoute= require("./routes/route")


// Connect Database

connectDB();



app.use(cors({
    origin: ['http://localhost:4200'],
    credentials:true
}));

/*********************** Passport Configration ************************************/

app.use(session({

    name:'myname.sid',
    secret: 'keyboard',
    resave: false,
    saveUninitialized:false,
    cookie:
        {
            maxAge: 1000 * 60 * 60 * 24 ,
            httpOnly: false,
            secure: false

        }

}))
const passportInit = require('./passport/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

// Intialize Middleware


app.use(logger('dev'))
app.use(bodyParser.json());
app.use(express.json({extended : false}));
app.use(cookieParser());


app.get('/',(req , res)=>{
    res.send('API Running');
})

// Define Routes

 app.use('/api', employeeRoute)



//Defing Port 

const PORT = process.env.PORT || 5000;

app.listen(PORT ,()=>{
    console.log(`server started on port ${PORT}`)
})