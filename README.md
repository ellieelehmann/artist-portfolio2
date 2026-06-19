# Artist Portfolio

A personal artist portfolio built as a full-stack web application. Visitors can browse subpages, read an About Me section, and leave ideas/feedback through a submission form backed by a REST API.

## Tech Stack

- **Frontend:** JavaScript, HTML, CSS
- **Backend:** Express.js
- **Database:** PouchDB

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed

### Installation

```bash
git clone https://github.com/ellieelehmann/artist-portfolio2.git
cd artist-portfolio2
npm install
```

This installs all dependencies, including the backend packages (`pouchdb`, `express`).

### Running the App

```bash
npm start
```

Then open the app in your browser. Navigate by hovering over the star-shaped home button — this reveals subpages you can click into. You can leave a note in the idea submission form, or read more in the About Me subpage.

## API Documentation

The idea submission form is powered by a REST API built with Express.js and PouchDB, supporting full CRUD (Create, Read, Update, Delete) operations.

### Create an idea

**`POST /create`**

Creates a new idea entry in the PouchDB database.

| Field | Type | Description |
|-------|------|--------------|
| `_id` | string | Unique identifier (e.g. submitter name) |
| `idea` | string | The idea text |

**Request body:**
```json
{ "_id": "Eliana", "idea": "Idea1" }
```

**Response:**
200 OK - Idea from Eliana Created 

On failure: `500 Internal Server Error` with an error message.

---

### Get all ideas

**`GET /all`**

Returns every idea currently stored in the database.

**Response:**
```json
200 OK
[
  { "_id": "Eliana", "idea": "Idea1" }
]
```

On failure: `500 Internal Server Error` with an error message.

---

### Update an idea

**`PUT /update`**

Updates the idea text for a given `_id`.

| Parameter | Type | Description |
|-----------|------|--------------|
| `_id` | string | ID of the idea to update |

**Request body:**
```json
{ "idea": "Idea1 update" }
```

**Response:**
200 OK - Idea updated 

On failure: `500 Internal Server Error` with an error message.

---

### Delete an idea

**`DELETE /delete`**

Deletes the idea matching the given `_id`.

| Parameter | Type | Description |
|-----------|------|--------------|
| `_id` | string | ID of the idea to delete |

**Responses:**
200 OK — Idea deleted          (if _id is provided and found)

400 Bad Request — _id missing (if no _id is provided)

---

### Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad request — missing parameter or malformed request body |
| 500 | Internal server error |

## References

- [body-parser (npm)](https://www.npmjs.com/package/body-parser)
- [PouchDB — Create Document](https://pouchdb.com/api.html#create_document)
- [PouchDB — Batch Fetch](https://pouchdb.com/api.html#batch_fetch)
- [MDN — Sending and Retrieving Form Data](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data)
- [Stack Overflow — Update Data in List Dynamically](https://stackoverflow.com/questions/35223460/update-data-in-list-dynamically)
