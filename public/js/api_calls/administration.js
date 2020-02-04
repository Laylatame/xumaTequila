var objPrueba;


function loadProducts(min, max) {
  $.ajax({
    url: "https://apixuma.herokuapp.com/products",
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET",
    dataType: "json",
    success: function(data) {
      objectProducts = data;
      
      objPrueba = objectProducts;
      console.log(objPrueba);
      
      
    },
    error: function(error_msg) {
      alert(error_msg["responseText"]);
    }
  });
}

loadProducts(0, 10000);



$("#nuevoProducto").on("click", function(event) {
  event.preventDefault();
 let name = $("#nombreProducto").val();
 let category = $("#categoria").val();
 let cost = $("#precio").val();
 let img = $("#imgUrl").val();
 let description = $("#descripcion").val();
 let size = $("#size").val();

 console.log(name);
 console.log(size);
 createProduct(name,category,cost,img,description,size);

 $("#nombreProducto").val("");
    $("#categoria").val("");
    $("#precio").val("");
    $("#imgUrl").val("");
    $("#descripcion").val("");
    $("#size").val("");
  
});



//createProduct
function createProduct(name, category,cost,image,description,size){
    
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
$("#buscar").on("click", function(event) {
  event.preventDefault();

  let idProducto = $("#idProductoAct").val();
  

  for(let i=0; i<objPrueba.length ; i++){
   
   
   
    if (idProducto == objPrueba[i]._id){
      $("#nombreProductoAct").val(objPrueba[i].name);
      $("#categoriaAct").val(objPrueba[i].category);
      $("#precioAct").val(objPrueba[i].cost);
      $("#imgUrlAct").val(objPrueba[i].image);
      $("#descripcionAct").val(objPrueba[i].description);
      $("#sizeAct").val(objPrueba[i].size);
      
    }



  }

});

$("#actualizarProducto").on("click", function(event) {
  event.preventDefault();
  let idProducto = $("idProductoAct").val();
  let name = $("#nombreProductoAct").val();
  let category = $("#categoriaAct").val();
  let cost = $("#precioAct").val();
  let img = $("#imgUrlAct").val();
  let description = $("#descripcionAct").val();
  let size = $("#sizeAct").val();

  updateProduct(idProducto,name,category,cost,img,description,size);

 


});


//updateProduct
function updateProduct(idProducto,name,category,cost,image,description,size){

    //id de producto a updatear
    //idProducto = '5e33df7b3fcb7200176b650b'

    //se pueden updetear todos los campos, en este caso se probara con cost
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


$("#eliminarProducto").on("click", function(event) {
  event.preventDefault();

  let idProduct = $("#idProductoDel").val()
  deleteProduct(idProduct);

});

//deleteProduct
function deleteProduct(idProducto){

    //id de producto a deletear
    //idProducto = '5e33df7b3fcb7200176b650b'

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

