const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.json());
const PORT = 3003;

const connection = mysql.createConnection({
  host: "databasemysql",
  user: "root",
  port: 3306,
  password: "fullcycle",
  database: "fullcycle",
});

app.get("/people", async (_, resp) => {
  let listHTML = "";
  return connection.query("select * from people;", (_, results) => {
    const interable = results ? results : [];
    for (const item of interable) {
      listHTML += `<h1>${item.name}</h1>`;
    }
    return resp.send(listHTML);
  });
});

app.post("/people", async (req, resp) => {
  const { name } = req.body;
  connection.query("insert into people(name) values(?);", name);
  return resp.json({
    message: `Usuário ${name} criado com sucesso!`,
  });
});

app.listen(PORT, () => console.log(`API RUN ${PORT}`));
