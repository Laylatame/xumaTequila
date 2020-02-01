var user = localStorage.getItem('user');

//getCartItems
function getCartItems(){

    cart = []
    
    //cuando no hay login
    if(user == null){
        //Si no hay carrito existente imprime en consola que no hay nada
        if( sessionStorage.cart === undefined ){
            console.log("No hay un carrito existente")
        }
        else{
            cart = JSON.parse(sessionStorage.cart); 
        }
    }
    else{ // cuando si hay login
        $.ajax({
            url: 'https://apixuma.herokuapp.com/cart/' + user,
            headers: {
                'Content-Type':'application/json'
            },
            method: 'GET',
            dataType: 'json',
            success: function(data){
                console.log(data)
                cart = data
            },
            error: function(error_msg){
                alert((error_msg['responseText']))
            }
        })
    }

    console.log(cart)
}

//getCartItems()


//getDatosUser 
//cuando hay login
function getDatosUser(){

    dataUser = []

    //cuando no hay login 
    if( user == null ){
        console.log("No hay login perro")
    }
    else{
        $.ajax({
            url: 'https://apixuma.herokuapp.com/user/' + user ,
            headers: {
                'Content-Type':'application/json'
            },
            method: 'GET',
            dataType: 'json',
            success: function(data){
                console.log(data)
                dataUser = data
            },
            error: function(error_msg){
                alert((error_msg['responseText']))
            }
        }) 
    }

}

//getDatosUser()


//updateCartItems
function updateCartItems(){

    //id para pruebas
    idCartItem = '5e33c1dd2f5a530017b46672'

    //lo unico que se puede hacer update es de numero de items
    numberOfItems = 2

    json_to_send = {
        "numberOfItems": numberOfItems
    }    
    json_to_send = JSON.stringify(json_to_send);

    //cuando no hay login
    if(user == null){
        //hacer update de carrito desde sessionStorage
    }
    else{//cuando hay login
        $.ajax({
            url: 'https://apixuma.herokuapp.com/cart/' + idCartItem,
            headers: {
                'Content-Type':'application/json'
            },
            method: 'PATCH',
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

//updateCartItems()


//deleteCartItems
function deleteCartItems(){
    //cuando no hay login
    cart = []
    if( user == null ){
        sessionStorage.setItem('cart',JSON.stringify(cart));
    }
    else{ // cuando hay un login
        //aun no esta bien la ruta de esta mamada
    }
}

//mandar correo
//esto alv, no se como hacer :D