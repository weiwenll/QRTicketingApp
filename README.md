
# QRPass: Seamless QR Ticketing System


This project develops a modern QR Code Ticketing System for public transit, enhancing efficiency, convenience, and security. It reduces queues, cuts costs, supports sustainability, and improves the mobile user experience, revolutionizing operational efficiency and passenger journeys.


## Prerequisites


Before you begin, ensure you have met the following requirements:

- Node.js (version 20.11.0)
- npm (version 10.4.0)

You can check your Node.js and npm versions with `node -v` and `npm -v` respectively.

## Getting Started


These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Installation


1.  **Clone the Repository**


```bash


git  clone  https://github.com/yourusername/QRTicketingApp.git

cd  QRTicketingApp

```



2.  **Install Dependencies**



This project uses npm to manage dependencies. To install all required dependencies, run the following command from the root of your project:


```bash


npm  install

```


This command installs dependencies for both the frontend and backend.


3.  **Running the Application**


Running Both Frontend and Backend


To start both the frontend and backend services concurrently from the root directory:


```bash


npm  start

```


This command uses concurrently to run both services. The frontend will be available at http://localhost:3000 and the backend at http://localhost:5000 by default.


***To run only the frontend:***


```bash


cd  packages/frontend

npm  start

```


***To run only the backend:***


```bash


cd  packages/backend

npm  run  dev

```


### Testing

TODO: to be edited later


### Building for Production

TODO: to be edited later
