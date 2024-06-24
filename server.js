const express = require('express');
const PouchDB = require('pouchdb');
const path = require('path');
//const { body, validationResult } = require('express-validator'); // clean user input 


const app = express(); // initializing pouchdb and express.js
const db = new PouchDB('ideas_db');

const port = 3260; // defines the port number on which express will listen for in coming requests 


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));



// create an idea 

app.post('/api/ideas',async (req, res) => {
    //const errors = validationResult(req); // validaitng the input from important express package 
    //if (!errors.isEmpty()) {
        //return res.status(400).json({ errors: errors.array() });
    //}

    const idea = req.body.idea; // idea body saved to idea 
    try {
        const result = await db.post({ idea }); 
        if (result.error) {
            res.status(500).json({ error: 'Error saving idea' });
            console.error('Error posting idea:', result.error); 

        }
        else {
            res.status(200).json({message: 'idea posted successfully'});
            console.log('Idea posted successfully:', result);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error saving idea on server side' });
    }
});

// read 
app.get('/api/ideas', async (req, res) => { 
    try {
        const result = await db.allDocs({ include_docs: true }); // all documentts in database
        const ideas = result.rows.map(row => row.doc); // getting ideas from databse 
        res.status(200).json(ideas); // ok success
    } catch (error) {
        res.status(500).json({ error: 'Error fetching ideas' });
    }
});

// update past idea through id number 
app.put('/api/ideas/:id', async (req, res) => {
    const errors = validationResult(req); // validating idea
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } // error handeling 

    const id = req.params.id; // idea id 
    const newIdea = req.body.idea; 

    try {
        const idea = await db.get(id); // getting the idea by its id in the database
        idea.idea = newIdea; // setting old idea body with new idea body
        const result = await db.put(idea); // puting new idea id into database
        res.status(200).json({ message: 'Idea updated!', id: result.id });
    } catch (error) {
        res.status(500).json({ error: 'Error updating idea' });
    }
});
// Delete 
app.delete('/api/ideas/:id', async (req, res) => {
    const id = req.params.id; // user needs to know id see how to fix this 

    try {
        const idea = await db.get(id);
        const result = await db.remove(idea);
        res.status(200).json({ message: 'Idea deleted!', id: result.id });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting idea' });
    }
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});