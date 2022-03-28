
// get info from website
function getSID(){
    // get info from website and verify them
    let sid = $('#sid').val() ;    
    if( !checkSid( sid ) ){
        alert("student id is invalid");
        return;
    }
    
    $("#sendcode").attr("disabled", true);  // unable to send code frequently
    let email = $('#sid').val() + '@link.cuhk.edu.hk';      // send email
    let info = {
        email : email,
        sid : sid
    };  // email options

    $.post("/login/reset/email", info, function(res){ // send post request to the router to send email to the user
        // send successfully
        if( res == '001'){ 
            $("#bt").attr("disabled", false);
        } // send unsuccessfully
        else if ( res == '000'){
            alert("send code failure, check your student id and click the button to send it again");
        } // has registed
    }, "text");
    // wait for 60s
    timing();
}


function checkSid( id ){
    if ( id.length !== 10 || id[0] != 1 || id[1] != 1 || id[2] != 5 || id[3] != 5 ){
        return false;
    } 
    else{
        return true;
    }
}

// a timing function to enable code sending after 1 min
function timing(){
    let time = 60;
    var mytime = setInterval( function(){
        time--;
        $("#sendcode").attr("value", time);
        if( time === 0 ){
            clearInterval(mytime);
            $("#sendcode").attr("value","send")
            $("#sendcode").attr("disabled", false);
        }
    }, 1000);
}

