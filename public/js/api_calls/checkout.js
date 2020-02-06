var user = localStorage.getItem("user");

$("#confirm-purchase").on("click", function() {
    if (user == null) {
        sessionStorage.removeItem('cart')

        if (sessionStorage.cart === undefined ) {
            console.log("ya no hya carrito")
        }

    }
    else{
        cart = []
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
              data.forEach(element => {

                console.log("je")
                console.log(element._id)
                $.ajax({
                    url: "https://apixuma.herokuapp.com/cart/" + element._id,
                    headers: {
                      "Content-Type": "application/json"
                    },
                    method: "DELETE",
                    dataType: "json",
                    success: function(data) {

                    },
                    error: function(error_msg) {
                      //alert(error_msg["responseText"]);
                      alert("Error");
                    }
                  });
            });
            alert("COMPRA EXITOSA");
            },
            error: function(error_msg) {
              //alert(error_msg["responseText"]);
              alert("Error");
            }
          });


    }

  });