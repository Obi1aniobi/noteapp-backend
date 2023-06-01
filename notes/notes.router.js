const schoolsRouter = require("express").Router();
const { connect } = require("../app-data-source")
const notesEntity = require("./notes.entity") 


notesRouter.get("/", async(req,res)=>{
    let message = "", status;
    try{
        const connection = await connect()
        const schools = await connection.getRepository(notesEntity).find()
        status = 200;
        message = schools;
    }catch(e){
        status = 500;
        message = e.message;
    }finally{
        res.status(status).send(message)
    }
})

notesRouter.post("/", async(req,res)=>{
    let message = "", status;
    try{
        const connection = await connect()
        const schoolsData = await connection.getRepository(notesEntity).create(req.body)
        const results = await connection.getRepository(notesEntity).save(schoolsData)
        status = 200;
        message = results;
    }catch(e){
        status = 500;
        message = e.message;
    }finally{
        res.status(status).send(message)
    }
})

notesRouter.put("/:id", async(req,res)=>{
let message = "", status;
    try{
        const connection = await connect()
        const school_id = req.params.id;
        const schoolsData = await connection.getRepository(notesEntity).create(req.body)
        const results = await connection.getRepository(notesEntity).update({...schoolsData},{id:school_id})
        status = 200;
        message = results;
    }catch(e){
        status = 500;
        message = e.message;
    }finally{
        res.status(status).send(message)
    }

    
})

notesRouter.delete("/:id", (req,res)=>{


    
})

module.exports = {
    notesRouter
}
