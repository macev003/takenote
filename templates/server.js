// add the required modules first 

const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json");

// create the server application at the selected port 
const app = express ();
const PORT = process.env.PORT || 3000;


// add how we will read the URL or JSON 
 app.use(express.urlencoded({extended: true}));
 app.use(express.json());

// add the js files
//  require("./routes/apiRoutes")(app);
//  require("./routes/htmlRoutes")(app);

// Use static files 
 app.use(express.static(path.join(__dirname,"./assets")));

//  API route for the notes to show on the page

app.get("/api/notes", function (req, res){
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

// API route to add a new note
app.post("/api/notes", function (req, res){
    let addNote = JSON.stringify(req.body);
    fs.readFile("./db/db.json", "utf8", (err, data) =>{
        if (err) throw err;

        let noteArray = JSON.parse(data);
        let previousNoteId = dataArray[noteArray.length -1].id;

        if (previousNoteId === undefined){
            previousNoteId = 0;
        }
        console.log("previous note id", previousNoteId);

        let newNoteId = previousNoteId + 1;
        console.log("new note Id", newNoteId);

        addNote = '{' + `"id":${newNoteId},` + addNote.substr(1);
        let addNoteJSON = JSON.parse(addNote);
        console.log("addNoteJSON", addNoteJSON);

        console.log("noteArray", noteArray);

        let newNoteString = JSON.stringify(noteArray);
        console.log(newNoteString);

        fs.writeFile("./db/db.json", newNoteString, function (err) {
            if (err) throw err;
            console.log("Added Note");

        });

    });

    res.sendFile(path.join(__dirname, "./db/db.json"));
});

// API route to delete a saved note

app.delete("/api/notes/:id", function (req, res){
    let deleteID = req.params.id;
    console.log(req.params.id);

    fs.readFile("./db/db.json", "utf8", (err, data) =>{
        let noteArray = noteArray.filter(function (note){
            return note.id != deleteID;
        });

        let newNoteString = JSON.stringify(noteArray);

        fs.writeFile("./db/db.json", newNoteString, function (err){
            if (err) throw err;
            console.log("Saved");
        });
    });

    res.sendFile(path.join(__dirname, "./db/db.json"))
});

// HTML Routes for the notes to display

app.get("/", function (req, res){
    res.sendFile(path.join(__dirname, "./templates/notes.html"));
});

app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "./templates/notes.html"));
});

app.get("*", function (req, res){
    res.sendFile(path.join(__dirname, "./templates/index.html"));
});


// Add listener
 app.listen(PORT, function() {
 console.log("App listening on PORT: " + PORT);
});