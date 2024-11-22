document.addEventListener("DOMContentLoaded", function () {
  //To ensure the page is fully loaded.
  console.log("Number of items saved: " + Object.keys(localStorage).length);

  const saveBtn = document.getElementById("save-btn"); //button for saving item
  const viewWlBtn = document.getElementById("view-wl-btn"); //button for viewing wishlist items
  const num_items_saved = Object.keys(localStorage).length; //Number of items saved

  saveBtn.addEventListener("click", function () {
    // Get the values from the form inputs
    const itemName = document.getElementById("item-name").value;
    const itemPrice = document.getElementById("item-price").value;
    const itemLink = document.getElementById("item-link").value;
    const itemDescription = document.getElementById("item-description").value;
    const itemKey = 1; //Start numbering items from 1.
    //Now check to see if 1 is already taken
    if (num_items_saved == 1) {
      itemKey = num_items_saved++;
    }

    //Check to see if values are not empty
    if (itemName && itemPrice && itemLink) {
      //Create object to store item data
      const itemData = {
        name: itemName,
        price: itemPrice,
        link: itemLink,
        description: itemDescription || "I want to buy this soon!", //default description
        dateSaved: new Date().toISOString(), //Store date item was saved
        item_key: itemKey, //Add a unique key to each item to avoid overwriting data
      };
      //add a checking source to ensure the item an be numbered
      localStorage.setItem(`item${itemKey}`, JSON.stringify(itemData));
      alert("Item saved");
    } else {
      alert("Please fill in all required fields");
    }
    //End of saveBtn click event listener
  });

  //View the WishList saved items
  viewWlBtn.addEventListener("click", function () {
    window.location.href = "wishlist.html";
  });

  //End of DOMContentLoaded
});
