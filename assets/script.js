// Keys to be attached to get the response from Marvel server
const publicKey = "14d27cc0e17db4c46e2a1c8c038702f8";
const privateKey = "dd786203735e0d58df194e5f71e0a50fbc7df72a";
const apiUrl = "https://gateway.marvel.com:443/v1/public/characters?";
//Name "starts with" url = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=";

// let outer_container = document.getElementById("outer_container");
// let thumbnail_container = document.getElementsByClassName(
//   "thumbnail_container"
// )[0];
// let right_container = document.getElementsByClassName("right_container")[0];

//fetch data from Marvel server
function fetchData(name) {
  const ts = Date.now();
  console.log(ts);
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
  const url = `${apiUrl}ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${name}`;
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

// response from the API is stored in a variable named 'data'
//const hero = ch_data.data.results[0];

// extract the name, description, and thumbnail from the hero object


// display the information on the page

//ids for name, description and image
// return fetch(url)
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw new Error("Network response was not ok.");
//   })

//     .then(data => {
//       const response = data.data.results[0];
//       const nameElement = document.getElementById("name");
//       nameElement.textContent = response.name;
//       const descriptionElement = document.getElementById("description");
//       descriptionElement.textContent = response.description;
//       const imageElement = document.getElementById("image");
//       imageElement.src = `${response.thumbnail.path}.${response.thumbnail.extension}`;
//     })
//     .catch(error => console.log("There was a problem with the fetch operation: ", error));
// }

//call fetchData function when the button is clicked
document.getElementById("button").addEventListener("click", function (event) {
  const name = document.getElementById("heroName").value;
  fetchData(name);
  event.preventDefault();
});

//document.addEventListener('DOMContentLoaded', submitButton)
//var apiKey="14d27cc0e17db4c46e2a1c8c038702f8"
//var pKey="dd786203735e0d58df194e5f71e0a50fbc7df72a"
//var hash = md5(number + pKey + apiKey);
//function submitButton() {
//add a timestamp to the request
//var number = Date.now()
//var req = new XMLHttpRequest();
//var apiUrl = 'https://gateway.marvel.com/v1/public/characters?name='
//var name = document.getElementById('heroName').value;
//var heroNameData = apiUrl + name + '&ts=' + number + '&apikey=' + apiKey + '&hash=' + pKey;

//document.getElementById('submit').addEventListener('click', function(event) {
//  document.getElementById('heroName').textContent = "";
// document.getElementById('description').textContent = "";
// document.getElementById('image').textContent = "";
//  });
// req.open('GET', heroNameData, true);

// req.setRequestHeader('Content-Type', 'application/json');
//  req.addEventListener('load', function() {
//    if (req.status >= 200 && req.status < 400) {
//        var response = JSON.parse(req.responseText);
//        console.log(response);
//       document.getElementById('name').textContent = response.data.results[0].name;
//      document.getElementById('description').textContent = response.data.results[0].description;
//       document.getElementById('image').textContent = response.data.results[0].thumbnail.path + '.' + response.data.results[0].thumbnail.extension;
//  } else {
//       console.log("Error in network request: " + req.statusText);
//  }
//   event.preventDefault();
//  });
//   req.send(null);
//};
