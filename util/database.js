const mysql= require('mysql2');

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'udemy_node',
    password:'vishalverma9572'
});
module.exports=pool.promise();