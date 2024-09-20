const express = require('express')
const connectToDb = require('./database')
const Blog = require('./model/blogModel')
require('dotenv').config()

const app = express()
app.use(express.json())
const { multer, storage } = require('./middleware/multerConfig')
const upload = multer({storage : storage})
const fs = require('fs')
const cors = require('cors')


app.use(cors({
    origin : "http://localhost:5173"
}))

connectToDb()
app.get('/', (req, res)=>{

    res.send('Hello World !')
})

app.post('/blog', upload.single('image'), async (req, res) => {
    console.log(req.body);
    const {title, subtitle, description} = req.body
    const filename = req.file.filename
    console.log(filename);


    if(!title || !description || !subtitle){
        return res.status(400).json({
            message : "Please fill all input fields",
        })
    }
    await Blog.create({
        title : title,
        description : description,
        subtitle : subtitle,
        image : filename
    })

    res.status(200).json({
        message : 'Blog Api Hit !',
    })
})

app.get('/blog', async (req, res) => {
   const blogs =  await Blog.find()
    return res.status(200).json({
        message : "Blogs fetch operation successfull",
        data : blogs
    })
})



app.use(express.static('./storage'))


app.get("/blog/:id", async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)

    if(!blog){
        return res.status(404).json({
            message : "No data found !"
        })
    }
    res.status(200).json({
        message : "Found !",
        data : blog
    })
})

app.delete("/blog/:id", async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    const imageName = blog.image


    fs.unlink(`storage/${imageName}`, (err) => {
        if(err){
            console.log(err);
        }else{
            console.log('Deleted !');
        }
    })

    await Blog.findByIdAndDelete(id)

    res.status(200).json({
        message : "Successful"
    })
})

app.patch('/blog/:id', upload.single('image'), async (req, res) => {
    const id = req.params.id
    const { title, subtitle, description } = req.body
    let imageName;

    if(req.file){
        imageName = req.file.filename
        const blog = await Blog.findById(id)
        const oldImageName = blog.image


        fs.unlink(`storage/${oldImageName}`, (err) => {
            if(err){
                console.log(err);
            }else{
                console.log('Deleted !');
            }
        })
    }


    await Blog.findByIdAndUpdate(id, {
        title : title,
        subtitl : subtitle,
        description : description,
        imgae : imageName
    })
    res.status(200).json({
        message : "Blog Updated"
    })
})

app.listen(process.env.PORT, ()=>{
    console.log('server started at port 3000')
})
