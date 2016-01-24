$(document).ready(function() {

  // Place JavaScript code here...

  // ### SIDE-NAV SHIT HERE.
  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

  // Show sideNav
  $('.button-collapse').sideNav('show');
  // Hide sideNav
  $('.button-collapse').sideNav('hide');

  // ### Button to create household
  $("#create-household").click(function() {
    // alert( "Handler for .click() called." );
    createHousehold();
  });

  // TODO: delete this shit dont need rly.
  createHousehold = function() {
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/household/new",
      data: {
        name: "another-album_with-key"
      }
    })
      .done(function(msg) {
        alert("Data Saved: " + msg);
      });
  };

  // Handling upload from webcam
  Webcam.attach('#my_camera');
  take_snapshot = function() {
    Webcam.snap(function(data_uri) {
      console.log(data_uri);
      var containerOfSnaps = $("#snapped-images");
      var count = containerOfSnaps.children().length;
      console.log("number of children" + count);
      var newSnap = document.createElement("div");
      newSnap.id = 'snap' + (count + 1);
      containerOfSnaps.append(newSnap);

      // Adding the captured image and configuring CSS
      var theActualDOMElement = $("#" + newSnap.id);
      theActualDOMElement.html('<img src="' + data_uri + '"/>');
      console.log(data_uri);
      theActualDOMElement.css("display", "inline-block");
      theActualDOMElement.find('img').addClass("circle responsive-img");

    });
  };

  // Defaults
  $("#take-snap-div").css("display", "none");
  $("#upload-file-input").css("display", "none");
  // Options
  useCamera = function() {
    console.log("in use camera");
    $("#take-snap-div").css("display", "normal");
    $("#upload-file-input").css("display", "none");
  };

  useUpload = function() {
    console.log("in use upload");
    $("#take-snap-div").css("display", "none");
    $("#upload-file-input").css("display", "normal");
  };

});
