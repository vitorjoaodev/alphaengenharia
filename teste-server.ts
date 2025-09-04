import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.send("Servidor funcionando!");
});

app.listen(5000, "127.0.0.1", () => {
  console.log("Servidor rodando em http://127.0.0.1:5000");
});
