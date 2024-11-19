document.addEventListener("DOMContentLoaded", function () {
  //To ensure the page is fully loaded.

  const saveBtn = document.getElementById("save-btn");

  saveBtn.addEventListener("click", function () {
    // Get the values from the form inputs
    const itemName = document.getElementById("item-name").value;
    const itemPrice = document.getElementById("item-price").value;
    const itemLink = document.getElementById("item-link").value;
    const itemDescription = document.getElementById("item-description").value;

    //Check to see if values are not empty
    if (itemName && itemPrice && itemLink) {
      //Create object to store item data
      const itemData = {
        name: itemName,
        price: itemPrice,
        link: itemLink,
        description: itemDescription || "", //default description
        dateSaved: new Date().toISOString, //Store date item was saved
      };
    } else {
      alert("Please fill in all required fields");
    }
    //End of saveBtn click event listener
  });

  //View the WishList saved items
  const viewWlBtn = document.getElementById("view-wl-btn");
  viewWlBtn.addEventListener("click", function () {
    window.location.href = "wishlist.html";
  });

  //End of DOMContentLoaded
});
