let user = localStorage.getItem("user");

function init(){
console.log(user);

if (user != null){
    $("#login").hide();
    $("#logout").show();
} else {
    $("#login").show();
    $("#logout").hide();
}
}


$('#logout').on('click',function(){
    localStorage.removeItem("user");
    init();
});



init();