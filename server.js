// app.js

import express from "express";
import connect from "./schemas/index.js";
import charactersRouter from './routes/characters.router.js';
import itemsRouter from './routes/items.router.js';


const app = express();
const PORT = 3000;

connect();

app.use(express.json()); 
app.use('/api/characters', charactersRouter);
app.use('/api/items', itemsRouter);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
