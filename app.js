const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


const PORT = process.env.PORT || 4100
const Blog = require('./models/blog');


mongoose.connect(process.env.dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>app.listen(PORT, ()=>console.log('server and db connected on 4100')))
.catch((err)=>console.log('database not connected'))

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))




app.get('/', (req, res)=>{
    res.redirect('/blogs')
    
})

app.get('/blogs', (req, res)=>{
Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {blogs: result})
    })
    
    })

    // app.get('/allblogs', (req, res)=>{
    //     res.redirect('/blogs')
    // })

app.get('/about', (req, res)=>{
    res.render('about')
})




app.post('/add-blog', (req, res)=>{
      blog = new Blog(req.body)
    blog.save().then((result)=>{
        res.redirect('/')
    })
})

app.get('/api', (req, res)=>{
    res.render('api')
})

app.use((req, res)=>{
    res.status(404).render('404')
})






