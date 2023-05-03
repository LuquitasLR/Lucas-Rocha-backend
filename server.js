const express= require ("express")
const app = express()
const PORT= 8080
app.get("/", (req, res) => {

    res.send(`<h1 style="color: blue" >Hello World!</h1>`)
})

app.get("/saludo", (req,res) => {
    res.json({msj: "saludo"})
})

app.listen(PORT,()=> {
    Console.log(`Example app listened on port ${PORT}`)
})