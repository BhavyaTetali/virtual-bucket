// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function () {
  // Populate the user table on initial page load
  populateTable($("#email").val());
});

// Functions =============================================================

// Fill table with data
function populateTable(email) {
  // Empty content string
  var tableContent = "";

  $.post("/dashboard/", { username: email }).done(function (data) {
    // For each item in our JSON, add a table row and cells to the content string
    console.log(data.message[0].fileName);
    console.log(data.message[0].fileType);
    console.log(data.message[0].updatedTime);
    console.log(data.message[0].creationTime);
    $.each(data.message, function () {
      tableContent += "<tr>";
      //tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
      tableContent += "<td>" + this.fileName.S + "</td>";
      tableContent += "<td>" + this.fileType.S + "</td>";
      tableContent +=
        "<td>" + new Date(this.creationTime.S).toLocaleString() + "</td>";
      tableContent +=
        "<td>" + new Date(this.updatedTime.S).toLocaleString() + "</td>";
      tableContent +=
        '<td><button type="button" class="btn btn-primary" value="' +
        this.fileName.S +
        '" onclick="downloadFun(this.value)">Download</button></td>';
      tableContent +=
        '<td><button type="button" class="btn btn-danger" value="' +
        this.fileName.S +
        '" onclick="deleteFun(this.value)">Delete</button></td>';
      // tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += "</tr>";
    });

    // Inject the whole content string into our existing HTML table
    console.log(tableContent);
    console.log($("#fileList table tbody").html());
    $("#fileList tbody").html(tableContent);
    $("#userList").trigger("update");
  });
}

function downloadFun(fileName) {
  console.log("Sending download request for " + fileName);
  // $.get( "/download/", { userName: $('#email').val(), fileName: fileName}).done(function(data){
  //   console.log(data);
  // });

  const url =
    "/download/?userName=" + $("#email").val() + "&fileName=" + fileName;

  fetch(url)
    .then((resp) => resp.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      // the filename you want
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      alert("Downloaded file!");
    })
    .catch(() => alert("Unable to download! Please try again!"));
}
function deleteFun(fileName) {
  if (!confirm("Are you sure?")) {
    return;
  }
  var email = $("#email").val();
  console.log("Sending delete request for " + fileName);
  
  $.post( "/delete/", { username: email, filename: fileName})
  .done(function(data){
    populateTable(email);
    alert('Deleted file successfully!');
  })
  .fail(function(data) {
    alert(data.message);
  });

}
