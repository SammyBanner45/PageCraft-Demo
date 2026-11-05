import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";

test("Express demo returns paginated results and validates query values", async (context) => {
  const port = 3100 + Math.floor(Math.random() * 1000);
  const server = spawn(process.execPath, ["src/server.js"], {
    env: { ...process.env, PORT: String(port) },
    stdio: "ignore"
  });
  context.after(() => server.kill());

  let ready = false;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/users?page=1&limit=2&role=student&search=sam&sortBy=name`);
      if (response.ok) { ready = true; break; }
    } catch { /* server is still starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.equal(ready, true, "server should start");

  const response = await fetch(`http://127.0.0.1:${port}/users?page=1&limit=2&role=student&search=sam&sortBy=name`);
  const body = await response.json();
  assert.deepEqual(body.data.map((user) => user.name), ["Sam", "Samira"]);
  assert.equal(body.pagination.totalItems, 2);

  const invalidResponse = await fetch(`http://127.0.0.1:${port}/users?page=0`);
  assert.equal(invalidResponse.status, 400);
  assert.match((await invalidResponse.json()).error, /positive integer/);
});
