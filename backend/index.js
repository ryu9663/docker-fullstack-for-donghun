const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

//Express 서버를 생성
const app = express();

const PORT = 4000;

// app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

db.pool.query(
  `CREATE TABLE lists (
  id INT AUTO_INCREMENT,
  value TEXT,
  PRIMARY KEY (id)
)`,
  (err, results, fields) => {
    console.log("테이블 결과", results);
  },
);

app.get("/api", (req, res) => {
  return res.send("건강검진하러 오셨습니까");
});

app.get("/api/values", (req, res) => {
  db.pool.query("SELECT * FROM lists;", (err, results, fields) => {
    if (err) {
      console.error("Database query error:", err); // 에러 출력
      return res.status(500).send(err);
    } else {
      return res.json(results);
    }
  });
});

app.post("/api/value", (req, res, next) => {
  console.log(req.body.firstname);
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fields) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json({ success: true, value: req.body.value });
    },
  );
});

app.listen(PORT, () => console.log("Server is running on port: " + PORT));
