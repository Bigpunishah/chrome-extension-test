document.addEventListener("DOMContentLoaded", function () {
  //To ensure the page is fully loaded.
  console.log("Number of items saved: " + Object.keys(localStorage).length);
  console.log(localStorage);
  // localStorage.clear();

  const saveBtn = document.getElementById("save-btn"); //button for saving item
  const viewWlBtn = document.getElementById("view-wl-btn"); //button for viewing wishlist items
  let num_items_saved = Object.keys(localStorage).length; //Number of items saved
  //Current date for saving record
  let currentDate =
    new Date().getMonth() +
    "-" +
    new Date().getDate() +
    "-" +
    new Date().getFullYear();

  saveBtn.addEventListener("click", function () {
    // Get the values from the form inputs
    let itemName = document.getElementById("item-name").value;
    let itemPrice = document.getElementById("item-price").value;
    let itemLink = document.getElementById("item-link").value;
    let itemDescription = document.getElementById("item-description").value;
    let itemKey = num_items_saved;

    //Check to see if values are not empty
    if (itemName && itemPrice && itemLink) {
      //Create object to store item data
      const itemData = {
        name: itemName,
        price: itemPrice,
        link: itemLink,
        description: itemDescription || "I want to buy this soon!", //default description
        dateSaved: currentDate, //Store date item was saved
        item_key: itemKey, //Add a unique key to each item to avoid overwriting data
      };

      //add a checking source to ensure the item an be numbered
      localStorage.setItem(`item${itemKey}`, JSON.stringify(itemData));
      clear_input_fields(); //Clear input fields after saving item
      alert("Item saved");
      location.reload(); //Reload location
    } else {
      alert("Please fill in all required fields");
    }
    //End of saveBtn click event listener
  });

  //View the WishList saved items
  viewWlBtn.addEventListener("click", function () {
    window.location.href = "wishlist.html";
  });

  function clear_input_fields() {
    //Clear input fields
    document.getElementById("item-name").value = "";
    document.getElementById("item-price").value = "";
    document.getElementById("item-link").value = "";
    document.getElementById("item-description").value = "";
  }

  //End of DOMContentLoaded
});
