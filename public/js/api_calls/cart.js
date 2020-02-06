var user = localStorage.getItem("user");

$("#continue_button").on("click", function() {
  window.location = "/shop";
});

function countItems(currCart) {
  var numItems = 0;
  for (let i = 0; i < currCart.length; i++) {
    numItems = numItems + Number(currCart[i].numberOfItems);
  }
  return numItems;
}

//Detectar cambios en cantidades
$(document).on("input", ".myElements", function() {
  var currQuantity = Number($(this).val());

  if (currQuantity == 0) {
    console.log("No cambiar nada");
  } else {
    console.log(currQuantity);

    //checar si no hay un login
    if (user == null) {
      var cart = JSON.parse(sessionStorage.cart);
      console.log($(this));

      // for (let i = 0; i < cart.length; i++) {
      //   if (cart[i].product == idProduct) {
      //     console.log("Ya existia este item");
      //     cart[i].numberOfItems = cart[i].numberOfItems + numberOfItems;
      //     sessionStorage.setItem("cart", JSON.stringify(cart));
      //     break;
      //   } else {
      //     console.log("No existia este item");
      //     cart.push({
      //       product: idProduct,
      //       numberOfItems: numberOfItems,
      //       cost: costProduct
      //     });
      //     sessionStorage.setItem("cart", JSON.stringify(cart));
      //     break;
      //   }
      // }
    } else {
      //Si sí hay usuario login
      var json_to_send = {
        user: user,
        product: idProduct,
        numberOfItems: numberOfItems,
        cost: costProduct
      };

      json_to_send = JSON.stringify(json_to_send); // si si existe un login hacemos el guardado del cartItem en la base de datos

      $.ajax({
        url: "https://apixuma.herokuapp.com/cart/" + user + "/" + idProduct,
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET",
        dataType: "json",
        success: function(data) {
          console.log(data);
          if (data.length == 0) {
            console.log("NO EXISTIA");
            $.ajax({
              url: "https://apixuma.herokuapp.com/cart",
              headers: {
                "Content-Type": "application/json"
              },
              method: "POST",
              dataType: "json",
              data: json_to_send,
              success: function(data) {
                console.log(data);
              },
              error: function(error_msg) {
                alert(error_msg["responseText"]);
              }
            });
          } else {
            console.log("SI EXISTE");
            var cartId = data[0]._id;
            var newItems = data[0].numberOfItems + numItems;
            json_items = {
              numberOfItems: newItems
            };
            json_items = JSON.stringify(json_items);
            $.ajax({
              url: "https://apixuma.herokuapp.com/cart/" + cartId,
              headers: {
                "Content-Type": "application/json"
              },
              method: "PATCH",
              dataType: "json",
              data: json_items,
              success: function(data1) {
                console.log(data1);
              },
              error: function(error_msg) {
                alert(error_msg["responseText"]);
              }
            });
          }
        },
        error: function(error_msg) {
          alert(error_msg["responseText"]);
        }
      });
    }
  }
});

function calculateTotal() {
  let total = 0;
  let division = document.getElementsByClassName("priceCart");
  var arrDiv = [...division];
  console.log(division);
  console.log(arrDiv);

  for (let i = 0; i < division.length; i++) {
    console.log(division[i].innerHTML);
  }

  // $("#totalPrice").append(`<td></td>
  //             <td></td>
  //             <td><strong>Total</strong></td>
  //             <td class="text-right">$${totalPrice}</td>
  //             <td></td>`);
}

function displayItems(name, image, quantity, cost, idProduct) {
  let totCost = quantity * cost;
  let product = `<tr>
                  <td><img src="${image}" /></td>
                  <td>${name}</td>
                  <td>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control myElements"
                        placeholder="Cantidad"
                        aria-label="Cantidad"
                        aria-describedby="basic-addon2"
                        value="${quantity}"
                      />
                    </div>
                  </td>
                  <td class="text-right priceCart">$${totCost}</td>
                  <td class="text-right">
                    <button
                    class="btn btn-sm btn-danger"
                    onclick="eliminarProd('${idProduct}')"
                  >Eliminar</button>
                  </td>
                </tr>`;

  $("#showProdTable").append(`${product} `);
}

