require('dotenv').config();
const axios = require("axios");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/v1/films', async (req, res) => {
    try{
        const response = await axios.get("https://swapi.dev/api/films");
        const films = response.data.results.map((f)=> ({
            title: f.title,
            director:f.director,
            release_date:f.release_date
        }))
        res.json({films});
    }catch(e){
        console.log(e);
        res.status(500).json({error:`server error ${e}`})
    }
})
app.get('/api/v1/people/:id',async (req,res)=>{
    const id = req.params.id
    try{
        const response = await axios.get(`https://swapi.dev/api/people/${id}`);
        const details = {
            name: response.data.name,
            films:response.data.films
        }
        res.status(200).json({details});
    }catch(e){
        console.log(e);
        res.status(500).json({error:`server error ${e}`});
    }
})

app.listen(PORT, ()=>{
    console.log("server is on");
})