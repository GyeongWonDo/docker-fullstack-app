const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');

const app = express();

app.use(bodyParser.json());

app.get('/api/values', function (req, res) {
    db.pool.query(`SELECT * FROM lists;`,
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json(results)
        });
})

app.post('/api/value', function (req, res, next) {
    console.log(req.body);
    console.log(req.body.value);

    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json({success: true, value: req.body.value})
        })
})


app.listen(5000, () => {
    console.log("서버 정보 : " + process.env.MYSQL_HOST);
    console.log("서버 정보 : " + process.env.MYSQL_USER);
    console.log("서버 정보 : " + process.env.MYSQL_ROOT_PASSWORD);
    console.log("서버 정보 : " + process.env.MYSQL_DATABASE);
    console.log("서버 정보 : " + process.env.MYSQL_PORT);

    console.log("애플리케이션 시작 : 5000")
})