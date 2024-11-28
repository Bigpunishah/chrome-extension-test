document.addEventListener("DOMContentLoaded", function () {
  let num_items_saved = Object.keys(localStorage).length; //Number of items saved
  reassign_keys(); //Reassign keys if necessary on each page load
  loopToLoadDataItems();
  console.log(localStorage);

  function populateRowData(itemData) {
    const itemsListContainer = document.getElementById("itemsListContainer"); // Container for items list
    // Create a new list item container
    const listItem = document.createElement("li");
    listItem.classList.add("list-item"); // Optional: You can add a class for styling

    // Create and append elements for each property in the item
    const nameElement = document.createElement("h3");
    nameElement.textContent = itemData.name;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = itemData.description;

    const priceElement = document.createElement("h2");
    priceElement.classList.add("price");
    priceElement.textContent = "$" + itemData.price;

    const dateElement = document.createElement("span");
    dateElement.classList.add("date");
    dateElement.textContent = `Added on: ${itemData.dateSaved}`;

    const buttonLinkElement = document.createElement("button");
    buttonLinkElement.textContent = "Buy";
    buttonLinkElement.addEventListener("click", () => {
      window.open(itemData.link, "_blank"); // Open the link in a new tab
    });

    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.textContent = "Delete";
    buttonDeleteElement.addEventListener("click", () => {
      deleteItem(itemData.item_key); // Delete the item
    });

    // Append these elements to the list item
    listItem.appendChild(nameElement); // Add name to the list item
    listItem.appendChild(descriptionElement); // Add description to the list item
    listItem.appendChild(priceElement); // Add price to the list item
    listItem.appendChild(dateElement); // Add date to the list item
    listItem.appendChild(buttonLinkElement); // Add Buy button to the list item
    listItem.appendChild(buttonDeleteElement); // Add delete button to the list item

    // Append the list item to the container
    itemsListContainer.appendChild(listItem);
  }

  function deleteItem(item_key) {
    //Individual deletetion only for now
    localStorage.removeItem("item" + item_key); //Remove the item from local storage
    reassign_keys(); //Reassign keys after deletion
    // populateRowData(localStorage.getItem(`item${item_key}`)); //Repopulate the data - need this or the delete button
    loopToLoadDataItems();
    location.reload(); //Refresh the page to display updated data
  }

  function reassign_keys() {
    let i = 0;

    console.log("Going through loop to reassign");

    // Loop to find missing items and reassign keys
    while (true) {
      // Check if the current item exists
      if (localStorage.getItem(`item${i}`) === null) {
        // If the current item doesn't exist, check for the next available item
        let j = i + 1;
        while (localStorage.getItem(`item${j}`) !== null) {
          // If the next item exists, move it to the current position
          localStorage.setItem(`item${i}`, localStorage.getItem(`item${j}`));

          // Remove the old item after shifting it
          localStorage.removeItem(`item${j}`);

          // Move to the next index
          i++;
          j++;
        }
        // If no more items are found, break the loop
        break;
      } else {
        // Item exists, move to the next index
        i++;
      }
    }

    console.log("Finished reassign_keys");
  }

  function loopToLoadDataItems() {
    // Check if there are any items saved (num_items_saved should be set somewhere in your code)
    if (num_items_saved > 0) {
      let i = 0;

      // Loop through and load each item from localStorage
      while (localStorage.getItem(`item${i}`) !== null) {
        // Get item data from localStorage (assuming data is JSON stringified)
        let itemData = JSON.parse(localStorage.getItem(`item${i}`));
        itemData.item_key = i; //Reassigning the item key for when an item is/was deleted

        // Populate the row with the retrieved item data
        populateRowData(itemData);

        // Move to the next index
        i++;
      }
    } else {
      location.href = "popup.html"; //Redirect to the popup page if no items are saved yet
      alert("No items saved yet!");
    }
    //End of loopToLoadDataItems function
  }

  function clearAllItems() {
    localStorage.clear(); //Clear all items from local storage
    location.reload(); //Refresh the page to display updated data
  }

  //Add event listener for clear all items button
  const clearAllBtn = document.getElementById("clear-all-btn");
  clearAllBtn.addEventListener("click", clearAllItems);

  //End of DOMContentLoaded
});
