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
        default:
          break;
      }
      console.log("create pool");
    }
    catch(err) {
      console.log(err);
      this.pool = null;
    }
  }
}

module.exports = new Manager();