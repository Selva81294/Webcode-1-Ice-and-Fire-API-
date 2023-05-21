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
  newDiv.setAttribute("style","display:none")
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
    /* newElement.innerHTML = `
      <li class="page-item previous-page disable"><a class="page-link" href="#">Prev</a></li>
      <li class="page-item current-page active"><a class="page-link" href="#">1</a></li>
      <li class="page-item dots"><a class="page-link" href="#">...</a></li>
      <li class="page-item current-page"><a class="page-link" href="#">5</a></li>
      <li class="page-item current-page"><a class="page-link" href="#">6</a></li>
      <li class="page-item dots"><a class="page-link" href="#">...</a></li>
      <li class="page-item current-page"><a class="page-link" href="#">10</a></li>
      <li class="page-item next-page"><a class="page-link" href="#">Next</a></li>`; */
}
foot();

/* let thisPage = 1;
let limit = 3;
let list = document.querySelectorAll('.card-body .card');



function loadItem() {
  let beginGet = limit * (thisPage - 1);
  let endGet = limit * thisPage - 1;
  list.forEach((item, key) => {
    if (key >= beginGet && key <= endGet) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  listPage();
}
loadItem();

function listPage() {
  let count = Math.ceil(list.length / limit);
  document.querySelector(".listPage").innerHTML = '';

  if (thisPage != 1) {
    let prev = document.createElement("li");
    prev.innerText = "PREV";
    prev.setAttribute("onclick", "changePage(" + (thisPage - 1) + ")");
    document.querySelector(".listPage").appendChild(prev);
  }

  for (i = 1; i <= count; i++) {
    let newPage = document.createElement("li");
    newPage.innerText = i;
    if (i == thisPage) {
      newPage.classList.add("active");
    }
    newPage.setAttribute("onclick", "changePage(" + i + ")");
    document.querySelector(".listPage").appendChild(newPage);
  }

  if (thisPage != count) {
    let next = document.createElement("li");
    next.innerText = "NEXT";
    next.setAttribute("onclick", "changePage(" + (thisPage + 1) + ")");
    document.querySelector(".listPage").appendChild(next);
  }
}

function changePage(i) {
  thisPage = i;
  loadItem();
} */
