

  $(document).ready(function(){
      console.log("hello worlds");
    $("#showSignUp").click(function(){
        console.log("entered");
      $("#signUpUserDiv").toggle();
      $("#signInUserDiv").toggle();
    });
    $("#showLogIn").click(function(){
      $("#signUpUserDiv").toggle();
      $("#signInUserDiv").toggle();
    });
  });