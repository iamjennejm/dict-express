import express from "express";
import morgan from "morgan";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(morgan("dev"));
app.use(express.json());


const TodoSchema = z.object({
  task: z.string(),
  isCompleted: z.boolean(),
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const [foundTodo] = await sql`SELECT * FROM todos WHERE id = ${Number(id)};`;

  if (foundTodo) {
    res.status(200).send(foundTodo);
  } else {
    res.status(404).send("todo not found");
  }
});

app.post("/register", async (req, res) => {
  const newTodo = req.body;
  const parsedResult = TodoSchema.safeParse(newTodo);

  if (!parsedResult.success) {
    return res.status(400).send(
      parsedResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }))
    );
  }

  const [createdTodo] =
    await sql `INSERT INTO todos (task, is_completed) VALUES (${newTodo.task}, ${newTodo.isCompleted}) RETURNING *`;

  // todos.push(newTodo);
  res.status(201).send(camelcaseKeys(createdTodo));
});

app.put("/food/:id", async (req, res) => {
    const { id } = req.params;
    const { name, type, instruction } = req.body;
  
    const [updatedTodo] = await sql`
      UPDATE  recipe 
      SET     name = ${name}
              , type = ${type}
              , instruction = ${instruction}
      WHERE   id = ${Number(id)}
      RETURNING *
    `;
  
    if (updatedTodo) {
      res.status(200).send(updatedTodo);
    } else {
      res.status(404).send("food not found");
    }
  });

app.put("/ingredient/:id", async (req, res) => {
  const { id } = req.params;
  const { name, quantity, condition } = req.body;

  const [updatedTodo] = await sql`
    UPDATE  ingredient 
    SET     name = ${name}
            , quantity = ${quantity}
            , condition = ${condition}
    WHERE   id = ${Number(id)}
    RETURNING *
  `;

  if (updatedTodo) {
    res.status(200).send(updatedTodo);
  } else {
    res.status(404).send("ingredient not found");
  }
});

app.delete("/food/:id", async (req, res) => {
    const { id } = req.params;
  
    const [deletedTodo] = await sql`DELETE FROM food WHERE id = ${Number(
      id
    )} RETURNING *`;
  
    if (deletedTodo) {
      res.status(204).send("Successfully deleted.");
    } else {
      res.status(404).send("ingredient not found");
    }
  });

app.delete("/ingredient/:id", async (req, res) => {
  const { id } = req.params;

  const [deletedTodo] = await sql`DELETE FROM ingredient WHERE id = ${Number(
    id
  )} RETURNING *`;

  if (deletedTodo) {
    res.status(204).send("Successfully deleted.");
  } else {
    res.status(404).send("ingredient not found");
  }
});


















 