class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // Create TR Element
        const row = document.createElement('tr');
        // Insert Columns
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="" class="delete">X</td>`

        list.appendChild(row);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


class LS {
    static addBookToLS() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = LS.addBookToLS();

        books.forEach(function (book) {
            const ui = new UI;
            ui.addBookToList(book)
        })
    }

    static addBook(book) {
        const books = LS.addBookToLS();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = LS.addBookToLS();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', LS.displayBooks);

document.getElementById('book-form').addEventListener('submit', function (e) {

    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        alert('Please fill all fields')
    } else {
        ui.addBookToList(book);
        LS.addBook(book);

        ui.clearFields();
    }

    e.preventDefault();
})

// Event Listeners For Delete
document.getElementById('book-list').addEventListener('click', function (e) {

    const ui = new UI();

    ui.deleteBook(e.target);

    LS.removeBook(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault();
})