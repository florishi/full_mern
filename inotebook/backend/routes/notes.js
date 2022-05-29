const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route1: Get all the notes using : GET "/api/notes/fetchallnotes". Login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }

})
//Route2: Add a new note using : POST "/api/notes/addnote". Login required.
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })],


    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote);


        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error occured");
        }
    })

//Route3: Update an existing note using : Put "/api/notes/updatenote". Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newnote object
    try {


        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findOneAndUpdate(req.params.id, { $set: newNote }, { new: true }); // true will allow to to add new items 
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

//Route4: Delete an existing note using : Delete "/api/notes/deletenote". Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { 
            return res.status(404).send("Not Found");
        }
        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id); // true will allow to to add new items 
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})



module.exports = router;