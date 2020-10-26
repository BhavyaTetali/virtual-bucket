$(document).ready(function () {
  $("#showSignUp").click(function () {
    $("#signUpUserDiv").toggle();
    $("#signInUserDiv").toggle();
    $("#msgBlock").hide();
  });
  $("#showLogIn").click(function () {
    $("#signUpUserDiv").toggle();
    $("#signInUserDiv").toggle();
    $("#msgBlock").hide();
  });

  if ($("#signUpMsg").text().trim() != "" || $("#signUpErrMsg").text().trim() != "") {
    $("#signUpUserDiv").toggle();
    $("#signInUserDiv").toggle();
  }
  if ($("#signUpMsg").text().trim() == "") {
    $("#signUpMsg").hide();
  }
  if ($("#signUpErrMsg").text().trim() == "") {
    $("#signUpErrMsg").hide();
  }
});
