document.addEventListener("DOMContentLoaded", function () {
  const num_items_saved = Object.keys(localStorage).length; //Number of items saved
  reassign_keys(); //Reassign keys if necessary on each page load
  loopToLoadDataItems();

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

    const priceElement = document.createElement("span");
    priceElement.classList.add("price");
    priceElement.textContent = itemData.price;

    const dateElement = document.createElement("span");
    dateElement.classList.add("date");
    dateElement.textContent = `Added on: ${itemData.date}`;

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
    location.reload(); //Refresh the page to display updated data
  }

  function reassign_keys() {
    for (let i = 1; i <= num_items_saved; i++) {
      //Check if item exists or was deleted
      if (!localStorage.getItem(`item${i}`)) {
        //Ensuring the following item exists or it was never created
        if (localStorage.getItem(`item${i + 1}`)) {
          const new_key = `item${i}`; //Make the new key previous to the deleted item
          localStorage.setItem(new_key, localStorage.getItem(`item${i + 1}`)); //Assigning the new key to item
          localStorage.removeItem(`item${i + 1}`); //Remove the old item from the local storage
        }
      }
    }
    //End of reassign_keys function
  }

  function loopToLoadDataItems() {
    //Load items from localStorage and display them in a table
    if (num_items_saved > 0) {
      //Checking if localStorage has values
      for (let i = 1; i <= num_items_saved; i++) {
        //For loop to populate rows with data
        const itemData = JSON.parse(localStorage.getItem(`item` + i)); //Get item data from localStorage based on key

        populateRowData(itemData); //Format and populate row data
      }
    } else {
      alert("No items saved yet!");
    }
  }

  function clearAllItems() {
    for (let i = 0; i <= num_items_saved; i++) {
      localStorage.removeItem(`item${i}`); //Remove all items from localStorage
      location.href("popup.html"); //Redirect to popup.html to add new items (will clear the current items as well)
      // location.reload(); //Refresh the page to display updated data
    }
  }

  //Add event listener for clear all items button
  const clearAllBtn = document.getElementById("clear-all-btn");
  clearAllBtn.addEventListener("click", clearAllItems);

  //End of DOMContentLoaded
});
