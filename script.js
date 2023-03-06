const titleInput = document.querySelector("#title");
const authorName = document.querySelector("#author");
const isbnCode = document.querySelector("#isbn");
const submitButton = document.querySelector("#submit-book-btn");
const didReadYes = document.querySelector("#yes-read");
const didReadNo = document.querySelector("#no-read");
const bookCardsContainer = document.querySelector("#book-list");

let didRead = "";
let bookList = [];
let bookIdList = [];
let bookId = "";

class book {
  constructor(bookId, name, author, didRead) {
    this.bookId = bookId;
    this.name = name;
    this.author = author;
    this.didRead = didRead;
  }
}

// function deceleration to check if use read the book
function checkIfRead() {
  if (didReadYes.checked) {
    didRead = "Yes";
  } else if (didReadNo.checked) {
    didRead = "No";
  }
}

//function generate uniqe book id and check if the id exist if yes generate a new id
function bookIdGenerate() {
  let newBookId = `${Math.floor(Math.random() * 100)}-${Math.floor(
    Math.random() * 100
  )}`;
  console.log(newBookId);
  bookIdList.push(newBookId);
  console.log(bookIdList);
  for (book of bookList) {
    if (bookIdList.includes(newBookId) === false) {
      bookId = newBookId;
      console.log("new book id");
      console.log(bookIdList);
    } else if (bookIdList.includes(newBookId) === true) {
      console.log("id already exist generating new one");
      bookIdList.pop();
      bookIdGenerate();
    }
  }
}

//function to create a book object and append to book list array
function addBookToArray() {
  let newBook = new book(bookId, titleInput.value, authorName.value, didRead);
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
        <h3>book name : ${book.name}</h3>
        <h3>book author: ${book.author}</h3>
        <h3>did you read the book? ${book.didRead}</h3>
        <button>delete</button>
        <button>edit</button>
        <hr>
      </div>`
    );
  }
}
//function to delete HTML element and remove the corresponding object in booklist array
function deleteBook(bookId) {}
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  //call the function to check if use read the book
  checkIfRead();
  //create new book object and add to array bookList
  addBookToArray();
  // bookIdGenerate();
});
