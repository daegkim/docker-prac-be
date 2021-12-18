var express = require('express');
var router = express.Router();
var dbManager = require('../database/manager');

router.get('/list', function(req, res, next) {
  dbManager.pool.getConnection((err, conn) => {
    if(err) {
      conn.release();

      res.send({
        isSuccess: false,
        errMsg: err
      });
      return;
    }

    conn.query(`
      SELECT value
      FROM memos
    `, (err, results, fields) => {
      if(err) {
        conn.release();

        res.send({
          isSuccess: false,
          errMsg: err
        });
        return;
      }
      
      var finalResults = [];
      results.map((val, idx) => {
        finalResults = [...finalResults, val.value];
      });

      conn.release();

      res.send({ 
        isSuccess: true,
        errMsg: '',
        data: finalResults
      });
    });
  });
});

router.post('/new-memo', function(req, res, next) {
  var newMemo = req.body.newMemo;

  dbManager.pool.getConnection((err, conn) => {
    if(err) {
      conn.release();

      res.status(400).send({
        isSuccess: false,
        errMsg: err
      });
      return;
    }

    conn.query(`
      INSERT INTO memos (value)
      VALUES ?
    `, [[[newMemo]]] , (err, results, fields) => {
      if(err) {
        conn.release();

        res.status(400).send({
          isSuccess: false,
          errMsg: err
        });
        return;
      }

      conn.release();

      res.send({ 
        isSuccess: true,
        errMsg: '',
        data: req.body.newMemo
      });
    });
  });
})

module.exports = router;
