//Check if there are items in local storage, if not , initialize an empty array
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")):
[]

console.log(itemsArray)

//Add a click event listener to the "Enter" button
document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item")
    createItem(item)
})

//Display the items in the to-do list
function displayItems(filteredItems = itemsArray){
    let items = ""
    for(let i = 0 ; i < filteredItems.length; i++){
        //create HTML elements for each item in the list
        items += `<div class="item">
        <div class="input-controller">
            <textarea disabled>${itemsArray[i]}</textarea>
            <div class="edit-controller">
                <i class="fa-solid fa-check completeBtn" style="color: #ededed;"></i>
                <i class="fa-solid fa-trash deleteBtn" style="color: #f5f5f5;"></i>
                <i class="fa-regular fa-pen-to-square editBtn"></i>  
            </div>
        </div>
        <div class="update-controller">
            <button class="saveBtn">Save</button>
            <button class="cancelBtn">Cancel</button>
        </div>
    </div>`
    }  //Insert the generated HTML into the "To-do-list" element
    document.querySelector(".to-do-list").innerHTML = items
    //Add event listeners for various actions
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}
//Function to activate delete item listeners
function activateDeleteListeners(){
    // Select all delete buttons and attach click event listeners
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => { deleteItem(i)})
    })
}

// Function to activate edit item listeners
function activateEditListeners() {
    const editBtn = document.querySelectorAll(".editBtn");
    const updatecontroller = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");

    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () => {
            updatecontroller[i].style.display = "block";
            inputs[i].disabled = false;

            const checkBtn = updatecontroller[i].querySelector(".fa-check");
            checkBtn.addEventListener("click", () => {
                completeTask(i);
                inputs[i].style.display = "none"; // Hide the textarea after completing
            });
        });
    });
}

/*Function to complete a task */
function completeTask(index) {
    const task = JSON.parse(itemsArray[index]);
    task.completed = !task.completed;
    itemsArray[index] = JSON.stringify(task);

    localStorage.setItem("items", JSON.stringify(itemsArray));
    displayItems();
}




function activateSaveListeners(){
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb,i) => {
        sb.addEventListener("click", () => {
            updateItem(inputs[i].value,i)
        })
    })
}

function activateCancelListeners(){
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updatecontroller = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cb,i) => {
        cb.addEventListener("click",() => {
            updatecontroller[i].style.display = "none"
            inputs[i].disabled = true
        })
    })
}
//function to update an item
function updateItem(text, i){
    itemsArray[i] = text
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}

//function to delete an item
function deleteItem(i){
    itemsArray.splice(i,1)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
    updateTaskCount();
}
//function to create a new item
function createItem(item){
    itemsArray.push(item.value)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
    updateTaskCount();
}

//function to display the current date
function displayDate(){
    let date = new Date()
    date = date.toString().split(" ")
    document.querySelector("#date").innerHTML = date[1] + " "+ date[2]+ " "+ date[3]
}
// run these functions when the window loads
window.onload = function(){
    displayDate()
    displayItems()
    updateTaskCount();
    /* */
    const headingSpans = document.querySelectorAll(".todo-list-heading span");
    headingSpans.forEach((span, index) => {
        span.style.setProperty('--index', index);
    });

    const animatedHeading = document.querySelector(".animated-heading");
    animatedHeading.classList.add("start-animation");

    // Remove the animation class after the animation is done
    animatedHeading.addEventListener("animationend", () => {
        animatedHeading.classList.remove("start-animation");
    });
/* */
}

/* */
document.querySelector("#sortBtn").addEventListener("click", () => {
    sortItems();
});

function sortItems() {
    itemsArray.sort(); // This sorts the items alphabetically

    // Save the sorted array back to local storage
    localStorage.setItem("items", JSON.stringify(itemsArray));

    // Refresh the displayed items
    displayItems();
}

document.querySelector("#filterBtn").addEventListener("click", () => {
    const filterOptions = document.querySelector("#filterOptions");
    filterOptions.style.display = filterOptions.style.display === "block" ? "none" : "block";
});

document.querySelector("#completedFilter").addEventListener("click", () => {
    filterTasks("completed");
});

document.querySelector("#uncompletedFilter").addEventListener("click", () => {
    filterTasks("uncompleted");
});

function filterTasks(status) {
    const filteredItems = itemsArray.filter(item => {
        const task = JSON.parse(item);
        return (status === "completed" && task.completed);
    });

    displayFilteredItems(filteredItems);
}

function displayFilteredItems(filteredItems) {
    let items = "";
    for (let i = 0; i < filteredItems.length; i++) {
        items += `<div class="item">
        <div class="input-controller">
            <textarea disabled>${filteredItems[i]}</textarea>
            <div class="edit-controller">
                <i class="fa-solid fa-check" style="color: #ededed;"></i>
                <i class="fa-solid fa-trash deleteBtn" style="color: #f5f5f5;"></i>
                <i class="fa-regular fa-pen-to-square editBtn"></i>  
            </div>
        </div>
        <div class="update-controller">
            <button class="saveBtn">Save</button>
            <button class="cancelBtn">Cancel</button>
        </div>
    </div>`;
    }
    document.querySelector(".to-do-list").innerHTML = items;
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
}


