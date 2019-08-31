# Ticket-System

This is Login/Authentication Ticket System is created using the MERN Stack (MongoDB, Express, React, Node). Once the user creates account all the information they entered will be stored onto the database with the password being encrypted. After the account is created the user can go ahead and login. Once a successful login the user will be directed to the home page. Where it will display the current user who is logged in credential. Also, if the user is already logged in and either revisits the website or refreshes the page the user will not be logged out until they click logout. Once, the user is logged in they can create tickets which is essentially adding a customer to the database. After, the ticket(customers) information is entered the system will generate a unique QR code for each ticket created. The user will give the customer a copy of the QR code until the time of the event. Once, the event is happening the user will just need to scan the QR code and click validate on the ticket. A single ticket can only be validated once to prevent multiple poeple from using the same ticket. Also, for all users can see a list of all tickets created and if they've been validated or not.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Create a mongoDB database either on your localmachine or [mLab](https://mlab.com). Once a database has been created add the URL for the database in keys.js under config. 

### Installing

Install all dependencies.

Server side dependencies install
```npm install```

Client side dependencies install without going into the client directory
```npm run client-install```

or if inside client directory
```npm install```

## Running The Project

To run both client and server
```npm run dev```

To run just the server
```npm run start```

To run just the client 
```npm run client```

or if inside client directory 
```npm run start```

## Built With

* [MERN](http://mern.io) - MERN Stack used

or

* [MongoDB](https://www.mongodb.com/?_ga=2.85394073.1604506877.1533626154-2112836541.1533626154)
* [Express](https://expressjs.com)
* [React](https://reactjs.org)
* [Node.js](https://nodejs.org/en/)

## Authors

* **Hrag Ayvazian** - *Ticket-System* - [HragA](https://github.com/HragA)

## License

This project is licensed under the MIT License.
