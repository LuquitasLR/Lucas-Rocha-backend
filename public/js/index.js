//import { products } from "../../src/services/ProductService.js"
const socket = io();
const formProducts = document.getElementById("form-product")
const formTitle = document.getElementById("form-title");
const formDescription = document.getElementById("form-description");
const formCode = document.getElementById("form-code");
const formPrice = document.getElementById("form-price");
const formThumbnail = document.getElementById("form-thumbnail");
const formCategory = document.getElementById("form-category");
const formStock = document.getElementById("form-stock");

formProducts.addEventListener("submit", (e)=> {
    e.preventDefault()
    
    const newProduct= {
        title: formTitle.value,
        description: formDescription.value,
        code: formCode.value,
        price: +formPrice.value,
        thumbnail: formThumbnail.value,
        stock: +formStock.value,
        category: formCategory.value
    }
    socket.emit("new-product",newProduct)
    formProducts.reset()
    
});   

socket.on("conectado", (msj) => {
    console.log(JSON.stringify(msj));
})

// socket.on("updatedProducts",(prod)=>{
//     const productList= document.getElementById("product-list")
//     prod =prod.map((product)=>{
//         return {
//             title: product.title,
//             id: product._id, 
//             description: product.description, 
//             price: product.price
//         }
//     })
//     console.log(prod)
//     productList.innerHTML= "";
//     prod.forEach((product)=> {
//         const listItem = document.createElement("li");
//         listItem.textContent =
//             `<h3>Producto: ${product.title}</h3>
//              <h4>ID: ${product.id}</h4>
//              <h4>Descripción:</h4><p>${product.description}</p>
//              <h3>Precio: $${product.price}</h3>
//              <a href="javascript:products.deleteProduct(${product.id})"><button>Eliminar</button></a>
//              <hr/>`})
        
//     productList.appendChild(ListItem)
    
    
//          }) 
    

    socket.emit("test",{msj:"probando la conexion"})

    socket.on("products",(pl) =>{console.log(pl)})
