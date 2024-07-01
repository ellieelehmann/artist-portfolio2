
import express, { json, urlencoded } from 'express';
import PouchDB from 'pouchdb';
import cors from 'cors';
const port = 3000; // defines the port number on which express will listen 
import path from 'path';




const app = express(); // initializing pouchdb and express.js
const db = new PouchDB('ideas2_db');
app.use(json()); // middleware
app.use(cors()); // prevents requests to another domain 
app.use(urlencoded({ extended: false }));
app.use(express.static('src/frontend'));
const headerFields = { "Content-Type": "application/json" };




// // create idea
// async function createIdea(res,_id,idea) {
//       try {
//         await db.put({ _id, idea });
//         res.status(200).send(`<h1>Idea ${_id} Created</h1>`);
         
//       } catch (err) {
//         res.status(500).send(`<h1>Internal Server Error</h1><p>${err}</p>`);
//       }
//   }

async function createIdea(response, _id, idea) {
    if (_id === undefined) {
      response.writeHead(400, headerFields);
      response.write("<h1>Idea Name Required</h1>");
      response.end();
    } else {
      try {
        await db.put({ _id: _id, idea: idea });
        response.writeHead(200, headerFields);
        response.write(`<h1>Idea from ${_id} Created</h1>`);
        response.end();
      } catch (err) {
        response.writeHead(500, headerFields);
        response.write("<h1>Internal Server Error</h1>");
        response.write("<p>Unable to create counter</p>");
        response.write(`<p>This is likely a duplicate counter name!</p>`);
        response.end();
      }
    }
  }





// display all ideas from database 
async function fetchAllIdeas(res) {
    try {
      const result = await db.allDocs({ include_docs: true, descending: true });
      const ideas = result.rows.map((row) => row.doc);
      res.status(200).send(JSON.stringify(ideas));
    } catch (err) {
    res.status(500).send(`<h1>Internal Server Error</h1><p>${err}</p></h1>`);
    }
}

// updata the idea 

async function updateIdea(res, _id, idea) {
    try {
    const theIdea = await db.get(_id); 
    theIdea.idea = idea;
    await db.put(theIdea);
    res.status(200).send(`<h1>Idea ${_id} updated</h1>`);
         
    } catch (err) {
    res.status(500).send(`<h1>Internal Server Error</h1><p>${err}</p></h1>`);
         
    }
  }
  async function deleteIdea(res, _id) {
    try {
      const idea = await db.get(_id);
      db.remove(idea);
      res.status(200).send(`<h1>Idea ${_id} deleted</h1>`);
      

    } catch (err) {
    res.status(500).send(`<h1>Internal Server Error</h1><p>${err}</p></h1>`);
      
    }
  }
//routes

// create an idea 

app.post('/create', async (req, res) => {
    try{
        const { _id,idea  } = req.body; 
        await createIdea( res,_id,idea );
    }catch (err) {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ status: "error", message }));
      }
        
});
// read 
app.get('/all', async (req, res) => {
        fetchAllIdeas(res); 
       
});


// update past idea through id number 
app.put('/update', async (req, res) => {
    const { _id } = req.query._id;
    const { idea } = req.body;

    updateIdea(res, _id, idea); 
});

app.delete('/delete', async (req, res) => {
    const { _id } = req.query._id;
    if (!_id) {
        res.status(400).json({ message: 'Your Name Required' });
        return;
    }
    deleteIdea(res,_id); 
});




app.route("*").all(async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
  });
  


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});