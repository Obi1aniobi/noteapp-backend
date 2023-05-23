const usersRouter = require("express").Router();
const { connect } = require("../app-data-source")
const usersEntity = require("./users.entity")
const { issueToken } = require("../authorisation/jwt.token.strategy")

usersRouter.post("/create", async(req,res)=>{
    let message = "", status;
    try{
        const connection = await connect()
        const usersData = await connection.getRepository(usersEntity).create(req.body)
        const results = await connection.getRepository(usersEntity).save(usersData)
        status = 200;
        message = results;
    }catch(e){
        status = 500;
        message = e.message;
    }finally{
        res.status(status).send(message)
    }
})

usersRouter.post("/authenticate", async(req,res)=>{
    let message = "", status;
    try{
        const connection = await connect()
        const userCredentials = req.body;
        const isUserAuthenticated = await connection.getRepository(usersEntity).findOne({
            
            where:{
            ...userCredentials
          }
       })
       console.log(`isUserAuthenticated is ${JSON.stringify(isUserAuthenticated, null,2)}`)
        if(isUserAuthenticated){
            status = 200;
            message = {
                authenticated:true,
                token:issueToken()
            };
        }else{
            status = 401;
            message = `Invalid username/password combination`;
        }
    }catch(e){
        status = 500;
        message = e.message;
    }finally{
        res.status(status).send(message)
    }
})

module.exports = {
    usersRouter
}