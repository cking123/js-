const mysql = require('mysql');
var express = require('express');
let  connection= null;


connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'chenkan',
    database:'malladmin'
});
module.exports=connection;