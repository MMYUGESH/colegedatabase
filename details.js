const express = require('express');
const mongodb = require('mongodb');
require('dotenv').config();
//const bcrypt = require('bcrypt');
var cors = require("cors");


const app = express();
const mongoClient = mongodb.MongoClient;
// const objectId = mongodb.ObjectId;

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cors());
app.post('/create', async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbUrl);
        let db = clientInfo.db("joblist");
        await db.collection("details").insertMany(req.body);
        res.status(200).json({ message: "Job details is created" });
        clientInfo.close();
    }
    catch (error) {
        console.log(error);
    }
})
app.get("/", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbUrl);
        let db = clientInfo.db("joblist");
        let data = await db.collection("details").find().toArray();
        res.status(200).json(data);
        clientInfo.close();
    } catch (error) {
        console.log(error);
    }
})


app.listen(port, () => console.log("Apps runs with", port));