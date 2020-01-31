objectProducts = []

var user = localStorage.getItem('user');

//cuando se haga el load de la pagina, osea traer todos los productos existentes
function loadProducts(){
    $.ajax({
        url: 'https://apixuma.herokuapp.com/products',
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        dataType: 'json',
        success: function(data){
            console.log(data)
            objectProducts = data
        },
        error: function(error_msg){
            alert((error_msg['responseText']))
        }
    })
}

loadProducts()

//cuando se haga el filtro por categorias
$('#btnFilterProd').on('click',function(){
    category = document.querySelector('input[name="prodCateg"]:checked').id;
    //console.log(category)
    
    if(category == 'todos'){
        loadProducts()
    }
    else{
        $.ajax({
            url: 'https://apixuma.herokuapp.com/productsCat/' + category,
            headers: {
                'Content-Type':'application/json'
            },
            method: 'GET',
            dataType: 'json',
            success: function(data){
                console.log(data)
                objectProducts = data
            },
            error: function(error_msg){
                alert((error_msg['responseText']))
            }
        }) 
    }      
})


//cuando se quiera hacer el retrieve de los detalles del producto
function llamarParaDetalleDeProducto(){
    // en esta variable poner el id del producto que vamos a llamar
    // el id se ocupa para la ruta
    // ahorita estamos poniendo un id xs
    idProduct = '5e263ad639cfd834c4c6c60d'

    detallesProducto = []

    $.ajax({
        url: 'https://apixuma.herokuapp.com/product/' + idProduct,
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        dataType: 'json',
        success: function(data){
            console.log(data)
            detallesProducto = data
        },
        error: function(error_msg){
            alert((error_msg['responseText']))
        }
    }) 

}

//esto solo para probar que sirve la llamada de los detalles del producto
//llamarParaDetalleDeProducto()


function addCartItem(){
    //los siguientes datos deberian de venir de algun lado, ahorita estan puestos para poder probar    
    idProduct = '5e263ad639cfd834c4c6c60d'
    numberOfItems = 1
    costProduct = 1000
        
    //checar si no hay un login
    if(user == null){

        // si no existe un carrito en session storage crea uno nuevo con el objeto de carrito
        if (sessionStorage.cart === undefined) {

            cart = [{
                "product": idProduct,
                "numberOfItems": numberOfItems,
                "cost": costProduct 
            }]

            sessionStorage.setItem('cart',JSON.stringify(cart));
        }
        else{ // si si existe traemos el objeto y le agregamos el nuevo cartItem y lo guardamos de nuevo
            var cart = JSON.parse(sessionStorage.cart);
            cart.push({
                "product": idProduct,
                "numberOfItems": numberOfItems,
                "cost": costProduct 
            })
            sessionStorage.setItem('cart',JSON.stringify(cart));
        }

    }
    else{// si si existe un login hacemos el guardado del cartItem en la base de datos
        json_to_send = {
            "user": user,
            "product": idProduct,
            "numberOfItems": numberOfItems,
            "cost": costProduct
        }    
        
        console.log(json_to_send)

        json_to_send = JSON.stringify(json_to_send);

        $.ajax({
            url: 'https://apixuma.herokuapp.com/cart',
            headers: {
                'Content-Type':'application/json'
            },
            method: 'POST',
            dataType: 'json',
            data: json_to_send,
            success: function(data){
                console.log(data)
            },
            error: function(error_msg){
                alert((error_msg['responseText']))
            }
        })
    }
}

//para probar agregado de cartItems
//addCartItem()
