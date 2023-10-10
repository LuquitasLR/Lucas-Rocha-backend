function addProduct() {
    const cartId = document.getElementById('cartId').value;
    const productId = document.getElementById('productId').value;
    const quantity = document.getElementById('quantity').value;

    const dataForm = {
      quantity: quantity,
    };
    console.log(dataForm)
  
    const url = `http://localhost:8080/api/carts/${cartId}/products/${productId}`;
    const method = 'PUT';
  
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa');
      }
      return response.json();
    })
    .then(data => {
      console.log('Solicitud PUT exitosa', data);
    })
    .catch(error => console.error('Error:', error));
  }
  
  
  
  
  
  