function productDetails(id, quantity) {
  idProduct = id;

  detallesProducto = [];

  $.ajax({
    url: "https://apixuma.herokuapp.com/product/" + idProduct,
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET",
    dataType: "json",
    success: function(data) {
      console.log(data);
      displayItems(data.name, data.image, quantity, data.cost, idProduct);
    },
    error: function(error_msg) {
      //alert(error_msg["responseText"]);
      alert("Error");
    }
  });
}

//How to loop through all
// function countTotal(allItems) {
//   var total = 0;
//   console.log(allItems);
//   console.log(allItems.length);
//   for (let i = 1; i < allItems.length - 1; i++) {
//     cost = allItems[i].children[3].innerText;
//     cost = cost.substring(1);
//     console.log(cost);

//     total = total + Number(cost);
//   }
// }

//getCartItems
function getCartItems() {
  cart = [];

  //cuando no hay login
  if (user == null) {
    console.log("NO HAY USUARIO");
    //Si no hay carrito existente imprime en consola que no hay nada
    if (sessionStorage.cart === undefined) {
      console.log("No hay un carrito existente");
      $("#showProdTable").append(
        `<tr> <td></td><td></td><td>No hay productos en el carrito</td><td></td><td></td></td>/tr>`
      );
      document.getElementById("totalPrice").hidden = true;
    } else {
      cart = JSON.parse(sessionStorage.cart);
      console.log(cart);

      while (cart.length > 0) {
        var prodId = cart[0].product;
        var numItems = cart[0].numberOfItems;
        var current = cart.filter(obj => obj.product === prodId);
        var toDelete = new Set([prodId]);
        cart = cart.filter(obj => !toDelete.has(obj.product));

        productDetails(prodId, countItems(current));
      }
      let allItems = document.getElementsByTagName("tr");
      let totalPrice = countTotal(allItems);
      console.log(allItems);
    }
  } else {
    // cuando si hay login
    $.ajax({
      url: "https://apixuma.herokuapp.com/cart/" + user,
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
      dataType: "json",
      success: function(data) {
        console.log(data);
        cart = data;
        if (cart.length == 0) {
          $("#showProdTable").append(
            `<tr> <td></td><td></td><td>No hay productos en el carrito</td><td></td><td></td></td>/tr>`
          );
          document.getElementById("totalPrice").hidden = true;
        } else {
          while (cart.length > 0) {
            var prodId = cart[0].product;
            var current = cart.filter(obj => obj.product === prodId);
            var toDelete = new Set([prodId]);
            cart = cart.filter(obj => !toDelete.has(obj.product));

            productDetails(prodId, countItems(current));
          }
          let allItems = document.getElementsByTagName("tr");
          //let totalPrice = countTotal(allItems);
          console.log(allItems);

          // $("#totalPrice").append(`<td></td>
          //     <td></td>
          //     <td><strong>Total</strong></td>
          //     <td class="text-right">$${totalPrice}</td>
          //     <td></td>`);
        }
      },
      error: function(error_msg) {
        alert(error_msg["responseText"]);
      }
    });
  }
  calculateTotal();

  //console.log(cart);
}

getCartItems();

// $(".btn-danger").on("click", function() {
//   console.log("FUNCIONA");
// });
function eliminarProd(cartId) {
  console.log("Funciona");
  console.log(cartId);
  //   let div = document.getElementById(cartId);
  //   console.log(div.parentElement.parentElement);

  //cuando no hay login
  if (user == null) {
    console.log("NO HAY USUARIO");
    //Si no hay carrito existente imprime en consola que no hay nada
    if (sessionStorage.cart === undefined) {
    } else {
      cart = JSON.parse(sessionStorage.cart);
      console.log(cart);

      var toDelete = new Set([cartId]);
      cart = cart.filter(obj => !toDelete.has(obj.product));
      console.log(cart);

      sessionStorage.setItem("cart", JSON.stringify(cart));
      $("#cart-table").load(document.URL + " #cart-table");
      getCartItems();
    }
  } else {
    // cuando si hay login
    $.ajax({
      url: "https://apixuma.herokuapp.com/cart/" + cartId,
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE",
      dataType: "json",
      success: function() {
        console.log("Success");
        $("#cart-table").load(document.URL + " #cart-table");
        getCartItems();
      },
      error: function(error_msg) {
        alert(error_msg["responseText"]);
      }
    });
  }
}

