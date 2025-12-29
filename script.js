let books = [];

function addBook() {
    const id = document.getElementById("bookId").value;
    const name = document.getElementById("bookName").value;
    const author = document.getElementById("author").value;

    if (!id || !name || !author) {
        alert("Please fill all fields");
        return;
    }

    books.push({
        id,
        name,
        author,
        issued: false
    });

    displayBooks();
    clearInputs();
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

function clearInputs() {
    document.getElementById("bookId").value = "";
    document.getElementById("bookName").value = "";
    document.getElementById("author").value = "";
}
