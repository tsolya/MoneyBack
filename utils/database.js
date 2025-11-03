
require("dotenv").config()
console.log(process.env)
var mysql = require('mysql');
const logger = require("./logger");

var pool  = mysql.createPool({
    multipleStatements : true,
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME
  });
  function query(sql,params = [],callback, req=""){
    const start =  Date.now();
    const context = req ? `${req.method} ${req.originalUrl}` : 'NO CONTEXT'
      pool.query(sql ,params, (error,results) => {
        if(process.env.DEBUG == 1){
        const duration = Date.now() - start;
        if(error){
          logger.error(`[DB - ERROR] ${error.message}`)
        }else{
          const count = Array.isArray(results) ? results.length : results.affectedRows;
          logger.info(`[${context}] - ${count} record(s) affected.  ${duration}ms`)
        }
        if(callback) callback(error,results)
      }});
    }

module.exports = {query}