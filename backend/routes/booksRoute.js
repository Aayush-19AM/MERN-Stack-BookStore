import express, { Router } from 'express'
const router=express.Router();

import { Book } from '../models/bookModel.js';

//post request to create new book to save
router.post('/',async(req,res)=>{
    try {
if (
    !req.body.title || 
    !req.body.author || 
    !req.body.publishYear
    ) {
    return res.status(500).send({message:"Send all required fields: title,author,publishedyear"})
}

const newBook={
    title:req.body.title,
    author:req.body.author,
    publishYear:req.body.publishYear
}

const book=await Book.create(newBook)
return res.status(200).send(book)
        
    } catch (error) {
        console.log(error.message)
res.status(500).send({messeage:error.message})
    }
})



//Route to get all books from dtabase
router.get('/',async(req,res)=>{
    try {
        const books=await Book.find({})
        return res.status(200).json({
            count:books.length,
            books
        })
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

///get books by id
router.get('/:id',async(req,res)=>{
    try {
        
        const book = await Book.findById(req.params.id); // Find a book by its ID
        if (!req.params.id) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).send({message:error.message+ "some error occured"})
    }
})


//route to update a book 
router.put('/:id',async(req,res)=>{
    try {
        if (
            !req.body.title || 
            !req.body.author || 
            !req.body.publishYear
            ) {
            return res.status(400).send({message:"Send all required fields: title,author,publishedyear"})
        }
        const {id}=req.params

        const result=await Book.findByIdAndUpdate(id,req.body)
        if (!result) {
            return res.status(404).send({message:"Book not found"})
        }
        else{
            return res.status(200).send({message:"Book updated successfully"})

        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

//route to delete a book
router.delete('/:id',async(req,res)=>{
    try { 
    const {id}=req.params

    const result=await Book.findByIdAndDelete(id)
    if (!result) {
        return res.status(404).send({message:"Book not found"})
    }
    else{
        return res.status(200).send({message:"Book deleted successfully"})

    }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

export default router;