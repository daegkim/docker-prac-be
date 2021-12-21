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
          this.pool = mysql.createPool(config.production);
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