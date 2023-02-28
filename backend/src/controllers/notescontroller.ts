import createHttpError from 'http-errors';
import { RequestHandler } from "express";
import NoteModel from "../models/note";
import mongoose from 'mongoose';


export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        //throw Error("Bazzinga");
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error)
    }
}

export const getNote: RequestHandler = async (req, res, next) => {
    let note_id = await req.params.note_id;
    try {
        if (!mongoose.isValidObjectId(note_id)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(note_id).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }

}

interface CreateNoteBody {
    title?: string,
    text?: string
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }
        const newNote = await NoteModel.create({
            title: title,
            text: text
        })
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
}

interface UpdateNoteParams {
    note_id: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const note_id = req.params.note_id;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if
            (!mongoose.isValidObjectId(note_id)) {
            throw createHttpError(400, "Invalid note id");
        }
        else if (!newTitle) {
            throw createHttpError(400, "Note must have a title");
        }
        const note = await NoteModel.findById(note_id).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    }
    catch (error) {
        next(error);
    }

}


export const deleteNote: RequestHandler = async (req, res, next) => {
    const note_id = req.params.note_id;

    try {
        if
            (!mongoose.isValidObjectId(note_id)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(note_id).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        await note.remove();
        res.sendStatus(204).send('DELETED');
    } catch (error) {
        next(error);
    }
}