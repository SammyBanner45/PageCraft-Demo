import express from "express";
import { paginate } from "@sambuddha_npm_dev/pagecraft";

const app = express();
const users = [
  { id: 1, name: "Sam", role: "student", email: "sam@example.com" },
  { id: 2, name: "Alex", role: "admin", email: "alex@example.com" },
  { id: 3, name: "Samira", role: "student", email: "samira@example.com" },
  { id: 4, name: "Jordan", role: "student", email: "jordan@example.com" },
  { id: 5, name: "Riley", role: "admin", email: "riley@example.com" }
];

app.get("/", (_request, response) => {
  response.json({ message: "PageCraft demo API", endpoint: "/users", example: "/users?page=1&limit=2&role=student&search=sam&sortBy=name" });
});

app.get("/users", (request, response) => {
  try {
    const options = {
      page: request.query.page === undefined ? 1 : Number(request.query.page),
      limit: request.query.limit === undefined ? 10 : Number(request.query.limit),
      sortBy: request.query.sortBy,
      order: request.query.order ?? "asc"
    };
    if (request.query.role !== undefined) options.filters = { role: request.query.role };
    if (request.query.search !== undefined) options.search = { query: request.query.search, fields: ["name", "email"] };
    response.json(paginate(users, options));
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`PageCraft demo listening on http://localhost:${port}`));
