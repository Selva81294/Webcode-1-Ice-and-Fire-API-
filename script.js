function container() {
  let newElement = document.createElement("div");
  document.body.append(newElement);
  newElement.setAttribute("class", "container");
}
container();

function head() {
  let newDiv = document.querySelector(".container");
  let newElement = document.createElement("header");
  newDiv.appendChild(newElement);
  newElement.setAttribute("class", "head");
  newElement.innerHTML = `<h1>Ice and Fire API Fetch</h1>`;
}
head();

async function fetchBookData() {
  let newElement = document.querySelector(".container");
  let newDiv = document.createElement("div");
  newElement.appendChild(newDiv);
  newDiv.setAttribute("style", "display:none");
  newDiv.setAttribute("class", "card-body");
  try {
    let res = await fetch("https://anapioficeandfire.com/api/books", {
      method: "GET",
    });
    let value = await res.json();
    value.map((data) => {
      newDiv.innerHTML += `<div class="card" style="width: 24rem">
            <div class="card-header">
              ${data.name}
            </div>
            <div class="card-content">
              <h5>ISBN: <span>${data.isbn}</span> </h5>
              <h5>No. Of Pages: <span>${data.numberOfPages}</span> </h5>
              <h5>Author: <span>${data.authors}</span></h5>
              <h5>Publisher Name: <span>${data.publisher}</span></h5>
              <h5>Released Date: <span>${data.released.slice(0, 10)}</span></h5>
            </div>
          </div>`;
    });
  } catch (error) {
    console.log(error);
  }
}
fetchBookData();

function foot() {
  let newElement = document.createElement("div");
  document.body.append(newElement);
  newElement.setAttribute("class", "pagination");
}
foot();
