var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors');
const config = require('./config.js')
var fs = require('fs')
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/execute', function(req, res){
    var url = 'http://s3.spotcrime.com/cache/rss/sanfrancisco.xml'
    jsdom.JSDOM.fromURL(url)
        .then((data)=>{
            const items = data.window.document.querySelectorAll('item');
            var construct = [];
            items.forEach(el => {
                var itemStr = "";
                // itemStr = itemStr.concat(el.querySelector("title").innerHTML, "\n");
                var descArr = el.querySelector("description").innerHTML.split("|");
                for(let i = 0; i < descArr.length; i++){
                    descArr[i] = descArr[i].trim();
                }
                // console.log(descArr[0])
                // itemStr = itemStr.concat(descArr[0], "\n", `https://maps.google.com/?q=${descArr[1]}${descArr[2]}`, "\n", el.querySelector("pubDate").innerHTML);
                var itemStr = `${el.querySelector("title").innerHTML}
                ${descArr[0]}
                https://maps.google.com/?q=${descArr[1]}${descArr[2]}
                ${el.querySelector("pubDate").innerHTML}`
                construct.push(itemStr);
            })
            // res.send(JSON.stringify(construct))
            console.log(construct)
            return construct;
        })
        // .then((cons) =>     axios({//able to retrieve access token
        //     url: "https://api.sakari.io/oauth2/token",
        //     method: "post",
        //     data: {
        //       "grant_type": "client_credentials", 
        //       "client_id": `${config.client_id}`,
        //       "client_secret": `${config.client_secret}`
        //     }
        //   })
        //     .then((response) =>{
        //         axios({ 
        //         url :`https://api.sakari.io/v1/accounts/${config.account_id}/messages`,
        //         method : "post",
        //         headers: {
        //             "Content-Type": 'application/json',
        //             "Authorization" : `Bearer ${response.data.access_token}`,
        //         },
        //         data : {
        //             "contacts": [
        //             {
        //                 "mobile": {
        //                     "number": "14156025194"
        //                 }
        //             }
        //                 ],
        //             "template": `${cons}`,
        //         } 
        //         })
        //     })
        //     .catch(err => {
        //       console.log(err)
        //   }))
})


app.post('/subscribe', function(req, res){
    axios({
        url : 'http://s3.spotcrime.com/cache/rss/sanfrancisco.xml',
        method : 'post',
        headers : {
            "Authenticated" : 'authenticationSolution',
            "Content-Type" : 'application/json'
        },
        data : {
            "target_url": "https://hooks.zapier.com/hooktest",
            "Event": "user_created" 
        }
    })
    .then(data => { 
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
})
app.get('/recipients', function(req, res){
    fs.readFile(filePath, 'utf-8', function(err, data){
        if(err){
            callback(err,null);
            return;
        } 
        //after readFile is finished seperate flat file into phone numbers and push into an array
    })
})

app.post('/recipients', function(req, res){
    fs.writeFile(fileName, data, 'utf-8', cb)
})

let port = 5000;

app.listen(port, () => {
    console.log("Listening on port: " + port)
});

module.exports = app;
