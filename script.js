let cur = 0;
const numOfItemsPerPage = 3;
const   url = 'https://anapioficeandfire.com/api/books',
        getData = fetch (url).then(res => res.json()),
        fetchData =[];
    getData.then(data => fetchData.push(...data))
           .then( _ => {           
                renderElements(fetchData);
           } ); 
const txt = document.getElementsByTagName('input')[0];
function findDataByName  (name)  {
    const regex = new RegExp(name, 'ig');
    const r =  fetchData.filter ( data  => {
        return data.name.match (regex) || data.nativeName.match(regex);
    });
    return r;
    

}           
txt.onkeyup = () => {
    const string = txt.value;
    console.log(txt.value);
    const ret = findDataByName(string);
    renderElements(ret);
};
// this function is mainly the APP 
function renderElements ( objectsArray ) {
    const allPages = getNumberOfAllPages(objectsArray.length, numOfItemsPerPage); 
    const body = document.getElementsByTagName('body')[0];

    // Delete All elements in container
    // fastest way to delete the Container itself then make A new one
    document.querySelectorAll('.container').forEach(element => {
        body.removeChild(element);
    });
    const container = document.createElement('div');
    container.className = 'container';
     for (elemnt of objectsArray){
        container.innerHTML += createElements(elemnt);
    }

    // we should insert the container back in the second method
    body.insertBefore(container, body.lastElementChild);
    // Rest curPage to zero 
    cur = 0;
    hideAll();
    makeALinkTags(allPages);
    goToPage(cur);
}
//#region Pagination 
function getNumberOfAllPages (n , m) {
    return Math.ceil( n / m );
}
function hideAll () {
    const container = document.querySelector('.container');
    for (i of container.children) {
        i.style.display = 'none';
    }
}

function makeALinkTags ( n  ) { 
    if (document.getElementsByTagName('body')[0].lastElementChild.tagName === 'UL')
        document.getElementsByTagName('body')[0].removeChild(document.getElementsByTagName('body')[0].lastElementChild);
     if (!n) return;
    const nav = document.createElement('ul');
    nav.className = 'pagination';
    //#region Prev
    nav.innerHTML += `<li class="page-item">
    <a class="page-link" href="#" onclick ='goPrev()' aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
      <span class="sr-only">Previous</span>
    </a>
  </li>`;
    //#endregion
    
    for (let i = 0; i < n ; i++ ){
        nav.innerHTML += `
            <li class = 'page-item' style = 'display: none;' > 
            <a  class='page-link' href = '#' onclick = 'goToPage(${i})' /> ${i + 1} </a>
            </li>
        `;
    }

    //#region Next
    nav.innerHTML += `
        <li class="page-item">
        <a class="page-link" href="#" onclick = 'goNext()' aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
        </a>
        </li>       `;
    //#endregion
    nav.children[1].classList.add('active');
    document.getElementsByTagName('body')[0].appendChild (nav);
}

// @Params : n => current pageNumber before we go to nextPage 
// e.g: if we are in page 1 and we want to go to page 2 we should delete all elements of page 1
// and that's what this function is Doing
function hideCur (  n  ){
    // Getting Contaienr 
    const container = document.querySelector('.container');
    // Getting ul Pagination
    const pagination = document.querySelectorAll ('.pagination > li');
    // removeActive from the [a] you've clicked
    pagination[n + 1].classList.remove('active');
    // this value is for searching, imagine that we have just 2 elements and numberOfItemsPerPage > 2
    // we are going to go outbownd of the Array of the children, and this how to handle this case
    const N = Math.min(numOfItemsPerPage + n * numOfItemsPerPage , container.children.length);
    for (let i = n * numOfItemsPerPage ; i <  N; i++) {
        // normal element hiding
        container.children[i].style.display = 'none';
    }
}

function goToPage ( n ) {
    // delete old posts
    hideCur( cur );
    const container = document.querySelector('.container'),
            pagination = document.querySelectorAll ('.pagination > li');
    
    // Make Acive to link that've been clicked
    pagination[n + 1].classList.add('active');
    
    // kind of bad 
    /*

        THIS FUNCTION NEED TO BE UPGRADED

    */
    for (let i = cur + 1; i <= n; i++) {
        pagination[i].style.display = 'none';
    }

    // Settings cur to new page Number
    cur = n;
    for (let i = cur + 1; i < Math.min (cur + 6, pagination.length); i++) {
        pagination[i].style.display = 'block';
    }
    
    const N = Math.min(numOfItemsPerPage + n * numOfItemsPerPage , container.children.length);
    for (let i = n * numOfItemsPerPage ; i < N ; i++) {
        container.children[i].style.display = 'block';
    }
}

function goNext () {
    // Last page ? don't fucking go anyware
    if (cur === getNumberOfAllPages( fetchData.length, numOfItemsPerPage ) - 1) return ;
    goToPage(cur + 1);
}

function goPrev (){
    if (cur === 0) return;
    goToPage(cur - 1);
}

// alot of lines but it's easier than anything 
function createElements (data) {
    let langs = "";
    // for (i of country.name){
    //     langs += `${i.name} ,`;
    // }
    langs = langs.substring(0, langs.length-1);
    const character = data.characters.slice(0, 5);
    return `
        <div class="card" style="width: 25rem">
            <h5 class="card-title">${data.name} </h5>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ISBN : ${data.isbn}</li>
            <li class="list-group-item">Number of Pages : ${data.numberOfPages}</li>
            <li class="list-group-item">Authors : ${data.authors}</li>
            <li class="list-group-item">Publisher : ${data.publisher}</li>
            <li class="list-group-item">Date of Released : ${data.released.slice(0, 10)}</</li>
            ${character
                .map(
                  (item, key) =>
                    `<li class="list-group-item"> Character ${
                      key + 1
                    }: <a target="_blank" href=${item}>${item}</a></li>`
                )
                .join("")} 
         </ul>
    </div>`;

}
//#endregion