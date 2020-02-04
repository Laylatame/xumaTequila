objectProducts = [];

var user = localStorage.getItem("user");

function writeProducts(objectProducts, min, max) {
  for (let i = 0; i < objectProducts.length; i++) {
    if (objectProducts[i].cost >= min && objectProducts[i].cost <= max) {
      //Product setup
      let prodImg = `
            <a
              class="portfolio-link"
              data-toggle="modal"
              href="#portfolioModal${i}"
            >
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fas fa-plus fa-3x"></i>
                </div>
              </div>
            <img
              class="img-fluid"
              src="${objectProducts[i].image}"
              alt="Tequila"
            />
            </a>`;
      let prodInfo = `<div class="portfolio-caption">
              <h4>${objectProducts[i].name}</h4>
              <p class="text-muted" id="prodCost">$${objectProducts[i].cost}</p>
              <p id="prodID" hidden>${objectProducts[i]._id}</p>
              <button class="btn btn-primary addProduct">Añadir</button>
            </div>`;

      $("#productsDisplay").append(
        `<div class="col-md-4 col-sm-6 portfolio-item"> ${prodImg} ${prodInfo} </div>`
      );

      //Modal Setup
      let modalOpen = ` <div
      class="portfolio-modal modal fade"
      id="portfolioModal${i}"
      role="dialog"
      aria-hidden="true"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="close-modal" data-dismiss="modal">
            <div class="lr">
              <div class="rl"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-10 mx-auto">
                <div class="modal-body">
                  <div>`;

      let modalProdInfo = `<h2 class="text-uppercase">${objectProducts[i].name}</h2>
                  </div>
                  <div class="prodDetails">
                  <div class="prodImage">
                  <img
                    class="img-fluid d-block mx-auto"
                    src="${objectProducts[i].image}"
                    alt
                    height="400"
                    width="400"
                  />
                  </div>
                  <div class="productInfo">
                  <p>
                    ${objectProducts[i].description}
                  </p>
                  <p id="prodID" hidden>${objectProducts[i]._id}</p>
                  <ul class="list-inline">
                    <div class="row"> 
                      <li class="prodMargin">Precio:</li>
                      <li>$${objectProducts[i].cost}</li>
                    </div>
                    `;

      let selectDetails = `<div class="row">
                      <li class="prodMargin">Tamaño:</li>
                      <select id="bottleSize">
                        <option value="0"> Select a size...</option>
                        <option value="sm">
                          Chica
                        </option>
                        <option value="med">
                          Mediana
                        </option>
                        <option value="lrg">
                          Grande
                        </option>
                      </select>
                    </div>
                    <div class="row">
                      <li>Categoría:</li>
                      <li>${objectProducts[i].category}</li>
                    </div>
                    <div class="row">
                      <li>Cantidad:</li>
                      <button class="btn btn-primary" type="button">-
                      </button>
                      <label class="form-control">1</label>
                      <button class="btn btn-primary" type="button">+
                      </button>
                    </div>
                  </ul>`;

      let closeModal = `<button
                    class="btn btn-primary addProductModal"
                    data-dismiss="modal"
                    type="button"
                  >
                    <i class="fas fa-plus fa-1x"></i>
                    Añadir al carrito
                  </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

      $("#prodModals").append(
        `${modalOpen} ${modalProdInfo} ${selectDetails} ${closeModal}`
      );
    }
  }
}

//cuando se haga el load de la pagina, osea traer todos los productos existentes
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
      console.log(objectProducts);
      writeProducts(objectProducts, min, max);
    },
    error: function(error_msg) {
      alert(error_msg["responseText"]);
    }
  });
}

loadProducts(0, 10000);

//Cuando se haga el filtro por categorias
$("#btnFilterProd").on("click", function() {
  $("#productsDisplay").empty();
  $("#prodModals").empty();
  category = document.querySelector('input[name="prodCateg"]:checked').id;
  console.log(category);
  let min = $("#minPrice").val();
  let max = $("#maxPrice").val();

  if (!min) {
    min = 0;
  }
  if (!max) {
    max = 10000;
  }

  console.log(min);
  console.log(max);

  if (category == "todos") {
    loadProducts(min, max);
  } else {
    $.ajax({
      url: "https://apixuma.herokuapp.com/productsCat/" + category,
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
      dataType: "json",
      success: function(data) {
        console.log(data);
        objectProducts = data;
        writeProducts(objectProducts, min, max);
      },
      error: function(error_msg) {
        alert(error_msg["responseText"]);
      }
    });
  }
});

//cuando se quiera hacer el retrieve de los detalles del producto
function llamarParaDetalleDeProducto() {
  // en esta variable poner el id del producto que vamos a llamar
  // el id se ocupa para la ruta
  // ahorita estamos poniendo un id xs
  idProduct = "5e33df7a3fcb7200176b6509";

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
      detallesProducto = data;
    },
    error: function(error_msg) {
      alert(error_msg["responseText"]);
    }
  });
}

//esto solo para probar que sirve la llamada de los detalles del producto
//llamarParaDetalleDeProducto()

function addCartItem(id, numItems, prodCost) {
  //   idProduct = "5e263ad639cfd834c4c6c60d";
  //   numberOfItems = 1;
  //   costProduct = 1000;
  idProduct = id;
  numberOfItems = numItems;
  costProduct = prodCost;

  //checar si no hay un login
  if (user == null) {
    // si no existe un carrito en session storage crea uno nuevo con el objeto de carrito
    if (sessionStorage.cart === undefined) {
      cart = [
        {
          product: idProduct,
          numberOfItems: numberOfItems,
          cost: costProduct
        }
      ];

      sessionStorage.setItem("cart", JSON.stringify(cart));
    } else {
      // si si existe traemos el objeto y le agregamos el nuevo cartItem y lo guardamos de nuevo
      var cart = JSON.parse(sessionStorage.cart);
      cart.push({
        product: idProduct,
        numberOfItems: numberOfItems,
        cost: costProduct
      });
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  } else {
    // si si existe un login hacemos el guardado del cartItem en la base de datos
    json_to_send = {
      user: user,
      product: idProduct,
      numberOfItems: numberOfItems,
      cost: costProduct
    };

    console.log(json_to_send);

    json_to_send = JSON.stringify(json_to_send);

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
  }
}

$(".addProduct").on("click", function() {
  console.log("FUNCIONA");
  let divContent = $(this).parent()[0].children;
  let idProduct = divContent[2].innerText;
  let numberOfItems = 1;
  let costProduct = divContent[1].innerText;

  costProduct = costProduct.substring(1);
  divContent[3].innerHTML = "✔ Añadido";

  //   console.log(idProduct);
  //   console.log(costProduct);
  addCartItem(idProduct, numberOfItems, costProduct);
});

//Add product modal
$(".addProductModal").on("click", function() {
  let divContent = $(this).parent()[0].children;
  let idProduct = divContent[1].innerText;
  let numberOfItems = divContent[2].children[3].children[2].innerText;
  let bottleSize = divContent[2].children[1].children[1].value;
  let costProduct = divContent[2].children[0].children[1].innerText;

  costProduct = costProduct.substring(1);
  //   console.log(idProduct);
  //   console.log(numberOfItems);
  //   console.log(bottleSize);
  //   console.log(costProduct);
  if (numberOfItems > 0) {
    divContent[3].innerHTML = "✔ Añadido";
    addCartItem(idProduct, numberOfItems, costProduct);
  }
});

//Choose quantity
$(".restOneItem").on("click", function() {
  console.log("FUNCIONA MENOS");
  let divContent = $(this).parent()[0].children;
  let numberOfItems = divContent[2].innerText;
  let newNumber = Number(numberOfItems) - 1;
  if (newNumber >= 0) {
    divContent[2].innerText = newNumber;
  }
});

$(".addOneItem").on("click", function() {
  console.log("FUNCIONA MENOS");
  let divContent = $(this).parent()[0].children;
  let numberOfItems = divContent[2].innerText;
  let newNumber = Number(numberOfItems) + 1;
  divContent[2].innerText = newNumber;
});

//para probar agregado de cartItems
//addCartItem()
