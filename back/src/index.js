import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets =[];

app.post('/sign-up', (req,res)=>{
    const userData = req.body;
    
    if(!userData.userName || !userData.avatar){
        res.status(400).send('Todos os campos são obrigatórios!');
        return
    }

    users.push(userData);
    res.status(201).send("0k");
});

app.post('/tweets',(req,res)=>{
    const tweet = req.body;

    if(!tweet.userName||!tweet.tweet){
        res.status(400).send('Todos os campos são obrigatórios!');
        return
    }
    tweets.push(tweet);
    res.status(201).send("Ok");
});

app.get('/tweets',(req,res)=>{
    const lastTweets = [];
    tweets.map((t,index)=>{
        let item = {};
        if((tweets.length - index) <= 10){
            item.userName = t.userName;
            item.tweet = t.tweet;
            let itemAvatar = users.filter(function (u) {return u.userName === item.userName});
            item.avatar = itemAvatar[0].avatar;
            lastTweets.push(item);
        }});

    res.send(lastTweets);
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});