# BillWise

BillWise is a web application for managing inventory and billing for a wholesale distribution business.

## Features

*   **Inventory Management:** Add, view, update, and delete products from the inventory.
*   **Product Filtering and Search:** Easily find products by code or name.
*   **Data Export:** Download the product list as a CSV file.
*   **Dashboard:** An overview of the business performance.

## Tech Stack

**Client:**
*   React
*   Vite
*   React Router
*   Tailwind CSS
*   Lucide React

**Server:**
*   Node.js
*   Express.js
*   MySQL
*   Winston (for logging)
*   JSON2CSV (for CSV export)

## Getting Started

### Prerequisites

*   Node.js (v14 or later)
*   MySQL

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/BillWise.git
    cd BillWise
    ```

2.  **Install server dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install client dependencies:**
    ```bash
    cd ../client
    npm install
    ```

### Configuration

1.  **Create a `.env` file in the `server` directory** and add the following environment variables:
    ```
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    DB_PORT=your_database_port
    PORT=your_server_port
    CONNECTIONLIMIT=10
    QUEUELIMIT=0
    ```

2.  **Create the `products` table in your MySQL database:**
    ```sql
    CREATE TABLE products (
        product_code VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        per_unit_price DECIMAL(10, 2),
        tax_rate DECIMAL(5, 2),
        category_id VARCHAR(255),
        brand_id VARCHAR(255),
        unit_of_measure VARCHAR(255),
        tax_code_id VARCHAR(255),
        stock_quantity INT
    );
    ```

### Running the Application

1.  **Start the server:**
    ```bash
    cd server
    npm start
    ```

2.  **Start the client:**
    ```bash
    cd ../client
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

## API Endpoints

The server exposes the following API endpoints:

*   `POST /product/new`: Add a new product.
*   `GET /product/search`: Search for products.
*   `GET /product/select/:product_code`: Get a single product by its code.
*   `POST /product/update`: Update a product.
*   `GET /product/display`: Get a list of all products.
*   `GET /product/filter`: Filter products based on query parameters.
*   `GET /product/download`: Download a CSV file of products.
*   `GET /product`: Get a list of all product codes.
