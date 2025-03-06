// Listen for adding product X to the cart
$(document).on("click", ".combo-add-to-cart-button", function () {
  // Get the product ID dynamically from the closest form or the button
  var addedProductID = $(this).closest("form").find('input[name="id"]').val(); // Get the current product ID (the ID of the button being clicked)

  // Assuming you have data attributes or a way to link Product X and Y dynamically, for example:
  var productXID = $(this).data("product-x-id"); // Get Product X ID dynamically if set on the button
  var productYID = $(this).data("product-y-id"); // Get Product Y ID dynamically if set on the button

  // If product X is added, automatically add product Y
  if (addedProductID == productXID) {
    // Add product X to the cart dynamically
    $.ajax({
      type: "POST",
      url: "/cart/add.js",
      data: { id: productXID, quantity: 1 }, // Adjust quantity as needed
      dataType: "json",
      success: function () {
        // Add product Y to the cart after Product X
        $.ajax({
          type: "POST",
          url: "/cart/add.js",
          data: { id: productYID, quantity: 1 }, // Adjust quantity as needed
          dataType: "json",
          success: function () {
            // Update the cart on the page without refreshing
            updateCart(); // Function to update the cart dynamically
          },
          error: function () {
            console.log("Error adding Product Y to the cart");
          },
        });
      },
      error: function () {
        console.log("Error adding Product X to the cart");
      },
    });
  }
});

// Function to dynamically update the cart on the page
function updateCart() {
  // Make an AJAX call to get the current cart contents
  $.ajax({
    type: "GET",
    url: "/cart.js",
    dataType: "json",
    success: function (cart) {
      // Update cart UI based on the current cart object
      // For example, update the cart count and cart summary
      var cartCount = cart.item_count; // Number of items in the cart
      var cartSubtotal = cart.total_price / 100; // Cart total price (divide by 100 to get dollars if you're using cents)

      // Update the cart count display
      $(".cart-count").text(cartCount);
      $(".cart-subtotal").text("$" + cartSubtotal.toFixed(2));

      // Optionally, update the cart items list if you're showing it on the page
      var cartItemsHTML = "";
      $.each(cart.items, function (index, item) {
        cartItemsHTML += "<li>" + item.quantity + " x " + item.title + "</li>";
      });
      $(".cart-items-list").html(cartItemsHTML);
    },
    error: function () {
      console.log("Error fetching cart data");
    },
  });
}
