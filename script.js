const titleInput = document.querySelector("#title");
const authorName = document.querySelector("#author");
const isbnCode = document.querySelector("#isbn");
const submitButton = document.querySelector("#submit-book-btn");
const didReadYes = document.querySelector("#yes-read");
const didReadNo = document.querySelector("#no-read");
const bookCardsContainer = document.querySelector("#bookCards");

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

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  //call the function to check if use read the book
  checkIfRead();
  //create new book object
  let newBook = new book(titleInput.value, authorName.value, didRead);
  //add the new book object to booklist array
  bookList.push(newBook);
  console.log(bookList);
});
