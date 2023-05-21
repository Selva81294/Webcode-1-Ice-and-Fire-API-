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
}
foot();


//Pagination

function getPageList(totalPages, page, maxLength) {
    function range(start, end) {
      return Array.from(Array(end - start + 1), (_, i) => i + start);
    }
  
    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  
    if (totalPages <= maxLength) {
      return range(1, totalPages);
    }
  
    if (page <= maxLength - sideWidth - 1 - rightWidth) {
      return range(1, maxLength - sideWidth - 1).concat(
        0,
        range(totalPages - sideWidth + 1, totalPages)
      );
    }
  
    if (page >= totalPages - sideWidth - 1 - rightWidth) {
      return range(1, sideWidth).concat(
        0,
        range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
      );
    }
  
    return range(1, sideWidth).concat(
      0,
      range(page - leftWidth, page + rightWidth),
      0,
      range(totalPages - sideWidth + 1, totalPages)
    );
  }
  
  $(function() {
    var numberOfItems = $(".card-body .card").length;
    var limitPerPage = 3;
    var totalPages = Math.ceil(numberOfItems / limitPerPage);
    var paginationSize = 4;
    var currentPage;
  
    function showPage(whichPage) {
      if (whichPage < 1 || whichPage > totalPages) return false;
  
      currentPage = whichPage;
  
      $(".card-body .card")
        .hide()
        .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
        .show();
  
      $(".pagination li").slice(1, -1).remove();
  
      getPageList(totalPages, currentPage, paginationSize).forEach(item => {
        $("<li>")
          .addClass("page-item")
          .addClass(item ? "current-page" : "dots")
          .toggleClass("active", item === currentPage)
          .append(
            $("<a>")
              .addClass("page-link")
              .attr({ href: "javascript:void(0)" })
              .text(item || "...")
          )
          .insertBefore(".next-page");
      });
  
      $(".previous-page").toggleClass("disable", currentPage === 1);
      $(".next-page").toggleClass("disable", currentPage === totalPages);
      return true;
    }
  
    $(".pagination").append(
      $("<li>")
        .addClass("page-item")
        .addClass("previous-page")
        .append(
          $("<a>")
            .addClass("page-link")
            .attr({ href: "javascript:void(0)" })
            .text("Prev")
        ),
      $("<li>")
        .addClass("page-item")
        .addClass("next-page")
        .append(
          $("<a>")
            .addClass("page-link")
            .attr({ href: "javascript:void(0)" })
            .text("Next")
        )
    );
  
    $('.card-body').show();
    showPage(1);
  
    $(document).on(
      "click",
      ".pagination li.current-page:not(.active)",
      function (event) {
        event.preventDefault();
        return showPage(+$(this).text());
      }
    );
  
    $('.next-page').on("click", function(event){
        event.preventDefault();
      return showPage(currentPage + 1)
    })
    $('.previous-page').on("click", function(event){
        event.preventDefault();
      return showPage(currentPage - 1)
    })
  });

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
