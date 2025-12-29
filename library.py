class Library:
    def __init__(self):
        self.books = {}

    def add_book(self, book_id, book_name, author):
        if book_id in self.books:
            return "Book ID already exists!"
        self.books[book_id] = {
            "name": book_name,
            "author": author,
            "issued": False
        }
        return "Book added successfully!"

    def display_books(self):
        return self.books

    def search_book(self, book_name):
        for book in self.books.values():
            if book["name"].lower() == book_name.lower():
                return book
        return None

    def issue_book(self, book_id):
        if book_id in self.books and not self.books[book_id]["issued"]:
            self.books[book_id]["issued"] = True
            return "Book issued successfully!"
        return "Book cannot be issued!"

    def return_book(self, book_id):
        if book_id in self.books and self.books[book_id]["issued"]:
            self.books[book_id]["issued"] = False
            return "Book returned successfully!"
        return "Book cannot be returned!"
