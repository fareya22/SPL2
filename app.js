const express = require('express');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const Blog =  require('./models/blog');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbURl = 'mongodb+srv://bsse1331:mongodbFAREYA22@cluster0.hodzqty.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURl, {useNewUrlParser: true, useUnifiedTopology: true})
     .then((result) => app.listen(3000))
     .catch((err) => console.log(err));

//app.listen(3000);

// app.use((req,res,next) => {
//   console.log('New request made');
//   console.log('host',req.hostname);
//   console.log('path',req.path);
//   console.log('method',req.method);
//   next();
// });
// app.use((req,res,next) => {
//     console.log('in the next middleware');
//     next();
// });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

// app.get('/add-blogs', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//     .then((result) => app.listen(3000))
//     .catch((err) => {
//         console.log(err);
//     });

// });


// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) =>{
//         console.log(err);
//     });
// });

// app.get('/single-blog',(req,res) =>{
//     Blog.findById('')
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) =>{
//         console.log(err);
//     });
// })



app.get('/blogs',async (req,res) => {
//    Blog.find().sort({createdAt: -1})
//    .then((result) => {
//              res.json
//           })
//          .catch((err) =>{
//              console.log(err);
//          });

         const blogs = await Blog.find();
         res.send(blogs);
})

app.get("/blogs/:id", async(req, res)=> {
    const blog = await Blog.findById(req.params.id);
    res.send(blog)
})

app.post('/blogs',async(req,res) => {
    const blog = new Blog(req.body);
    const createdBlog = await blog.save();
    res.send(createdBlog);
})

app.delete("/blogs/:id", async(req,res)=>{
    const delBlog = await Blog.findByIdAndDelete(req.params.id);
    res.send("deleted successfuly!")
})

app.put("/blogs/:id", async(req,res) =>{
    const updateBlog = await Blog.findByIdAndUpdate(req.params.id,req.body, {new:true});
    res.send(updateBlog)
})

app.use((req,res) => {
    res.status(404).render('404',{title: '404'});
});