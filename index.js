const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

app.get("/medicos", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "alunos",
    database: "hospital",
    password: "********************",
  });
  const connect_aiven = mysql.createConnection({
    host: "mysql-2793d377-asbonato-a60d.b.aivencloud.com",
    user: "avnadmin",
    database: "hospital",
    password: "********************",
    port: "12322",
  });

  connect_aiven.query("SELECT * FROM tb_medico", (err, results, fields) => {
    res.json(results);
  });
});

app.get("/pacientes", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "alunos",
    database: "hospital",
    password: "********************",
  });
  const connect_aiven = mysql.createConnection({
    host: "mysql-2793d377-asbonato-a60d.b.aivencloud.com",
    user: "avnadmin",
    database: "hospital",
    password: "********************",
    port: "12322",
  });

  connect_aiven.query("SELECT * FROM tb_paciente", (err, results, fields) => {
    res.json(results);
  });
});

const porta = 3000;
app.listen(porta, () => console.log(`Executando na porta ${porta}`));
