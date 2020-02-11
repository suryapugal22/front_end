function create(){
    event.preventDefault();
    let user = JSON.parse(localStorage.getItem("isLoggedIn"));

    var user_id  = user.user_id;
    var name = $("#name").val();
    var description = $("#description").val();
    var amount = $("#amount").val();
    var date = $("#expiryDate").val(); 
    var email = user.email;
    
    var formData = {name:name,description:description,amount:amount,created_by_id:user_id,status:"OPEN",expiry_date:date,email:email};

    console.log(formData);

    var url = server+ "addrequest";
    $.post(url,formData, function(data){
        console.log(data);
        alert("Your request is been created");
        window.location.href = "requests.html";
    });
}