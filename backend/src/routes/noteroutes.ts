import express from "express";
import * as NotesController from '../controllers/notescontroller';

const router=express.Router();

router.get("/",NotesController.getNotes );

router.get("/:note_id",NotesController.getNote);

router.patch("/:note_id",NotesController.updateNote);

router.post("/",NotesController.createNote);

router.delete("/:note_id",NotesController.deleteNote);

export default router;