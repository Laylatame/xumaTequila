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


if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){

    $("#continue_button").on("click", function() {
    window.location = "/shop";
    });

    var quantityInputs = document.getElementsByClassName('form-control')
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged)
    }

    var removeCartItemButtons = document.getElementsByClassName('btn btn-sm btn-danger')
    console.log(removeCartItemButtons)
    for(var i = 0; i < removeCartItemButtons; i++){
        var buttona = removeCartItemButtons[i]
        buttona.addEventListener("click",removeCartItem)
    }
}

function removeCartItem(event){
    console.log('ola')
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementById('cart-table')
    var cartRows = cartItemContainer.getElementsByTagName('tr')
    var total = 0
    for(var i = 1;i < cartRows.length - 1; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('text-right')[0]
        var quantityElement = cartRow.getElementsByClassName('form-control')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price*quantity)
    }
    total = Math.round(total * 100)/100
    aux = cartRows[cartRows.length - 1].getElementsByClassName('text-right')[0].innerText = total + '$'
}

function createTable(){

}




