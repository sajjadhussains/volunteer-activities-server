const express =require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId  = require('mongodb').ObjectId;
require('dotenv').config()

const app =express();
app.use(bodyParser.json());
app.use(cors());
port =5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lnzgn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const registerCollection = client.db("volunteerStore").collection("volunteers");
  
  
  app.post('/addRegister',(req,res)=>{
    const register=req.body;
    registerCollection.insertOne(register)
    .then(result=>{
      console.log(result);
      res.send(result.insertedCount>0);
    })
  })

  app.get('/events',(req,res)=>{
    registerCollection.find({})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })

  app.post('/delete', (req, res)=>{
    const id = req.query.id;
    console.log(id)
    registerCollection.deleteOne({_id: ObjectId(id)})
    .then(result =>{
        if(result.deletedCount > 0){
            res.redirect('/');
        }
    
    })
})

 console.log('database connected');
});

app.get('/',(req,res)=>{
  res.send('i am struggeling')
})


app.listen(process.env.PORT || port);