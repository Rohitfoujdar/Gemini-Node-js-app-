const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const express = require('express')
const app = express(); 
const bodyParser = require("body-parser")
app.use(bodyParser.json())

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/",(req, res)=>{
      res.send("Hello world gemini")
})

// const prompt = "what is the react js.";

const generate = async(prompt) =>{
    try{
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text()
    }catch(err){
        console.log(err)
    }
}


app.get("/api/content", async(req, res)=>{
    try{
       const data = req.body.question;
       const result = await generate(data);
       res.send({
        "result":result
       })
    }catch(err){
      console.log(err)
    }
})

const PORT = process.env.PORT || 8000;
// generate();


app.listen(PORT, () =>{
    console.log("listening on port :: 8000")
})