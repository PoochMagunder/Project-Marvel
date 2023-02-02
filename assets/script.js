// Keys to be attached to get the response from Marvel server
const publicKey = "14d27cc0e17db4c46e2a1c8c038702f8";
const privateKey = "dd786203735e0d58df194e5f71e0a50fbc7df72a";
const apiUrl = "https://gateway.marvel.com:443/v1/public/characters?";

//Name "starts with" url = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=";

//fetch data from Marvel server
function fetchData(nameStartsWith) {
  const ts = Date.now();
  console.log(ts);
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
  const url = `${apiUrl}ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${nameStartsWith}`;
  console.log(url);

  //returns a promise that fetches the data from the url, processes json and updates page elements
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // assign data to ch_data
      let ch_data = data;
      let heroName = document.getElementById("name");
      let description = document.getElementById("description");
      let thumbnail = document.getElementById("thumbnail");

      // set the name, description, and thumbnail elements
      heroName.textContent = ch_data.data.results[0].name;
      description.textContent = ch_data.data.results[0].description;
      thumbnail.src =
        ch_data.data.results[0].thumbnail.path +
        "." +
        ch_data.data.results[0].thumbnail.extension;
    });
}

// Get a reference to the search input element
const searchInput = document.getElementById("heroName");


//     .catch(error => console.log("There was a problem with the fetch operation: ", error));
// }

//call fetchData function when the button is clicked
document.getElementById("button").addEventListener("click", function (event) {
  const name = document.getElementById("heroName").value;
  fetchData(name);
  event.preventDefault();
  saveToStorage(name);
//clear search input
  document.getElementById("heroName").value = "";
});

 // reset search input
 $("#heroName").val("");

var saveToStorage = function (newHero) {
  console.log("Saving to storage!");
  console.log("newHero: ", newHero);
  var savedSearchHistory =
    JSON.parse(localStorage.getItem("savedSearches")) || [];
  if (savedSearchHistory.includes(newHero)) {
    return;
  }
  savedSearchHistory.push(newHero);
  console.log("savedSearchHistory: ", savedSearchHistory);
  localStorage.setItem("savedSearches", JSON.stringify(savedSearchHistory));
loadStorage();
};

//local Storage on load
function loadStorage() {
  let savedSearches = JSON.parse(localStorage.getItem("savedSearches") || "[]");
  let listHolder = document.querySelector(".listHolder");
  listHolder.innerHTML = "";

  // Loop through the saved searches and add each one to the listHolder element
  
  savedSearches.forEach((search) => {
    let listItem = document.createElement("div");
    listItem.innerHTML = search;
    listHolder.appendChild(listItem);
  });
};


var searchHistoryList = function (heroName) {
  // remove any existing entries with the same hero name
  $('.past-search:contains("' + heroName + '")').remove();


  // append entry to container
  searchEntryContainer.append(searchHistoryEntry);

  // append entry container to search history container
  var searchHistoryContainerEl = $("#listContainer");
  searchHistoryContainerEl.append(searchEntryContainer);

  // update savedSearches array with previously saved searches
  var previousSavedSearches = localStorage.getItem("savedSearches");
  if (previousSavedSearches) {
    savedSearches = JSON.parse(previousSavedSearches);
  }

  // reset search input
  $("#heroName").val("");
};

// called when a search history entry is clicked
$(".listHolder").on("click", "div", function () {
  // get text (hero name) of entry and pass it as a parameter to display hero details
  var previousSearchName = $(this).text();
  fetchData(previousSearchName);
  

  //
  var previousSearchName = $(this);
});

loadStorage();




