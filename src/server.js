import express, { json, urlencoded } from 'express';
import PouchDB from 'pouchdb';
import cors from 'cors';
const port = 3260; // defines the port number on which express will listen 
import path from 'path';




const app = express(); // initializing pouchdb and express.js
const db = new PouchDB('ideas_db');
app.use(json()); // middleware
app.use(cors()); // prevents requests to another domain 
app.use(urlencoded({ extended: false }));
app.use(express.static('src/frontend'));



// create an idea 

app.post('/create', async (req, res) => {
    try {
        const {id,idea} = req.body;
        const result = await db.put({_id:id,idea:idea}); 
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});
// read 
app.get('/all', async (req, res) => {
    try {
        const result = await db.allDocs({ include_docs: true }); // all the documents from database 
        const ideas = result.rows.map(row => row.doc); //callback on elements of array and returns the result of those elemnents in this case the ideas 
        res.json(ideas); // send back to client 
    } catch (err) {
        res.status(500).send(err);
    }
});

// update past idea through id number 
app.put('/update/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updatedIdea = req.body;
        const idea = await db.get(id);
        idea.idea = updatedIdea.idea;
        const result = await db.put(idea);
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const idea = await db.get(id); // read idea 
        const result = await db.remove(idea); // remove it 
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});







app.route("*").all(async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
  });
  


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});