// //getDatosUser
// //cuando hay login
// function getDatosUser() {
//   dataUser = [];

//   //cuando no hay login
//   if (user == null) {
//     console.log("No hay login perro");
//   } else {
//     $.ajax({
//       url: "https://apixuma.herokuapp.com/user/" + user,
//       headers: {
//         "Content-Type": "application/json"
//       },
//       method: "GET",
//       dataType: "json",
//       success: function(data) {
//         console.log(data);
//         dataUser = data;
//       },
//       error: function(error_msg) {
//         alert(error_msg["responseText"]);
//       }
//     });
//   }
// }

// //getDatosUser()

// //updateCartItems
// function updateCartItems() {
//   //id para pruebas
//   idCartItem = "5e33c1dd2f5a530017b46672";

//   //lo unico que se puede hacer update es de numero de items
//   numberOfItems = 2;

//   json_to_send = {
//     numberOfItems: numberOfItems
//   };
//   json_to_send = JSON.stringify(json_to_send);

//   //cuando no hay login
//   if (user == null) {
//     //hacer update de carrito desde sessionStorage
//   } else {
//     //cuando hay login
//     $.ajax({
//       url: "https://apixuma.herokuapp.com/cart/" + idCartItem,
//       headers: {
//         "Content-Type": "application/json"
//       },
//       method: "PATCH",
//       dataType: "json",
//       data: json_to_send,
//       success: function(data) {
//         console.log(data);
//       },
//       error: function(error_msg) {
//         alert(error_msg["responseText"]);
//       }
//     });
//   }
// }

// //updateCartItems()

// //deleteCartItems
// function deleteCartItems() {
//   //cuando no hay login
//   cart = [];
//   if (user == null) {
//     sessionStorage.setItem("cart", JSON.stringify(cart));
//   } else {
//     // cuando hay un login
//     //aun no esta bien la ruta de esta mamada
//   }
// }

// //mandar correo
// //esto alv, no se como hacer :D

// // if(document.readyState == 'loading'){
// //     document.addEventListener('DOMContentLoaded',ready)
// // }else{
// //     ready()
// // }

// // function ready(){

// //     $("#continue_button").on("click", function() {
// //     window.location = "/shop";
// //     });

 $("#checkout_button").on("click", function() {
   window.location = "/checkout";
 });

// var quantityInputs = document.getElementsByClassName("form-control");
// for (var i = 0; i < quantityInputs.length; i++) {
//   var input = quantityInputs[i];
//   input.addEventListener("change", quantityChanged);
// }

// var removeCartItemButtons = document.getElementsByClassName(
//   "btn btn-sm btn-danger"
// );
// console.log(removeCartItemButtons);
// for (var i = 0; i < removeCartItemButtons.length; i++) {
//   var buttona = removeCartItemButtons[i];
//   buttona.addEventListener("click", removeCartItem);
// }

// function removeCartItem(event) {
//   var buttonClicked = event.target;
//   buttonClicked.parentElement.parentElement.remove();
//   updateCartTotal();
// }

// function quantityChanged(event) {
//   var input = event.target;
//   if (isNaN(input.value) || input.value <= 0) {
//     input.value = 1;
//   }
//   updateCartTotal();
// }

// function updateCartTotal() {
//   var cartItemContainer = document.getElementById("cart-table");
//   var cartRows = cartItemContainer.getElementsByTagName("tr");
//   var total = 0;
//   for (var i = 1; i < cartRows.length - 1; i++) {
//     var cartRow = cartRows[i];
//     var priceElement = cartRow.getElementsByClassName("text-right")[0];
//     var quantityElement = cartRow.getElementsByClassName("form-control")[0];
//     var price = parseFloat(priceElement.innerText.replace("$", ""));
//     var quantity = quantityElement.value;
//     total = total + price * quantity;
//   }
//   total = Math.round(total * 100) / 100;
//   cartRows[cartRows.length - 1].getElementsByClassName(
//     "text-right"
//   )[0].innerText = total + "$";
// }

// // function createTable() {}
