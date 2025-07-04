# 📚 Minimal Library Management System

A clean and functional full-stack library management application built with **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and **MongoDB (Express.js backend)**. It allows users to manage books and borrowing activities without authentication or payment integration.

---

## 🚀 Features

### 🔓 Public Routes
- No login/authentication required.
- All pages are accessible publicly.

### 🛠️ Book Management

#### 📋 Book List Table
- Displays all books in a table format.
- Columns: Title, Author, Genre, ISBN, Copies, Availability, and Actions.

#### ⚙️ Actions
- **Edit Book:** Opens a form pre-filled with book data and updates via API.
- **Delete Book:** Confirmation before deletion.
- **Borrow Book:** Opens a form to borrow copies of the book.

#### ➕ Add New Book
- Form to add new book details: title, author, genre, ISBN, description, copies, availability.
- Redirects to book list after successful creation.

### 📥 Borrow Book
- Fields: Quantity (number), Due Date (date).
- Validation:
  - Quantity can't exceed available copies.
  - When copies reach 0, book is marked unavailable.
- Redirects to summary after borrow.

### 📊 Borrow Summary
- Aggregated summary of all borrowed books.
- Displays:
  - Book Title
  - ISBN
  - Total Quantity Borrowed

---

## 🧩 Page Routes

| Route              | Description                                 |
|-------------------|---------------------------------------------|
| `/books`          | List all books with actions (edit/delete)   |
| `/create-book`    | Add a new book                              |
| `/books/:id`      | Detailed view of a book                     |
| `/edit-book/:id`  | Edit book details                           |
| `/borrow/:bookId` | Borrow form for a selected book             |
| `/borrow-summary` | View total borrowed quantity per book       |

---

## 🧑‍🎨 UI/UX

- 🔹 **Minimalist Design** with Tailwind CSS.
- 🔹 **Responsive Layout** for mobile, tablet, and desktop.
- 🔹 **Clear Navigation** and clean forms.
- 🔹 **Toast Notifications** for feedback (bonus).

---

## 🧱 Tech Stack

| Layer          | Technology                    |
|----------------|-------------------------------|
| Frontend       | React + TypeScript            |
| State Mgmt     | Redux Toolkit + RTK Query     |
| Styling        | Tailwind CSS                  |
| Backend        | Node.js + Express.js          |
| Database       | MongoDB + Mongoose            |

---

## 📦 Backend Structure (MVC)

### 📁 Models
- **Books**
  - `title`, `author`, `genre`, `isbn`, `description`, `copies`, `available`
- **Borrows**
  - Linked to book: `bookId`, `quantity`, `dueDate`

### 📚 Book APIs
- `GET /books` – Get all books (supports pagination)
- `POST /books` – Create a new book
- `GET /books/:id` – Get a single book
- `PUT /books/:id` – Update book details
- `DELETE /books/:id` – Delete a book

### 📥 Borrow APIs
- `POST /borrow` – Borrow a book (with quantity & dueDate)
- `GET /borrow-summary` – Get aggregated borrow data


## 🛠 Installation & Running

### 🔧 Prerequisites

- Node.js
- MongoDB

### 📂 Backend Setup

```bash
cd server
npm install
npm run dev
