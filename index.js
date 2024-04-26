const express = require("express");
const mysql = require("mysql2");
require ('dotenv').config()

const app = express();
app.use(express.json());

const {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE} = process.env
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  //   host: DB_HOST_AIVEN,
  //   user: DB_USER_AIVEN,
  //   database: DB_DATABASE_AIVEN,
  //   password: DB_PASSWORD_AIVEN,
  //   port: DB_PORT_AIVEN,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

app.get("/medicos", (req, res) => {
  pool.query("SELECT * FROM tb_medico", (err, results, fields) => {
    res.json(results);
  });
});

app.get("/pacientes", (req, res) => {
  pool.query("SELECT * FROM tb_paciente", (err, results, fields) => {
    console.log(err)
    res.json(results);
  });
});

app.post('/medicos', (req, res) => {
  const crm = req.body.crm
  const nome = req.body.nome
  const pars = [crm, nome]
  const sql = "INSERT INTO tb_medico (crm, nome) VALUES (?,?)"
  pool.query(sql, pars, (err, results, fields) => {
    console.log(results)
    console.log(fields)
    console.log(err)
  })
  res.send('ok') 
})

app.get('/consultas', (req, res) => {
  const sql = 
  `
  SELECT m.nome as nome_medico,
         c.data_hora,
         p.nome as nome_paciente
  FROM tb_medico m
  JOIN tb_consulta c on m.crm = c.crm
  LEFT JOIN tb_paciente p on p.cpf = c.cpf
  `
  pool.query(sql, (err, results, fields) => {
    console.log(err)
    res.json(results)
  })

})

const porta = 3000;
app.listen(porta, () => console.log(`Executando na porta ${porta}`));