/* */
//FILTER BUTTON NOT WORKING
// Inside your existing code, update or add these parts:

// Add a class to identify the checkbox icon for marking as completed
const completeBtns = document.querySelectorAll(".completeBtn");

// ... (your existing code)

function activateCompleteListeners() {
    completeBtns.forEach((completeBtn, i) => {
        completeBtn.addEventListener("click", () => {
            hideTaskFromInput(i);
            markTaskAsCompleted(i);
        });
    });
}

function hideTaskFromInput(index) {
    const inputControllers = document.querySelectorAll(".input-controller");
    inputControllers[index].style.display = "none";
}

function markTaskAsCompleted(index) {
    const task = JSON.parse(itemsArray[index]);
    task.completed = true;
    itemsArray[index] = JSON.stringify(task);

    localStorage.setItem("items", JSON.stringify(itemsArray));
    displayItems();
}

// ... (your existing code)

document.querySelector("#completedFilter").addEventListener("click", () => {
    filterTasks("completed");
});


/* */
function updateTaskCount() {
    const taskCount = document.getElementById("taskCount");
    taskCount.textContent = `Tasks added: ${itemsArray.length}`;
}


/* */
const searchInput = document.getElementById("searchInput");
const searchResultsTextarea = document.getElementById("searchResultsTextarea");
const notFoundText = document.getElementById("notFoundText");
const inputControllers = document.querySelectorAll(".input-controller");
const HIGHLIGHT_DURATION = 2000; // 2 seconds
const HIGHLIGHT_CLASS = "highlighted";
const searchResultsList = document.querySelector(".search-results");

searchInput.addEventListener("input", () => {
    const searchQuery = searchInput.value.toLowerCase();
    
    if (searchQuery.trim() === "") {
        hideSearchResults();
    } else {
        const matchingSuggestions = getMatchingSuggestions(searchQuery);
        displayMatchingSuggestions(matchingSuggestions);
    }
});


function getMatchingSuggestions(query) {
    return itemsArray.filter(task => task.toLowerCase().includes(query));
}

searchInput.addEventListener("keyup", () => {
    if (searchInput.value === "") {
        hideSearchResults();
    }
});

function displayMatchingSuggestions(suggestions) {
    searchResultsList.innerHTML = "";

    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const listItem = document.createElement("li");
            listItem.textContent = suggestion;
            listItem.addEventListener("click", () => selectSuggestion(suggestion));
            searchResultsList.appendChild(listItem);
        });

        searchResultsList.style.display = "block";
        hideNotFoundText();
    } else {
        searchResultsList.style.display = "none";
        hideNotFoundText();
    }
}


function displaySearchResults(results) {
    searchResultsList.innerHTML = "";
    
    if (results.length > 0) {
        results.forEach(result => {
            const listItem = document.createElement("li");
            listItem.textContent = result;
            listItem.addEventListener("click", () => selectTaskFromMenu(result));
            searchResultsList.appendChild(listItem);
        });

        searchResultsList.style.display = "block";
        hideNotFoundText();
    } else {
        searchResultsList.style.display = "none";
        showNotFoundText();
    }
}

function selectTaskFromMenu(selectedTask) {
    const matchingInputController = Array.from(inputControllers).find(controller => {
        const textarea = controller.querySelector("textarea");
        return textarea.value.trim().toLowerCase() === selectedTask.toLowerCase();
    });

    if (matchingInputController) {
        highlightInputController(matchingInputController);
    }
}

function highlightTask(selectedSuggestion) {
    inputControllers.forEach(controller => {
        const textarea = controller.querySelector("textarea");
        const taskText = textarea.value.toLowerCase();

        if (taskText.includes(selectedSuggestion.toLowerCase())) {
            textarea.classList.add(HIGHLIGHT_CLASS);
            setTimeout(() => {
                textarea.classList.remove(HIGHLIGHT_CLASS);
            }, 2000); // Remove the highlight class after 2 seconds
        }
    });
}


function highlightInputController(controller) {
    controller.classList.add("highlighted");
    setTimeout(() => {
        controller.classList.remove("highlighted");
    }, HIGHLIGHT_DURATION);
}

function hideSearchResults() {
    searchResultsTextarea.value = "";
    searchResultsTextarea.parentElement.style.display = "none";
    hideNotFoundText();
}

function showNotFoundText() {
    notFoundText.style.display = "block";
    notFoundText.classList.add("not-found-animation");
}

function hideNotFoundText() {
    notFoundText.style.display = "none";
    notFoundText.classList.remove("not-found-animation");
}

function selectSuggestion(selectedSuggestion) {
    searchInput.value = selectedSuggestion;
    searchResultsList.style.display = "none";
    highlightTask(selectedSuggestion);
}

/* */
 