const express = require("express");
const path = require("path");
const app = express()
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

const port = 4000;

app.use(express.urlencoded({ express: true }))
app.use(express.static(path.join(__dirname, "public")))//public folder ke liye
app.use(methodOverride('_method'))

app.set("view engine", "ejs") //ejs ku set karne
app.set("views", path.join(__dirname, "views"))//views folder ku require karne

let posts = [
    {
        id: uuidv4(),
        username: "Abdulmoid",
        content: "I Love Coding"
    },
    {
        id: uuidv4(),
        username: "Hajera",
        content: "hello i am neet aspirant"
    },
    {
        id: uuidv4(),
        username: "Arshiya Sultana",
        content: "I am very good"
    }
]
app.listen(port,() => {
    console.log(`app is listening on ${port}`);
})

app.get("/posts", (req, res) => {
    res.render("index", { posts })
})

app.get("/posts/new", (req, res) => { //created a new route
    res.render("new")
})

app.post("/posts", (req, res) => {
    let  { username, content } = req.body
    // console.log(req.body);
    let id = uuidv4();
    posts.push({ id, username, content })
    res.redirect("/posts")

})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params
    let post = posts.find((p) => id === p.id)
    res.render("show.ejs", { post })
})
// app.postget("*", (req, res) => {
//     let { id } = req.params
//      post = posts.find((p) => id !== p.id)
//     res.render("error")
// })

app.patch("/posts/:id",(req , res) =>{
    let { id } = req.params
    let post = posts.find((p) => id === p.id)
    let newCont = req.body.content
    console.log(newCont);
    post.content = newCont
    console.log(post);
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params
    let post = posts.find((p) => id === p.id)
    res.render("edit" , {post})
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params
    posts =posts.filter((p) => id !== p.id)
    res.redirect("/posts")
})
