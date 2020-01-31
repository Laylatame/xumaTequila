//createProduct
function createProduct(){
    name = "Nombre prueba"
    category = "Licor"
    cost = 1000
    image = "urldummy"
    description = "descripcion chida"
    size = "Medium"

    json_to_send = {
        "name": name,
        "category": category,
        "cost": cost,
        "image": image,
        "description": description,
        "size": size
	}
    console.log(json_to_send)

    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
        url: 'https://apixuma.herokuapp.com/product',
        headers: {
            'Content-Type':'application/json'
        },
        method: 'POST',
        dataType: 'json',
        data: json_to_send,
        success: function(data){
          console.log('success: '+ data);
        },
        error: function(error_msg) {
          alert((error_msg['responseText']));
        }
      });
}
//createProduct()

//updateProduct
function updateProduct(){

    //id de producto a updatear
    idProducto = '5e33df7b3fcb7200176b650b'

    //se pueden updetear todos los campos, en este caso se probara con cost
    json_to_send = {
        "cost": 1200
	}
    console.log(json_to_send)

    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
        url: 'https://apixuma.herokuapp.com/product/' + idProducto,
        headers: {
            'Content-Type':'application/json'
        },
        method: 'PATCH',
        dataType: 'json',
        data: json_to_send,
        success: function(data){
          console.log('success: '+ data);
        },
        error: function(error_msg) {
          alert((error_msg['responseText']));
        }
      });

}

//updateProduct()

//deleteProduct
function deleteProduct(){

    //id de producto a deletear
    idProducto = '5e33df7b3fcb7200176b650b'

    $.ajax({
        url: 'https://apixuma.herokuapp.com/product/' + idProducto,
        method: 'DELETE',
        dataType: 'json',
        success: function(data){
          console.log('success: '+ data);
        },
        error: function(error_msg) {
          alert((error_msg['responseText']));
        }
      });

}

//deleteProduct()

