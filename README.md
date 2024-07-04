
# Traffic Management System

## Project Overview

This Traffic Management System is designed to enhance city traffic control and monitoring by allowing traffic authorities to verify traffic violations and control traffic light settings through an interactive web interface. The system integrates real-time data processing with a user-friendly front-end that supports immediate responses to changing traffic conditions.

## Features

- **User Authentication**: Secure login system for traffic authorities.
- **Verify Traffic Violations**: Authorities can review and verify potential traffic violations reported by automated systems.
- **Control Traffic Lights**: Adjust traffic light timers based on real-time traffic data to optimize flow and reduce congestion.
- **Responsive Web Design**: Accessible via various devices, ensuring mobility and flexibility in monitoring and control.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd my-web-application
Install Dependencies

bash

npm install
Start the Server

bash

npm start
Open Your Browser
Navigate to http://localhost:3000 to view the application.

API Documentation

Login
Endpoint: /login
Method: POST
Description: Authenticates users.
Request Body:
json

{
  "username": "user1",
  "password": "password123"
}
Response Body:
json

{
  "message": "Login successful"
}
Status Codes:
200 OK: Authentication successful.
401 Unauthorized: Invalid username or password.
500 Internal Server Error: Server error.
Verify Traffic Violations
Endpoint: /violations/verify/{id}
Method: POST
Description: Marks a traffic violation as verified.
Path Parameters:
id: ID of the violation to verify.
Response Body:
json

{
  "message": "Violation verified successfully"
}
Status Codes:
200 OK: Successfully verified.
404 Not Found: Violation ID not found.
500 Internal Server Error: Server error.
Dismiss Traffic Violations
Endpoint: /violations/dismiss/{id}
Method: DELETE
Description: Removes a traffic violation from the system.
Path Parameters:
id: ID of the violation to dismiss.
Response Body:
json

{
  "message": "Violation dismissed successfully"
}
Status Codes:
200 OK: Successfully dismissed.
404 Not Found: Violation ID not found.
500 Internal Server Error: Server error.
