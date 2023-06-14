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
    console.log(newProduct+"desde el front") 
});   

socket.on("conectado", (msj) => {
    console.log(JSON.stringify(msj));
    })

    socket.emit("test",{msj:"probando la conexion"})

    socket.on("products",(productsList) =>{console.log(productsList)})
