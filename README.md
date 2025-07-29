# CoreBanking React Frontend
This is a simple and user-friendly **React-based frontend** application for the **CoreBanking system**, designed to interact with secured Spring Boot REST APIs.
## Features
- Create new customers
- Inquire customer details by ID
- JWT-based secure API communication
- Clean and responsive UI using inline styles
- Input validation:
  - ✅ Customer name: Only alphabets allowed
  - ✅ Customer ID: Only numeric values allowed
## Tech Stack
| Technology    | Purpose                      |
|---------------|-------------------------------|
| React JS      | Frontend framework            |
| Axios         | HTTP client for API requests  |
| JavaScript    | Application logic (ES6+)      |
| Spring Boot   | Backend REST APIs (separate)  |

## Folder Structure
corebanking-frontend/
├── src/
│   └── CustomerApp.js      # Main UI component
│   └── App.js              # Root component
├── public/
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation

        ## How to Run the Application
### 1. Clone the repository
git clone https://github.com/KiranBakkamunthala/corebanking-frontend.git
cd corebanking-frontend
### 2. Install dependencies
npm install
### 3. Start the development server
npm start
Visit ->  http://localhost:3000
Token Configuration (JWT)
This app uses JWT to access secure backend endpoints.

### Steps:
1. Open the file:  
   src/CustomerApp.js 
2. Locate this line: 
  const JWT_TOKEN = 'your-jwt-token-here'; // Get this from Spring Boot backend after login   
3. Replace `'your-jwt-token-here'` with your valid JWT token, which can be obtained via the backend login endpoint (e.g., `/auth/login` using Postman).

## API Endpoints (Spring Boot)
### Create Customer
POST /customers/create
#### Sample Request Body:
{
  "name": "Vandana"
}
### Get Customer by ID
GET /customers/{id}
Replace `{id}` with the actual customer ID (e.g., `1`, `101`, etc.)

## ✅ Summary
- Easy-to-use UI for core customer operations
- Fully integrated with JWT-secured backend
- Clean folder structure and minimal dependencies
- Ideal for small banking apps, demos, or POCs
