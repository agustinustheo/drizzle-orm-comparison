import express from 'express';
import { db } from './db';
import { users as userSchema } from './db/schema';
import { eq } from 'drizzle-orm';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await db.select().from(userSchema);
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await db.select().from(userSchema).where(eq(userSchema.id, Number(id)));
  res.json(user);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = await db.insert(userSchema).values([{ name, email }]);
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await db.update(userSchema).set({ name, email }).where(eq(userSchema.id, Number(id)));
  res.json(user);
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await db.delete(userSchema).where(eq(userSchema.id, Number(id)));
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
