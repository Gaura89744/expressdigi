import "dotenv/config";
import express from "express";
const app = express();
const port = process.env.PORT||3030;
let gameData = [];
let newindex = 1;
app.use(express.json());
//add element in game
app.post("/game", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: newindex++, name, price };
  gameData.push(newTea);
  res.status(201).send(newTea);
});
// app.get("/",(req,res)=>{
// res.send("Hello from gaurav");
// })
// app.get("/ice-tea",(req,res) => {
//     res.send("Thanks for ordering ice tea");
// })
//here use to see all element in an array
app.get("/games", (req, res) => {
  res.status(202).send(gameData);
});
//update element in array
app.put("/games/:id", (req, res) => {
  const Game = gameData.find((t) => t.id === parseInt(req.params.id));
  if (!Game) {
    return res.status(404).send("game not found");
  }
  const { name, price } = req.body;
  Game.name = name;
  Game.price = price;
  return res.status(200).send("This game is updated");
});
//delete element from array
app.delete("/delete/:id", (req, res) => {
  const index = gameData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("game not found");
  }
  gameData.splice(index, 1);
  return res.status(202).send("deleted");
});
app.listen(port, () => {
  console.log(`Server is listening at ${port}..`);
});
