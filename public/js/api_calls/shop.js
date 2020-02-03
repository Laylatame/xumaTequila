objectProducts = [];

var user = localStorage.getItem("user");

function writeProducts(objectProducts) {
  for (let i = 0; i < objectProducts.length; i++) {
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
              <p class="text-muted">$${objectProducts[i].cost}</p>
              <button class="btn btn-primary">Añadir al carrito</button>
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
                    class="btn btn-primary"
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

//cuando se haga el load de la pagina, osea traer todos los productos existentes
function loadProducts() {
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
      writeProducts(objectProducts);
    },
    error: function(error_msg) {
      alert(error_msg["responseText"]);
    }
  });
}

loadProducts();

//cuando se haga el filtro por categorias
$("#btnFilterProd").on("click", function() {
  category = document.querySelector('input[name="prodCateg"]:checked').id;
  //console.log(category)

  if (category == "todos") {
    loadProducts();
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
  idProduct = "5e263ad639cfd834c4c6c60d";

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

function addCartItem() {
  //los siguientes datos deberian de venir de algun lado, ahorita estan puestos para poder probar
  idProduct = "5e263ad639cfd834c4c6c60d";
  numberOfItems = 1;
  costProduct = 1000;

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

//para probar agregado de cartItems
//addCartItem()
