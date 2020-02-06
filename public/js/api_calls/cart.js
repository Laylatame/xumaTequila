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

function displayItems(name, image, quantity, cost, idProduct) {
  let totCost = quantity * cost;
  let product = `<tr>
                  <td><img src="${image}" /></td>
                  <td>${name}</td>
                  <td>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Cantidad"
                        aria-label="Cantidad"
                        aria-describedby="basic-addon2"
                        value="${quantity}"
                      />
                    </div>
                  </td>
                  <td class="text-right">$${totCost}</td>
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
  // en esta variable poner el id del producto que vamos a llamar
  // el id se ocupa para la ruta
  // ahorita estamos poniendo un id xs
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
      displayItems(data.name, data.image, quantity, data.cost, idProduct);
    },
    error: function(error_msg) {
      //alert(error_msg["responseText"]);
      alert("Error");
    }
  });
}

//How to loop through all
function countTotal(allItems) {
  var total = 0;
  console.log(allItems);
  console.log(allItems.length);
  for (let i = 1; i < allItems.length - 1; i++) {
    cost = allItems[i].children[3].innerText;
    cost = cost.substring(1);
    console.log(cost);

    total = total + Number(cost);
  }
}

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
        var current = cart.filter(obj => obj.product === prodId);
        var toDelete = new Set([prodId]);
        cart = cart.filter(obj => !toDelete.has(obj.product));

        productDetails(prodId, countItems(current));
      }
      let allItems = document.getElementsByTagName("tr");
      let totalPrice = countTotal(allItems);
      console.log(allItems);

      $("#totalPrice").append(`<td></td>
              <td></td>
              <td><strong>Total</strong></td>
              <td class="text-right">$${totalPrice}</td>
              <td></td>`);
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
          let totalPrice = countTotal(allItems);
          console.log(allItems);

          $("#totalPrice").append(`<td></td>
              <td></td>
              <td><strong>Total</strong></td>
              <td class="text-right">$${totalPrice}</td>
              <td></td>`);
        }
      },
      error: function(error_msg) {
        alert(error_msg["responseText"]);
      }
    });
  }

  //console.log(cart);
}

getCartItems();

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
      },
      error: function(error_msg) {
        alert(error_msg["responseText"]);
      }
    });
  }
}

