const mysql=require('mysql')
var pool=mysql.createConnection({

    host:'localhost',
    port: 3306,
    user:'root',
    password:'1234',
    database:'food',
    multipleStatements:true,
})

module.exports=pool