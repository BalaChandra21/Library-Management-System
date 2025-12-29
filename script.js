const API_KEY = "AIzaSyDM6-ZR8nT9eQOG58ZiXKX2OGfdeNImNmo";
let books = [];

function fetchBooks() {
    const query = document.getElementById("searchQuery").value || "programming";

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            books = [];
            data.items.slice(0, 10).forEach(item => {
                books.push({
                    id: item.id.substring(0, 6),
                    name: item.volumeInfo.title || "N/A",
                    author: item.volumeInfo.authors
                        ? item.volumeInfo.authors.join(", ")
                        : "Unknown",
                    issued: false,
                    issueDate: "-",
                    returnDate: "-"
                });
            });
            displayBooks();
        })
        .catch(() => alert("Error loading books"));
}

function displayBooks() {
    const table = document.getElementById("bookList");
    table.innerHTML = "";

    books.forEach((book, index) => {
        table.innerHTML += `
            <tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.issued ? "Issued" : "Available"}</td>
                <td>${book.issueDate}</td>
                <td>${book.returnDate}</td>
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
    const today = new Date().toLocaleDateString();

    if (!books[index].issued) {
        // Issue book
        books[index].issued = true;
        books[index].issueDate = today;
        books[index].returnDate = "-";
    } else {
        // Return book
        books[index].issued = false;
        books[index].returnDate = today;
    }

    displayBooks();
}
