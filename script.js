const titleInput = document.querySelector("#title");
const authorName = document.querySelector("#author");
const isbnCode = document.querySelector("#isbn");
const submitButton = document.querySelector("#submit-book-btn");
const didReadYes = document.querySelector("#yes-read");
const didReadNo = document.querySelector("#no-read");
const bookCardsContainer = document.querySelector("#book-list");

let didRead = false;

let bookList = [];

class book {
  constructor(name, author, didRead) {
    this.name = name;
    this.author = author;
    this.read = didRead;
  }
}

// function deceleration to check if use read the book
function checkIfRead() {
  if (didReadYes.checked) {
    didRead = true;
  } else if (didReadNo.checked) {
    didRead = false;
  }
}

//function to create a book object and append to book list array
function addBookToArray() {
  let newBook = new book(titleInput.value, authorName.value, didRead);
  //add the new book object to book listarray
  bookList.push(newBook);
  // console.log(bookList);
}
//function loop thru booklist and generate HTML and add it to the DOM
function addBooksToDOM() {
  for (book of bookList) {
    bookCardsContainer.insertAdjacentHTML(
      "beforeend",
      `<div>
        <h3>book name : the hobbit</h3>
        <h3>book author: Tolkin</h3>
        <h3>did you read the book? Yes</h3>
        <button>delete</button>
        <button>edit</button>
        <hr>
      </div>`
    );
  }
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  //call the function to check if use read the book
  checkIfRead();
  //create new book object and add to array bookList
  addBookToArray();
});
