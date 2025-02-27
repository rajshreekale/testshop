// Get the button that opens the popup
var btn = document.getElementById("openPopup");

// Get the popup
var popup = document.getElementById("popup");

// Get the <span> element that closes the popup
var closeBtn = document.getElementById("closePopup");

var submitBtn = document.getElementById("submitEmail");
var emailInput = document.getElementById("emailInput");
var responseMessage = document.getElementById("responseMessage");

// When the user clicks the button, open the popup
btn.onclick = function () {
  popup.style.display = "block";
  document.getElementById("responseText").textContent = "";
};

// When the user clicks on <span> (x), close the popup
closeBtn.onclick = function () {
  popup.style.display = "none";
};

// When the user clicks anywhere outside of the popup, close it
window.onclick = function (event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
};

// Handle the AJAX request on button click
submitBtn.onclick = function () {
  var email = emailInput.value;

  if (email && validateEmail(email)) {
    // Prepare the data to send via AJAX
    var data = {
      email: email,
    };

    // Use Shopify AJAX API or your backend endpoint to send email
    var assetPath =
      "https://extentia-test-store.myshopify.com/cdn/shop/t/1/assets/refer-friend.js";

    $.ajax({
      url: assetPath,
      dataType: "script",
      success: function () {
        response = exampleFunction(data);
        document.getElementById("responseText").textContent = response;
        document.getElementById("emailInput").value = "";
        $("#popup").fadeOut(); // Hide the popup
        popup.style.display = "none";
        //console.log(response);
        // You can now use the functions or methods from the new asset file
      },
      error: function (xhr, status, error) {
        console.error("Error loading asset: " + error);
      },
    });
  } else {
    // Invalid email format
    responseMessage.textContent = "Please enter a valid email.";
    responseMessage.style.color = "red";
  }
};

// Simple email validation
function validateEmail(email) {
  var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}
