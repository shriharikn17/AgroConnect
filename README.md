Sree Maruti Agro Kendra currently operates as a physical retail shop, which limits its customer 
reach and makes inventory and sales management a manual process. This project aims to 
create a dedicated e-commerce platform to bring the business online. The platform will solve 
these issues by enabling online sales, automating inventory management, and expanding the 
customer base beyond the immediate locality. A key feature will be offering location-specific 
product availability and pricing, catering to the logistical and regional constraints of selling 
agricultural products. 
 
3. System Architecture 
The application will follow a classic client-server architecture. The frontend, built with Next.js, will 
communicate with a backend API, which in turn interacts with the MySQL database. 
Frontend (Client) → Backend (REST API) → Database (MySQL) 
●  Frontend: Next.js with JavaScript and CSS for a dynamic, server-rendered user 
experience. 
●  Backend: Node.js with the Express.js framework to build a robust REST API. 
●  Database: MySQL (Relational) for structured data storage of users, products, and 
orders. 
●  Authentication: JSON Web Token (JWT) will be used to secure the API and manage 
user sessions. 
●  Hosting: 
○  Frontend → Vercel (Optimized for Next.js) 
○  Backend → Render / Railway 
○  Database → Railway / PlanetScale / Aiven 
 
4. Key Features 
Category  Features 
Authentication & 
Authorization 
User registration, login, and logout. Role-based access control to 
distinguish between Customers and Admin (shop owner). 
CRUD Operations  Admin will have full Create, Read, Update, and Delete capabilities for 
products, categories, and inventory. Users can manage their profiles 
and view orders. 
Frontend Routing  Multi-page navigation including: Home, Products, Product Details, 
Cart, Checkout, User Profile (with order history), Admin Dashboard, 
Login, and Signup pages. 
Location-Based 
Services 
The system will prompt users for their location (e.g., pincode or 
district). Based on this, it will display available products and show 
region-specific pricing. 
Product Discovery  Users can easily find products using advanced filtering (by category, 
brand), searching (by name), and sorting (by price, name). 
Admin Dashboard  A secure area for the shop owner to manage inventory, view sales 
data, process orders, and update product information with 
pagination for easy management. 
Hosting  Both the frontend and backend will be deployed to live, publicly 
accessible URLs for a complete production-ready application. 
 
5. Tech Stack 
Layer  Technologies 
Frontend  Next.js, React.js, CSS (in separate .css files), Fetch API / 
Axios 
Backend  Node.js, Express.js 
Database  MySQL, Sequelize (ORM for easier database interaction) 
Authentication  JSON Web Tokens (JWT), bcrypt.js (for password hashing) 
Hosting  Vercel (Frontend), Render / Railway (Backend & Database) 
 
 
6. API Overview 
Here is a sample list of REST API endpoints that will be implemented. 
Endpoint  Metho
d 
Description  Access 
/api/auth/regis
ter 
POST  Registers a new customer.  Public 
/api/auth/login  POST  Authenticates a user and returns a JWT.  Public 
/api/products  GET  Fetches all products. Supports query 
params for location, search, sort, filter, and 
page. 
Public 
/api/products/:
id 
GET  Fetches details for a single product.  Public 
/api/products  POST  Creates a new product.  Admin only 
/api/products/:
id 
PUT  Updates an existing product's details.  Admin only 
/api/products/:
id 
DELET
E 
Deletes a product from the database.  Admin only 
/api/orders  POST  Allows an authenticated user to place a 
new order. 
Authenticated 
User 
/api/orders/use
r 
GET  Fetches the order history for the logged-in 
user. 
Authenticated 
User 
/api/orders/all  GET  Fetches all customer orders for the admin.  Admin only