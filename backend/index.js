const express= require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors')
var logger = require('morgan')
const app = express();
const employeeRoute= require("./routes/route")


// Connect Database

connectDB();



app.use(cors({
    origin: ['http://localhost:4200'],
    credentials:true
}));

// Intialize Middleware


app.use(logger('dev'))
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({extended : false}));


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