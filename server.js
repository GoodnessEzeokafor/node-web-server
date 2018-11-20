const express = require('express'); // require express
var app = express(); // call the express function
const hbs = require('hbs'); // require hbs
const fs = require('fs');
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// register middleware

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Error');
        }
    });
    next();
});
app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));




hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle:'Welcome To My Website',
    });
    // res.send({
    //     name:'Goodness',
    //     likes:[
    //         'Biking',
    //         'Eating',
    //         'Cities'
    //     ]
    // });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs', {
        pageTitle:'About Page',
    });
});
app.get('/contact',(req,res)=>{
    res.render('contact.hbs',{
        pageTitle:'Contact Page',
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        status:404,
        code:'Error'
    });
});
app.listen(port, ()=>{
    console.log(`Starting Server On Port ${port}`);
});

