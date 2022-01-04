const mysql = require('mysql');
const config = require('./config.json');

class Manager {
  constructor() {
    this.pool = null;
  }

  createPool() {
    try{
      switch(process.env.NODE_ENV){
        case "development":
          this.pool = mysql.createPool(config.dev);
          break;
        case "production":
          this.pool = mysql.createPool({
            connectionLimit: 10,
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_ROOT_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            port: process.env.MYSQL_PORT
          });
          break;
      }
      //정상적으로 연결 되었는지 확인한다.
      this.pool.getConnection((err, conn) => {
        if(err) {
          console.log(err.message);
          return;
        }
        console.log('create pool and ready to get connection');
        conn.release();
      });
    }
    catch(err) {
      console.log(err);
      this.pool = null;
    }
  }
}

module.exports = new Manager();