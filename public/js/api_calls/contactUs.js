function sendMail(mailto, message) {
  var link =
    "mailto:xuma@contactus.com" +
    "?cc=" +
    "&subject=" +
    escape("XUMA - Gracias por contactarnos!") +
    "&body=" +
    message;

  window.location.href = link;
}

$("#sendMessageButton").on("click", function() {
  let name = $("#nameForm").val();
  let email = $("#emailForm").val();
  let phone = $("#phoneForm").val();
  let message = $("#messageForm").val();

  if (!name || !email || !phone || !message) {
    alert("Porfavor llene todos los campos.");
  } else {
    $("#nameForm").val("");
    $("#emailForm").val("");
    $("#phoneForm").val("");
    $("#messageForm").val("");
    sendMail(email, message);
    // $.ajax({
    //   type: "POST",
    //   url: "https://mandrillapp.com/api/1.0/messages/send.json",
    //   data: {
    //     key: "",
    //     message: {
    //       from_email: "a01192934@itesm.mx",
    //       to: [
    //         {
    //           email: email,
    //           name: name,
    //           type: "to"
    //         }
    //       ],
    //       autotext: "true",
    //       subject: "Xuma - Gracias por contactarnos!",
    //       html: message
    //     }
    //   }
    // }).done(function(response) {
    //   console.log(response);
    // });

    let button = $("#sendMessageButton");
    button[0].innerText = "✔ ENVIADO";
    alert("Muchas gracias! Nos podremos en contacto pronto.");
  }
});
