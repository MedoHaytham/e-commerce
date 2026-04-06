# React E-Commerce Application

A fully-featured, responsive e-commerce web application built with **React**, **Redux Toolkit**, and **React Router**. This project provides a complete shopping experience, from browsing products and adding them to the cart or favorites, to user authentication, profile management, and a seamless checkout process.

## 🚀 Features

- **User Authentication:** Registration, Login, and secure session management using cookies.
- **Product Catalog:** Browse products by category, view detailed product pages, and search for specific items.
- **Shopping Cart & Checkout:** Add products to the cart, manage quantities, and proceed through a complete checkout flow.
- **Favorites / Wishlist:** Save items to a favorites list for future purchases.
- **User Profile Management:** Manage account details, secure settings (passwords), addresses, payment methods, and view order history.
- **State Management & Data Fetching:** Efficient global state management using **Redux Toolkit** and optimized data fetching with **RTK Query** & **Axios**.
- **Smooth Animations:** Page transitions and UI micro-interactions powered by **Framer Motion**.
- **Responsive Design:** Designed with a mobile-first approach for styling, utilizing **Bootstrap** and custom CSS.
- **Notifications & Validations:** Real-time feedback messages with **React Toastify / Hot Toast** and robust client-side form validation with **Joi**.

## 🛠️ Technology Stack

- **Frontend Framework:** React 19
- **State Management:** Redux Toolkit (Slices + RTK Query)
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Carousel / Sliders:** Swiper
- **Styling:** Vanilla CSS & Bootstrap 5
- **Icons:** FontAwesome, Lucide React, and React Icons
- **Notifications:** React Toastify & React Hot Toast

## 📂 Project Structure

```text
src/
├── app/             # Redux store configuration
├── components/      # Reusable UI components (Loading, Sliders, Layout elements)
├── features/        # Redux slices (Cart, Favorites, User, etc.)
├── imgs/            # Static image assets
├── layout/          # Global layout wrappers (e.g., Header, Footer)
├── pages/           # Application pages/routes (Home, Product, Cart, Profile, etc.)
├── App.jsx          # Main application component & routing setup
└── index.jsx        # React DOM entry point
```

## ⚙️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd e-commerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The app will run in development mode.
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build and Deployment

To build the app for production:
```bash
npm run build
```
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The project is pre-configured to be easily deployed to **GitHub Pages** using `npm run deploy`.

## 🔗 Backend API

This project connects to a custom backend API for data storage and processes. The base URL configured for the data fetching is:
`https://e-commerce-backend-geri.onrender.com/api/`

---
*Created with ❤️ by Mohamed Haytham.*
