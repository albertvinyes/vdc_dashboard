$(function() { 
    jsState = "uninitialized";
    if (jsState == "uninitialized") {                                 /* if init state just allow user to create a new VDC Instance */
        console.log("first state");
        $(".uninitialized").show();
        $(".initialized").hide();
        $("#create-vdc").prop("disabled", false);
        $("#clear-vdc").prop("disabled", true);
        $("#submit-vdc").prop("disabled", true);
    }
    else {                                                  /* the user can use all the buttons except create VDC Instance */
        $(".uninitialized").show();
        $(".initialized").show();
        $("#create-vdc").prop("disabled", true);
    }
    $("#create-vdc").click(function() {
        jsState = "initialized";
        $(".initialized").fadeIn("slow");
        $("#create-vdc").prop("disabled", true);
        $("#clear-vdc").prop("disabled", false);
        $("#submit-vdc").prop("disabled", false);
        $('html,body').stop().animate({
          scrollTop: 300
        }, 1000);
    });   
});
