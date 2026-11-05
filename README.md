# PageCraft Demo

A small Express API that demonstrates the published [`@sambuddha_npm_dev/pagecraft`](https://www.npmjs.com/package/@sambuddha_npm_dev/pagecraft) package. It keeps sample users in memory and supports pagination, exact role filtering, searching, and sorting.

## Requirements and installation

Use Node.js 18 or newer. Clone this repository, install its dependencies, and start the server:

```sh
git clone https://github.com/SammyBanner45/PageCraft-Demo.git
cd PageCraft-Demo
npm install
npm start
```

The demo imports the package with:

```js
import { paginate } from "@sambuddha_npm_dev/pagecraft";
```

Express listens on port 3000 by default. Set `PORT` to choose a different port.

## Try it

```sh
curl 'http://localhost:3000/users?page=1&limit=2&role=student&search=sam&sortBy=name'
```

Supported query parameters:

| Parameter | Example | Meaning |
|---|---|---|
| `page` | `page=2` | One-based page number; defaults to 1 |
| `limit` | `limit=2` | Page size from 1 through 100; defaults to 10 |
| `role` | `role=student` | Exact role filter |
| `search` | `search=sam` | Case-insensitive substring search in name or email |
| `sortBy` | `sortBy=name` | Record property to sort by |
| `order` | `order=desc` | `asc` or `desc`; defaults to `asc` |

The response includes `data` and `pagination` metadata. Invalid page, limit, or order values return HTTP 400 with a JSON error message.

## Tests

```sh
npm test
```

The integration test starts the Express server, calls the route with combined options, and checks the validation error response.

## Related project

PageCraft package source: https://github.com/SammyBanner45/PageCraft
