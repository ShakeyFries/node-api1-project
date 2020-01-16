// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.listen(5000, () => {
  console.log('listening on port 5000');
});

server.use(express.json());

server.get('/' ,( req,res ) => {
  res.send('Ello Muvva Fukkas');
});

server.get('/api/users', ( req,res ) => {
  db.find()
    .then(nanners => {
      res.status(200).json(nanners);
    })
    .catch( err => {
      res.status(500).json({ errorMessage: "The users information could not be retrieved.", err })
    })
});

server.get('/api/users/:id', ( req,res ) => {
  const {id} = req.params;

  db.findById(id)
    .then(banana => {
      if(banana) {
      res.status(200).json(banana);
      } else {
      res.status(404).json({ message: "The user with the specified ID does not exist."})
      }
    })
    .catch( err => {
      res.status(500).json({ errorMessage: "The users information could not be retrieved.", err })
    })
});

server.post('/api/users', (req,res) => {
   const info = req.body;

   db.insert(info)
      .then( ollie => {
         if (ollie) {
            res.status(200).json(info);
         } else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
         }
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "There was an error while saving the user to the database", err })
      })
});

server.delete('/api/users/:id', (req,res) => {
   const {id} = req.params;

   db.remove(id)
      .then(cut => {
         if (cut) {
            res.status(204).end();
         } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
         }
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "The user information could not be modified.", err });
      });
});

server.put('/api/users/:id', (req,res) => {
   const {id} = req.params;
   const info = req.body;

   db.update(id, info)
      .then(edit => {
         if (edit) {
            res.status(200).json(info);
         } else if (edit) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
         } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
         }
      })
      .catch(err => {
         res.status(500).json({ errorMessage: "The user information could not be modified."},err);
      });
});