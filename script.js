const titleInput = document.querySelector("#title");
const authorName = document.querySelector("#author");
const isbnCode = document.querySelector("#isbn");
const submitButton = document.querySelector("#submit-book-btn");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("default prevented");
});
