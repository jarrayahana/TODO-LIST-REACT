const express= require('express')
const cors= require('cors')
var bodyParser = require('body-parser')
const app=express()

app.use(express.json())
app.use(cors())//cross-origin ressource sharing 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const mysql = require('mysql2');

// 1. Create connection configuration
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb" // Ensure this database exists first
});

// 2. Connect and execute the create table query
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");

  // SQL statement to create a table with a primary key
  let sql = `CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    task VARCHAR(255), 
    createdAt DATE
  )`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created successfully");
  });
});
// parse application/json
app.use(bodyParser.json()) 
app.post('/new-task',(req, res)=>{
    console.log('here req:',req.body)
    const q='insert into todos(task,createdAt) values (?,?)'
    con.query(q,[req.body.task,new Date()],(error, result)=>{
        if (error){
            console.log('failed to store task')
        }else {
            console.log('todo saved')
        }
    })
})
app.get(`/read-tasks`,(req,res)=>{
    const  q='select * from todos';
    con.query(q,(error,result)=>{
        if (error){
            console.log('failed to read tasks')
        }else {
            console.log('got tasks succefully from db');
            console.log(result)
            res.send(result)
        }
    })
})
app.listen(5000,()=>{console.log('server started')})