const titleInput = document.querySelector("#title");
const authorName = document.querySelector("#author");
const isbnCode = document.querySelector("#isbn");
const submitButton = document.querySelector("#submit-book-btn");
const didReadYes = document.querySelector("#yes-read");
const didReadNo = document.querySelector("#no-read");
const bookCardsContainer = document.querySelector("#book-list");
const bookForm = document.querySelector("#book-form-container");
const yesBtn = document.querySelector("#yes-read");
const noBtn = document.querySelector("#no-read");

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

//function generate unique book id and check if the id exist if yes generate a new id
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
  //add the new book object to book list array
  bookList.push(newBook);
}
//function to generate HTML from the last object in book list array and add it to the DOM

function viewEditForm() {}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  bookIdGenerate();
  checkIfRead();
  addBookToArray();
  addBooksToDOM();
  hideBookForm();
  console.log(bookList);
});
function showBookForm() {
  bookForm.style.display = "block";
}
function hideBookForm() {
  bookForm.style.display = "none";
}
//function to delete HTML element
function removeBookHTML(e) {
  e.parentNode.remove();
}
//function to delete the corresponding object in book list array
function removeBookFromArray(id) {
  if (bookIdList.indexOf(id) != -1) {
    bookIdList.splice(bookIdList.indexOf(id), 1);
    console.log("removed: " + id);
    console.log(bookIdList);
  } else {
    console.log("this is dose not exist in array");
    s;
    console.log(bookIdList);
  }
  let index = bookList.findIndex((item) => item.bookId === id);
  if (index != -1) {
    bookList.splice(index, 1);
    console.log("removed book from book list array");
    console.log(bookList);
  } else {
    console.log("cant remove none existing book");
  }
}
function editBook(id) {
  showBookForm();
  titleInput.textContent = id.name;
  authorName.textContent = id.author;
  titleInput.textContent = id.name;
  if (id.didRead === "Yes") {
    yesBtn.checked = true;
  } else if (id.didRead === "No") {
    noBtn.checked = true;
  }
}
// ALL EDIT FUNCTIONS ARE HERE=======================================================

function returnCheckedTrueFalse() {
  let lastArrayElement = bookList[bookList.length - 1];
  let yesBtnEdit = document.querySelector(
    `#yes-read-edit${lastArrayElement.bookId}`
  );
  if (lastArrayElement.didRead === "Yes") {
    yesBtnEdit.checked = true;
  } else {
    yesBtnEdit.checked = false;
  }
}

function addBooksToDOM() {
  let lastArrayElement = bookList[bookList.length - 1];
  bookCardsContainer.insertAdjacentHTML(
    "beforeend",
    `<div id="bookCard${lastArrayElement.bookId}">
        <p>book ID: ${lastArrayElement.bookId}</p>
        <h3 id="bookName${lastArrayElement.bookId}">book name : ${lastArrayElement.name}</h3>
        <h3 id="bookAuthor${lastArrayElement.bookId}">book author: ${lastArrayElement.author}</h3>
        <h3 id="didYouRead${lastArrayElement.bookId}">did you read the book? ${lastArrayElement.didRead}</h3>
        <button onclick="removeBookFromArray('${lastArrayElement.bookId}'); removeBookHTML(this);">delete</button>
        <button onclick="editBook('${lastArrayElement.bookId}')">edit</button>
    </div>
    <hr>
    <div>
      <h2 class="edit">Book Edit ${lastArrayElement.bookId}</h2>
      <form action="" id="edit-mode-form">
        <div>
          <label for="edit-title">Title edit</label>
          <input type="text" id="edit-title-${lastArrayElement.bookId}" name="title-edit-value" value="${lastArrayElement.name}">
        </div>
        <div>
          <label for="edit-author">Author edit</label>
          <input type="text" id="edit-author" name="author-edit-value" value="${lastArrayElement.author}">
        </div>
        <div>
          <h2>did you read</h2>
          <input id="yes-read-edit${lastArrayElement.bookId}" type="radio" name="didReadEdit" value="yes" checked="" />Yes </br>
          <input id="no-read-edit" type="radio" name="didReadEdit" value="no" checked="" />No </br>
        </div>
        <button class="submit-book-btn" id="submit-book-btn" >Submit Book edit</button>
      </form>
    </div>
    <hr>
    <hr>
    <hr>
    `
  );
  returnCheckedTrueFalse();
}
