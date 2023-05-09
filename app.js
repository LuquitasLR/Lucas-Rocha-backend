import express from 'express'
import ProductManager from './ProductManager.js'
const app = express()
const port = 8080
app.use(express.urlencoded({ extended: true }));

const prods = new ProductManager ("./products.json")


app.get('/products', (req, res) => {
  
  const limit = req.query.limit;
 
  try{

    const getProds = prods.getProducts()

    if (limit) {

      const limitProds = getProds.slice(0, limit);
      return res.json(limitProds) 
    }

    return res.send(getProds)
  }
  
  catch (err) {
    res.status(500).send("Error al obtener los productos")

  }

})

app.get('/products/:pid', (req, res) => {
  
  try{
    const pid = req.params.pid
    
    return res.send(prods.getProductById(pid))
    
  }
  
  catch (err) {
    res.status(500).send("Error al obtener los productos")

  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//Hola Lucas, buen trabajo. Solo un comentario, en lugar que tus metodos muestren la 
//información por medio del console.log() tenes que usar un return para devolver la información,
// pues esto te servirá para los próximos desafios. Saludos! 
// Hola Lucas! Tu entrega esta correcta. Pero podrias agregar la clase Product por afuera del 
//ProductManager para que esta sean independientes una de otra. La clase ProductManager tengra 
//objetos del tipo Product. 