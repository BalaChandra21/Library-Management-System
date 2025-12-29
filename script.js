const API_KEY = "AIzaSyDM6-ZR8nT9eQOG58ZiXKX2OGfdeNImNmo";
let books = [];

function fetchBooks() {
    const query = document.getElementById("searchQuery").value || "programming";

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            books = [];
            data.items.slice(0, 10).forEach(item => {
                books.push({
                    id: item.id,
                    name: item.volumeInfo.title || "N/A",
                    author: item.volumeInfo.authors
                        ? item.volumeInfo.authors.join(", ")
                        : "Unknown",
                    issued: false
                });
            });
            displayBooks();
        })
        .catch(error => {
            console.error("Error fetching books:", error);
            alert("Failed to load books");
        });
}

function displayBooks() {
    const table = document.getElementById("bookList");
    table.innerHTML = "";

    books.forEach((book, index) => {
        table.innerHTML += `
            <tr>
                <td>${book.id.substring(0, 6)}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.issued ? "Issued" : "Available"}</td>
                <td>
                    <button class="${book.issued ? 'return' : 'issue'}"
                        onclick="toggleIssue(${index})">
                        ${book.issued ? "Return" : "Issue"}
                    </button>
                </td>
            </tr>
        `;
    });
}

function toggleIssue(index) {
    books[index].issued = !books[index].issued;
    displayBooks();
}
