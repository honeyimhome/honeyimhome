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


  createHousehold = function() {
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/household",
      data: {
        name: "John"
      }
    })
      .done(function(msg) {
        alert("Data Saved: " + msg);
      });
  };

});
