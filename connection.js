const mysql = require("mysql");

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"rahul_rec",
    port:"3306"
});

con.connect((err)=>{
    if (err) throw err;
    console.log("mysql connected")
});
module.exports.con = con;