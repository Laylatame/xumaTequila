let user2 = localStorage.getItem("user");

function init() {
  console.log(user2);

  if (user2 != null) {
    $("#login").hide();
    $("#logout").show();
  } else {
    $("#login").show();
    $("#logout").hide();
  }
}

$("#logout").on("click", function() {
  localStorage.removeItem("user");
  init();
});

init();
