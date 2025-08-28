# E-commerce Product Listing Page

This project is a responsive e-commerce product listing page built with Next.js. It features client-side search and filtering, a detailed product view modal, and an optional shopping cart. All product data is fetched from the Fake Store API.

## 🚀 Key Features

* **Product Display**: Products are shown in a responsive grid with images, names, prices, and descriptions. Data is fetched using **React Query** for efficient caching and state management.
* **Search & Filter**: Users can filter products by name using a client-side search and by category using filter buttons. The state for these features is managed globally with **Zustand**.
* **Product Details Modal**: Clicking on a product card opens a responsive modal that displays full product details, including a close button.
* **Mock "Add Product" Form**: A form is included to simulate adding a new product. It uses **React Hook Form** for handling and **Zod** for schema validation. Data is logged to the console instead of being sent to a backend.
* **Shopping Cart**: A floating cart icon shows the number of items added. Cart data is also managed by **Zustand**.

---

## 🛠️ Tech Stack

* **React Framework**: Next.js
* **Styling**: Tailwind CSS
* **Data Fetching**: React Query
* **State Management**: Zustand
* **Form Handling**: React Hook Form
* **Form Validation**: Zod

---

## 📦 API Endpoints

This project uses the Fake Store API.

* **All Products**: `https://fakestoreapi.com/products`
* **All Categories**: `https://fakestoreapi.com/products/categories`
* **Product by ID**: `https://fakestoreapi.com/products/{id}`

---

## 💻 Getting Started

### Prerequisites
* Node.js (v18.0 or later)
* npm

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/anjaliydv304/ecommerce.git](https://github.com/yanjaliydv304/ecommerce.git)
    cd my-ecommerce-app
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:3000`.

## 🌐 Live Demo

You can view a live, hosted version of this project here: https://ecommerce-beige-seven.vercel.app/
