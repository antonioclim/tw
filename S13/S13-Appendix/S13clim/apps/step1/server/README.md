# Server demo S13v1

Un server Express minimal, utilizat de aplicaţia React (client) din kitul S13v1.

## Rulare

```bash
npm install
npm start
```

Serverul porneşte pe `http://localhost:8080`.

## Endpoint-uri

- `GET /books` – întoarce un tablou JSON de forma `{ id, title, content }`.
- `POST /books` – creează o carte nouă.
- `PUT /books/:id` – actualizează o carte existentă.

> Datele sunt păstrate în memorie (in-memory) şi se resetează la repornirea serverului.
