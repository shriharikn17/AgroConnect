# AgroConnect 

AgroConnect is a comprehensive e-commerce platform designed for agricultural products. It connects farmers and customers, providing a seamless shopping experience for seeds, fertilizers, pesticides, and tools, along with a robust admin dashboard for management.

## Features

### Customer Features
-   **Product Catalog**: Browse a wide range of agricultural products with filtering by category.
-   **Search**: Quickly find products by name or brand.
-   **Cart Management**: Add items to cart, adjust quantities, and view total cost.
-   **Secure Checkout**: Place orders securely (simulated payment flow).
-   **Order History**: View past orders and their status.
-   **User Authentication**: Secure login and registration for customers.

### Admin Dashboard
-   **Dashboard Overview**: Quick access to key metrics.
-   **Product Management**: Add, edit, and delete products. Manage stock levels and pricing.
-   **Order Management**: View all customer orders, update statuses, and track sales.
-   **Stock Control**: Automatic stock decrement upon order placement.
-   **Secure Access**: Role-based authentication ensuring only admins access the dashboard.

## Tech Stack

-   **Frontend**: [Next.js 15](https://nextjs.org/) (React), CSS Modules
-   **Backend**: Node.js, Express.js
-   **Database**: PostgreSQL (via NeonDB/Supabase)
-   **ORM**: Prisma
-   **Authentication**: JWT (JSON Web Tokens)

##  Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/shriharikn17/AgroConnect.git
    cd AgroConnect
    ```

2.  **Install Dependencies**
    ```bash
    # Frontend
    cd frontend
    npm install

    # Backend
    cd ../backend
    npm install
    ```

3.  **Environment Setup**
    -   Create `.env` in `backend/` with:
        ```env
        DATABASE_URL="postgresql://user:password@host:port/db"
        JWT_SECRET="your_secret_key"
        PORT=4004
        ```
    -   Create `.env.local` in `frontend/` with:
        ```env
        NEXT_PUBLIC_API_URL="http://127.0.0.1:4004"
        ```

4.  **Run the Application**
    ```bash
    # Terminal 1: Backend
    cd backend
    npx prisma migrate dev
    npm start

    # Terminal 2: Frontend
    cd frontend
    npm run dev
    ```

## API Overview

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user (Customer/Admin) |
| `POST` | `/api/auth/login` | Login and receive JWT token |

### Products
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Get all products (supports `?limit=N`) |
| `GET` | `/api/products/:id` | Get single product details |
| `POST` | `/api/products` | Create a new product (Admin only) |
| `PUT` | `/api/products/:id` | Update a product (Admin only) |
| `DELETE` | `/api/products/:id` | Delete a product (Admin only) |

### Orders
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/orders` | Place a new order (Updates stock) |
| `GET` | `/api/orders/user` | Get logged-in user's orders |
| `GET` | `/api/orders/all` | Get ALL orders (Admin only) |
| `GET` | `/api/orders/:id` | Get specific order details |

### Categories
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/categories` | Get all product categories |

---


