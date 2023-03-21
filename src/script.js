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
const bookFormContainer = document.querySelector("#form-container");
const cancelInput = document.querySelector("#cancel-submit-book-btn");

const addBookButton = document.querySelector("#add-book-button");

let didRead = "";
let bookList = [];
let bookIdList = [];
let bookId = "";

class book {
  constructor(bookId, name, author, didRead) {
    this.bookId = bookId;
    this.name = name || "Please define book title";
    this.author = author || "Please define the book Author";
    this.didRead = didRead;
  }
}

// function deceleration to check if use read the book
function checkIfRead() {
  if (didReadYes.checked) {
    didRead = "Yes";
  } else if (didReadNo.checked) {
    didRead = "No";
  } else {
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
cancelInput.addEventListener("click", (e) => {
  e.preventDefault();
});
function showDelWindow(id) {
  let deleteContainer = document.querySelector(`#are-you-sure${id}`);
  let bookCard = document.querySelector(`#bookCard${id}`);
  bookCard.style.display = "none";
  deleteContainer.style.display = "flex";
}
function hideDelWindow(id) {
  let deleteContainer = document.querySelector(`#are-you-sure${id}`);
  let bookCard = document.querySelector(`#bookCard${id}`);
  bookCard.style.display = "flex";
  deleteContainer.style.display = "none";
}
function showBookForm() {
  bookFormContainer.style.display = "block";
  bookForm.style.display = "block";
  addBookButton.style.display = "none";
  bookCardsContainer.style.display = "none";
}
function hideBookForm() {
  bookForm.style.display = "none";
  bookFormContainer.style.display = "none";
  addBookButton.style.display = "block";
  bookCardsContainer.style.display = "flex";
  clearForm();
}
function clearForm() {
  titleInput.value = "";
  authorName.value = "";
  yesBtn.checked = false;
  noBtn.checked = false;
}

//function to delete HTML element
function removeBookHTML(e) {
  e.parentNode.parentNode.parentNode.remove();
}
//function to delete the corresponding object in book list array
function removeBookFromArray(id) {
  if (bookIdList.indexOf(id) != -1) {
    bookIdList.splice(bookIdList.indexOf(id), 1);
    console.log("removed: " + id);
    console.log(bookIdList);
  } else {
    console.log("this is dose not exist in array");
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

// ALL EDIT FUNCTIONS ARE HERE============================

function updateYesNoEditForm() {
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

function EditYesNoInArray(id) {
  let index = bookList.findIndex((item) => item.bookId === id);
  let yesBtnEdit = document.querySelector(`#yes-read-edit${id}`);
  let didReadCard = document.querySelector(`#didYouRead${id}`);
  if (yesBtnEdit.checked) {
    bookList[index].didRead = "Yes";
    didReadCard.textContent = `Yes`;
  } else {
    bookList[index].didRead = "No";
    didReadCard.textContent = `No`;
  }
}

function showEditForm(id) {
  let editForm = document.querySelector(`#editForm${id}`);
  let bookCard = document.querySelector(`#bookCard${id}`);
  bookCard.style.display = "none";
  editForm.style.display = "block";
  // bookEditButton.style.display = "none";
}
function hideEditForm(id) {
  //========================= Edit Form Selectors ========================
  let editBtn = document.querySelector(`#book-card-edit${id}`);
  let editForm = document.querySelector(`#editForm${id}`);
  let newBookName = document.querySelector(`#edit-title-${id}`).value;
  let newBookAuthor = document.querySelector(`#edit-author-${id}`).value;
  //========================= Book Card Selectors ========================
  let bookCard = document.querySelector(`#bookCard${id}`);
  let newBookNameCard = document.querySelector(`#bookName${id}`);
  let newBookAuthorCard = document.querySelector(`#bookAuthor${id}`);
  //=========== get the index of Edited Obj in book list Array by ID =====
  let index = bookList.findIndex((item) => item.bookId === id);
  //================== Display and hide Card and edit form ===============
  editForm.style.display = "none";
  bookCard.style.display = "block";
  //=========== Update the obj in book list array with new data ==========
  bookList[index].name = newBookName;
  bookList[index].author = newBookAuthor;
  //=========== update the Card with new info from the book list array====
  newBookNameCard.textContent = `${bookList[index].name}`;
  newBookAuthorCard.textContent = `${bookList[index].author}`;

  // editBtn.style.marginTop = "auto";

  EditYesNoInArray(id);

  console.log(bookList);
}

function editBook(id) {
  showEditForm(id);
}

function addBooksToDOM() {
  let lastArrayElement = bookList[bookList.length - 1];
  bookCardsContainer.insertAdjacentHTML(
    "beforeend",
    `
      <div
    class="book-Card-container"
    id="bookCardContainer${lastArrayElement.bookId}"
  >
    <div class="book-card-info" id="bookCard${lastArrayElement.bookId}">
    <div class="top-button-container">
    <button
        class="book-card-edit"
        id="book-card-edit${lastArrayElement.bookId}"
        onclick="editBook('${lastArrayElement.bookId}')"
      >
        <ion-icon name="pencil"></ion-icon>
      </button>
    <button
      class="book-card-del"
      onclick="showDelWindow('${lastArrayElement.bookId}');"
    >
      <ion-icon name="close"></ion-icon>
    </button>
    </div>
      <h3 class="book-name-container" >
        Book Title :
      </h3>
      <p class="info-paragraph-text" id="bookName${lastArrayElement.bookId}">
        ${lastArrayElement.name}
      </p>
      <hr class="book-card-hr" />
      <h3>
        Book Author:
      </h3>
      <p class="info-paragraph-text" id="bookAuthor${lastArrayElement.bookId}">
        ${lastArrayElement.author}
      </p>
      <hr class="book-card-hr" />
      <h3>Did you read the book?</h3>
      <p class="info-paragraph-text" id="didYouRead${lastArrayElement.bookId}">
         ${lastArrayElement.didRead}
      </p>
    </div>
     <div class="edit-form" id="editForm${lastArrayElement.bookId}">
      <h2 class="edit">Edit Book</h2>
      <form action="" id="edit-mode-form">
        <div>
          <label for="edit-title">Title edit</label>
          <input class="user-input" type="text" id="edit-title-${lastArrayElement.bookId}" name="title-edit-value" value="${lastArrayElement.name}">
        </div>
        <div>
          <label for="edit-author">Author edit</label>
          <input class="user-input" type="text" id="edit-author-${lastArrayElement.bookId}" name="author-edit-value" value="${lastArrayElement.author}">
        </div>
        <div>
          <h2>did you read</h2>
          <input id="yes-read-edit${lastArrayElement.bookId}" type="radio" name="didReadEdit" value="yes" checked="" />Yes </br>
          <input id="no-read-edit" type="radio" name="didReadEdit" value="no" checked="" />No </br>
        </div>
        </form>
        <button onclick="hideEditForm('${lastArrayElement.bookId}')">Submit Book edit</button>
        </div>
        <div class="are-you-sure" id="are-you-sure${lastArrayElement.bookId}">
        <h3 class="sure-message"> Are you sure to delete</h3>
        <div class="del-buttons-container">
         <button
         class="book-card-del yes-button"
        onclick="removeBookFromArray('${lastArrayElement.bookId}'); removeBookHTML(this);"
        >
         Yes
         </button>
         <button
         class="book-card-del no-button"
        onclick="hideDelWindow('${lastArrayElement.bookId}');"
        >
         No
         </button>
        </div>
        </div>

  </div>
    `
  );
  updateYesNoEditForm();
}
//  <div
//     class="book-Card-container"
//     id="bookCardContainer${lastArrayElement.bookId}"
//   >

//     <div class="book-card-info" id="bookCard${lastArrayElement.bookId}">
//     <div class="top-button-container">
//     <button
//         class="book-card-edit"
//         id="book-card-edit${lastArrayElement.bookId}"
//         onclick="editBook('${lastArrayElement.bookId}')"
//       >
//         <ion-icon name="pencil"></ion-icon>
//       </button>
//     <button
//       class="book-card-del"
//       onclick="removeBookFromArray('${lastArrayElement.bookId}'); removeBookHTML(this);"
//     >
//       <ion-icon name="close"></ion-icon>
//     </button>
//     </div>
//       <h3 class="book-name-container" >
//         Book Title :
//       </h3>
//       <p class="info-paragraph-text" id="bookName${lastArrayElement.bookId}">
//         ${lastArrayElement.name}
//       </p>
//       <hr class="book-card-hr" />
//       <h3>
//         Book Author:
//       </h3>
//       <p class="info-paragraph-text" id="bookAuthor${lastArrayElement.bookId}">
//         ${lastArrayElement.author}
//       </p>
//       <hr class="book-card-hr" />
//       <h3>Did you read the book?</h3>
//       <p id="didYouRead${lastArrayElement.bookId}">
//          ${lastArrayElement.didRead}
//       </p>

//     </div>
//      <div class="edit-form" id="editForm${lastArrayElement.bookId}">
//       <h2 class="edit">Book Edit ${lastArrayElement.bookId}</h2>
//       <form action="" id="edit-mode-form">
//         <div>
//           <label for="edit-title">Title edit</label>
//           <input type="text" id="edit-title-${lastArrayElement.bookId}" name="title-edit-value" value="${lastArrayElement.name}">
//         </div>
//         <div>
//           <label for="edit-author">Author edit</label>
//           <input type="text" id="edit-author-${lastArrayElement.bookId}" name="author-edit-value" value="${lastArrayElement.author}">
//         </div>
//         <div>
//           <h2>did you read</h2>
//           <input id="yes-read-edit${lastArrayElement.bookId}" type="radio" name="didReadEdit" value="yes" checked="" />Yes </br>
//           <input id="no-read-edit" type="radio" name="didReadEdit" value="no" checked="" />No </br>
//         </div>
//         </form>
//         <button onclick="hideEditForm('${lastArrayElement.bookId}')">Submit Book edit</button>
//         </div>
//         <div class="are-you-sure" id="are-you-sure">
//         <h3> Are you sure to delete</h3>
//         <button
//          class="book-card-del"
//         onclick="removeBookFromArray('${lastArrayElement.bookId}'); removeBookHTML(this);"
//         >
//          <ion-icon name="close"></ion-icon>
//          </button>
//         </div>
//   </div>
