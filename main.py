from library import Library

def main():
    library = Library()

    while True:
        print("\n==== Library Management System ====")
        print("1. Add Book")
        print("2. Display Books")
        print("3. Search Book")
        print("4. Issue Book")
        print("5. Return Book")
        print("6. Exit")

        choice = input("Enter choice: ")

        if choice == "1":
            bid = input("Book ID: ")
            name = input("Book Name: ")
            author = input("Author: ")
            print(library.add_book(bid, name, author))

        elif choice == "2":
            books = library.display_books()
            if not books:
                print("No books available.")
            else:
                for bid, b in books.items():
                    status = "Issued" if b["issued"] else "Available"
                    print(f"{bid} | {b['name']} | {b['author']} | {status}")

        elif choice == "3":
            name = input("Enter book name: ")
            book = library.search_book(name)
            print(book if book else "Book not found")

        elif choice == "4":
            bid = input("Enter book ID: ")
            print(library.issue_book(bid))

        elif choice == "5":
            bid = input("Enter book ID: ")
            print(library.return_book(bid))

        elif choice == "6":
            print("Exiting...")
            break

        else:
            print("Invalid choice!")

if __name__ == "__main__":
    main()
