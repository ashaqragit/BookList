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
  let newBookId = `${Math.floor(Math.random() * 100)}b${Math.floor(
    Math.random() * 100
  )}`;
  if (bookIdList.includes(newBookId) === false) {
    bookId = newBookId;
    bookIdList.push(newBookId);
    console.log("new book id: " + newBookId);
    console.log(bookIdList);
  } else if (bookIdList.includes(newBookId) === true) {
    console.log(newBookId + "id already exist generating new one");
    bookIdList.pop();
    bookIdGenerate();
  }
}

//function to create a book object and append to book list array
function addBookToArray() {
  let newBook = new book(bookId, titleInput.value, authorName.value, didRead);
  //add the new book object to book listarray
  bookList.push(newBook);
}
//function to generate HTML from the last object in booklist array and add it to the DOM
function addBooksToDOM() {
  let lastArrayElement = bookList[bookList.length - 1];
  bookCardsContainer.insertAdjacentHTML(
    "beforeend",
    `<div>
        <p>book ID: ${lastArrayElement.bookId}</p>
        <h3>book name : ${lastArrayElement.name}</h3>
        <h3>book author: ${lastArrayElement.author}</h3>
        <h3>did you read the book? ${lastArrayElement.didRead}</h3>
        <button onclick="hey('${lastArrayElement.bookId}');">delete</button>
        <button>edit</button>
        <hr>
      </div>`
  );
}
//onclick="removerow(this);
//function to delete HTML element and remove the corresponding object in booklist array
function deleteBook(bookId) {}
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  bookIdGenerate();
  checkIfRead();
  addBookToArray();
  addBooksToDOM();
  console.log(bookList);
});
// function removerow(e) {
//   e.parentNode.remove();
// }
function hey(id) {
  console.log("hey");
  console.log(typeof id);
  console.log(id);
  console.log(bookIdList.indexOf(id));
  bookIdList.splice(bookIdList.indexOf(id), 1);
  console.log(bookIdList);
}
