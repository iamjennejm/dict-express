import express from "express";

const express = require('express'); 
const todosRouter = express.Router(); 

const TodoSchema = z.object({
  task: z.string(),
  isCompleted: z.boolean(),
});

todosRouter.get("/", async (req, res) => {
    const [foundFood] = await sql`SELECT * FROM recipes;`;
  
    if (foundFood) {
      res.status(200).send(foundFood);
    } else {
      res.status(404).send("empty");
    }
  });

todosRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const [foundFood] = await sql`SELECT * FROM recipes WHERE id = ${Number(id)};`;
  
    if (foundFood) {
      res.status(200).send(foundFood);
    } else {
      res.status(404).send("id doesn't exist");
    }
  });
  

todosRouter.get("/:type", async (req, res) => {
    const { id } = req.params;
    const [foundFood] = await sql`SELECT instructions, ingredients FROM recipes WHERE id = ${String(type)};`;
  
    if (foundFood) {
      res.status(200).send(foundFood);
    } else {
      res.status(404).send("id doesn't exist");
    }
  });

 
module.exports = router; 