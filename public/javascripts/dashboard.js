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
    $.each(data.message, function () {
      tableContent += "<tr>";
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
  const url =
    "/download/?userName=" + $("#email").val() + "&fileName=" + fileName;

  fetch(url)
    .then((resp) => resp.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      alert("Downloaded file!");
    })
    .catch(() => alert("Unable to download! Please try again!"));
}

function deleteFun(fileName) {
  if (!confirm("Are you sure you want to delete "+fileName+"?")) {
    return;
  }
  var email = $("#email").val();
  console.log("Sending delete request for " + fileName);

  $.post("/delete/", { username: email, filename: fileName })
    .done(function (data) {
      populateTable(email);
      alert("Deleted file successfully!");
    })
    .fail(function (data) {
      alert(data.message);
    });
}

function uploadFile() {
  console.log("Sending upload file request!");
  var email = $("#email").val();
  var form = $("#fileUploadForm")[0];
  var fd = new FormData(form);
  fd.append("username", email);

  $.ajax({
    url: "/upload/",
    type: "POST",
    enctype: "multipart/form-data",
    data: fd,
    processData: false,
    contentType: false,
    cache: false,
    success: function (data) {
      populateTable(email);
      alert("Uploaded file successfully!");
    },
    error: function (response, msg, error) {
      console.log(error);
      alert(response.responseJSON.err);
    },
  });
}

function signOut() {
  $.post("/signout/", { token: "" }).done(function (data) {
    window.location.href = '/';
  }).fail(function (data) {
    window.location.href = '/';
  });
}