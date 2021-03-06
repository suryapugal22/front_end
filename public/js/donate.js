function checkUser() {
    let user = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (user.ROLE == 'A') {
        adminRequest();
    } else {
        userRequest();
    }
}

//=============================================================================================================================

function adminRequest() {
    let user = JSON.parse(localStorage.getItem("isLoggedIn"));
    $("#username").append(user.username);



    var urlParams = new URLSearchParams(window.location.search);
    var urlID = urlParams.get("id");
    //console.log(urlID);

    var url = server + "request/" + urlID;
    $.get(url, function (data) {
        //console.log(data);

        var tbody = "<tr><th>Funds Received (&#8360;)</th>";
        tbody += "<td> <p id='reqRec'></p></td> </tr>";
        tbody += "<tr><th> Status </th>";
        tbody += "<td> <p id='reqStatus'></p> </td> </tr>";

        var url = server + "receivedDonations?id=" + urlID;
        $.get(url, function (DATA) {
            //console.log(DATA);
            if (DATA[0] == null) {
                $("#reqRec").text("No donations received yet");
            } else {
                $("#reqRec").text(DATA[0].Donation);
            }
        });

        $("#tableBody").append(tbody);
        $("#reqID").text(data[0].request_id);
        $("#reqName").text(data[0].NAME);
        $("#reqDes").text(data[0].DESCRIPTION);
        $("#reqFund").text(data[0].amount);

        if (data[0].status == 'OPEN') {
            $("#reqStatus").text("OPEN");
        } else if (data[0].status == 'CLOSED') {
            $("#reqStatus").text("CLOSED");
        } else {
            $("#reqStatus").text("EXPIRED");
        }

        var content = "";
        content += "<tr align='center'>";
        content += "<td colspan='2'> <a class='btn btn-secondary' href='requests.html'>Back";
        content += "<tr>";

        $("title").html("Request");
        $("#tableBody").append(content);
        $("#breadcrumb_li").append("<li class='breadcrumb-item active'><a> #"+data[0].request_id+" </a></li>");


    });
}




//=============================================================================================================================

function userRequest() {
    let user = JSON.parse(localStorage.getItem("isLoggedIn"));
    $("#username").append(user.username);

    var urlParams = new URLSearchParams(window.location.search);
    var urlID = urlParams.get("id");
    console.log(urlID);

    var url = server + "request/" + urlID;
    $.get(url, function (data) {
        console.log(data);
        $("#reqID").text(data[0].request_id);
        $("#reqName").text(data[0].NAME);
        $("#reqDes").text(data[0].DESCRIPTION);
        $("#reqFund").text(data[0].amount);

        var content = "<tr>";
        content += "<th>Donation</th>";
        content += "<td> <input class='form-control' id='donation' type='number' min='1' required> </td>";
        content += "</tr><tr>";
        content += "<td></td>";
        content += "<td> <button class='btn btn-primary' type='submit'>Donate</button> </td>";
        content += "</tr>";

        $("#tableBody").append(content);
        $("#breadcrumb_li").append("<li class='breadcrumb-item active'><a> Donate </a></li>");

    });
}

function donate() {
    event.preventDefault();

    let user = JSON.parse(localStorage.getItem("isLoggedIn"));
    var urlParams = new URLSearchParams(window.location.search);
    var urlID = urlParams.get("id");

    var reqID = urlID;
    var donorID = user.user_id;
    var donation = $("#donation").val();
    var email = user.email;

    var formdata = { reqID: reqID, donorID: donorID, donation: donation, email: email };

    var url = server + "donate";

    console.log(url, formdata);
    $.post(url, formdata, function (data) {
        console.log(data);
        window.location.href = "donations.html";
    });
}

//===============================================================================================================================
