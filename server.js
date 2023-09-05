const express = require("express");
const { required } = require("nodemon/lib/config");
const port =  3001;
const app = express();
const mysql = require("./connection").con

// configration

app.set("view engine", "hbs");
app.set("views", "./view");
app.use(express.static(__dirname = "./public"));

// route
app.get("/", (req,res) => {
    res.render("index")
;})

app.get("/add", (req,res) => {
    res.render("add")
;})

app.get("/search", (req,res) => {
    res.render("search")
;})

app.get("/update", (req,res) => {
    res.render("update")
;})

app.get("/delete", (req,res) => {
    res.render("delete")
;})

app.get("/view", (req,res) => {
    const {first_name,last_name,phone_number} = req.query
    let qry = "SELECT * FROM rahul_rec";  
    mysql.query(qry, [first_name,last_name,phone_number], (err, results) =>{
        if (err)
             throw err
        else{
            if(results.length > 0){
                res.render("view",{msg5:true, data3:results})
              }
        
        }
        
    });

;})


app.get("/addstd", (req,res)  =>{
    const {first_name, last_name, phone_number} = req.query;
    let qry2 =  "select * from rahul_rec WHERE phone_number=?";
    mysql.query(qry2,[phone_number],(err, results) =>{
        if(err)
          throw err
        else{
            if(results.length > 0){
                res.render("add",{cmsg:true})
            }
          else{
    
              let qry = " insert into rahul_rec values(?,?,?)";  
              mysql.query(qry, [first_name, last_name, phone_number], (err, results) =>{

              // res.send(results) 
              if(results.affectedRows > 0){
              res.render("add", {msg:true})
               }
            });
          }
        }
    });

});

app.get("/searchstd", (req,res) =>{
    const {first_name, last_name, phone_number} = req.query
    let qry = " SELECT first_name, last_name, phone_number FROM rahul_rec WHERE first_name LIKE ?";  
    mysql.query(qry, [first_name, last_name, phone_number], (err, results) =>{
        if (err)
             throw err
        else{
            if(results.length > 0 ){
                res.render("search",{msg:true, data:results})
            }
            else{

                res.send("data not found")
            }
        }
        
    });

});

app.get("/deletestd", (req, res) => {
    const {first_name} = req.query;
    let que = "delete from rahul_rec where first_name=?";
    mysql.query(que, [first_name], (err, results) => {
        if (err)
            throw err
        else{
            if (results.affectedRows > 0){
                res.render("delete", {msg:true})
            }
            else{
                res.render("delete", {msg2:true})
                }
            }
        });
    });

app.get("/updatestd", (req,res) =>{
        const {phone_number} = req.query
        let qry = "select * from rahul_rec WHERE phone_number=?"; 
        mysql.query(qry, [phone_number], (err, results) =>{
            if (err)
                 throw err
            else{
                if(results.length > 0 ){
                    res.render("update",{msg4:true,data2:results})
                }
                else{
    
                    res.render("update", {umsg:true})
                }
            }
            
        });
    
    });

    app.get("/updaterec",(req,res)=>{
    const {first_name, last_name, phone_number} = req.query;
    let qry = "update rahul_rec set first_name=?, last_name=? where phone_number=?";
    mysql.query(qry, [first_name, last_name, phone_number], (err,results)=>{
        if(err) throw err
        else{
            if(results.affectedRows > 0 ){
                res.render("update",{msg6:true})
                

            }
        }
    });
    
    });

app.listen(port, (err) => {
    if(err)
        throw err
    else
    console.log(`port is running on ${port}`);

})