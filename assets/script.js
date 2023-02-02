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
    .then(data => {

      // assign data to ch_data
    let ch_data = data;
    let heroName = document.getElementById("name");
    let description = document.getElementById("description");
    let thumbnail = document.getElementById("thumbnail");
    
    // set the name, description, and thumbnail elements
    heroName.textContent = ch_data.data.results[0].name;
    description.textContent = ch_data.data.results[0].description;
    thumbnail.src = ch_data.data.results[0].thumbnail.path + "." + ch_data.data.results[0].thumbnail.extension;
  });
    
}




// Define an array of Marvel hero characters
// const characters = [
//   { name: "Iron Man"},
//   { name: "Captain America"},
//   { name: "Thor"},
//   { name: "Hulk"},
//   { name: "Black Widow"},
// ];

// Get a reference to the search input element
const searchInput = document.getElementById("heroName");

// Attach an event listener to the search input
searchInput.addEventListener("input", function() {
  // Get the search term from the search input
  const searchTerm = searchInput.value.toLowerCase();

  // Filter the characters array based on the search term
  const filteredCharacters = characters.filter(function(character) {
    return (
      character.name.toLowerCase().indexOf(searchTerm) !== -1);
  });

  // Log the filtered characters array to the console
  console.log(filteredCharacters);
});

// response from the API is stored in a variable named 'data'
//const hero = ch_data.data.results[0];

// extract the name, description, and thumbnail from the hero object


// display the information on the page

//ids for name, description and image

//     .catch(error => console.log("There was a problem with the fetch operation: ", error));
// }

//call fetchData function when the button is clicked
document.getElementById("button").addEventListener("click", function (event) {
  const name = document.getElementById("heroName").value;
  fetchData(name);
  event.preventDefault();
});
