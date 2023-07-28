const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'b91htbzstsl2uwzuo2yn-mysql.services.clever-cloud.com', 
    user: 'ulfz5xnd74k7gjo4', 
    password: 'gXX4Fl7KPMr32jYhNRXt',
    database: 'b91htbzstsl2uwzuo2yn',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
})

module.exports = pool.promise()