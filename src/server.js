import express, { json, query, urlencoded } from 'express';
import PouchDB from 'pouchdb';
import cors from 'cors';
const port = 3000; // defines the port number on which express will listen 
const headerFields = { "Content-Type": "text/html" };
import path from 'path';




const app = express(); // initializing pouchdb and express.js
const db = new PouchDB('ideas_db');
app.use(json()); // middleware
app.use(cors()); // prevents requests to another domain 
app.use(urlencoded({ extended: false }));
app.use(express.static('src/frontend'));


// create idea
async function createIdea(response, _id) {
    if (_id === undefined) {
      response.writeHead(400, headerFields);
      response.write("<h1>Idea Name Required</h1>");
      response.end();
    } else {
      try {
        await db.put({ _id:_id, idea:idea });
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
async function fetchAllIdeas() {
    try {
      const result = await db.allDocs({ include_docs: true });
      const ideas = result.rows.map((row) => row.doc);
      let responseText = "<h1>Ideas</h1><ul>";
      ideas.forEach((idea) => {
        responseText += `<li>${idea._id} = ${idea.idea}</li>`;
      });
      responseText += "</ul>";
      response.writeHead(200, headerFields);
      response.write(responseText);
      response.end();
    } catch (err) {
      response.writeHead(500, headerFields);
      response.write("<h1>Internal Server Error</h1>");
      response.write("<p>Unable to load counters</p>");
      response.write(`<pre>${err}</pre>`);
      response.end();
    }
}

// updata the idea 

async function updateIdea(response, _id) {
    try {
    const newIdea = document.getElementById('input-idea');
      const idea = await db.get(_id);
      idea.idea = newIdea.value;
      await db.put(idea);
      response.writeHead(200, headerFields);
      response.write(`<h1>Idea ${idea._id} Updated</h1>`);
      response.end();
    } catch (err) {
      response.writeHead(404, headerFields);
      response.write(`<h1>Counter ${_id} Not Found</h1>`);
      response.end();
    }
  }
  async function deleteIdea(response, _id) {
    try {
      const idea = await db.get(_id);
      response.writeHead(200, headerFields);
      response.write(`<h1>Idea ${idea._id} Deleted</h1>`);
      response.end();
      db.remove(idea);
    } catch (err) {
      response.writeHead(404, headerFields);
      response.write(`<h1>Idea ${_id} Not Found</h1>`);
      response.end();
    }
  }














// create an idea 

app.post('/create', async (req, res) => {
    try {
        const params = req.query;
        // creates the idea objecti n database with _id and idea 
        createIdea(res,params); 
        response.writeHead(200);
        response.end();
        return;  
        }catch (err) {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ status: "error", message}));
    }  
});
// read 
app.get('/all', async (req, res) => {
    try {
        fetchAllIdeas(res); 
        } catch (err) {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ status: "error", message}));
        }
});


// update past idea through id number 
app.put('/update', async (req, res) => {
    try {
        const params = req.query;
        updateIdea(res,params._id); 
       
        response.writeHead(200);
        response.end();
        return;  
        

        }
    catch (err) {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ status: "error", message}));
    }
});

app.delete('/delete', async (req, res) => {
    try {
        const params = req.query;
        deleteIdea(res,params._id); 
        response.writeHead(200);
        response.end();
        return;  
        }
     catch (err) {
        response.writeHead(500, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ status: "error", message}));
       
    }
});




app.route("*").all(async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
  });
  


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});