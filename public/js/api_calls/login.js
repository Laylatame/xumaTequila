$("#login_button").on("click", function() {
  //console.log("simon")
  user = $("#username").val();
  password = $("#inputPassword").val();

  json_to_send = {
    email: user,
    password: password
  };
  console.log(json_to_send);

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: "https://apixuma.herokuapp.com/login",
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    dataType: "json",
    data: json_to_send,
    success: function(data) {
      //console.log('success: '+ data.user);
      localStorage.setItem("user", data.user._id);
      window.location = "/index";
    },
    error: function(error_msg) {
      alert(error_msg["responseText"]);
    }
  });
});

$('#register_button').on('click',function(){
    console.log("simon")
    user = $('#user-email').val()
    name = $('#user-name').val()
    password = $('#user-pass').val()
    
  json_to_send = {
    "email": user,
    "password": password,
    "name": name
  }
    console.log(json_to_send)

    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
      url: 'https://apixuma.herokuapp.com/users',
      headers: {
          'Content-Type':'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log('success: '+ data);
        //localStorage.setItem('user', data.user._id);
        window.location = '/index'
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    
});
