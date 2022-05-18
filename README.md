# About

This repository contains the backend application code with the application name "Kopsyuk". This application is a backend application that is used to develop and manage a website-based Kopskuy application

# Installation

1. Clone this repository
```
git clone https://github.com/zalfanuramalia/kopsyuk-backend.git
```

2. Install module
```
npm i
```

3. import Database kopsyuk.sql
4. for run the project, write `nmp run dev` in terminal

# Rentskuy

Contains an Application Programming Interface (API) using Visual Studio Code applications, Node.js as a platform, and express.js as a framework from Node.js, as well as Postman as a container for testing the API that has been created.

# Built with

* Node.js
* Express.js
* Postman

# Endpoint

1. Vehicles Endpoint

| Method          | Endpoint      |           Remarks              |
| --------------- | ------------- | ------------------------------ |
| `Post`          | /vehicles     | Used for add new vehicle.      |
| `Get`           | /vehicles     | Used for get all vehicles.     |
| `Get`           | /vehicles/:id | Used for detail vehicle by id. |
| `Patch`         | /vehicles/:id | Used for set vehicles by id.   |
| `Delete`        | /vehicles/:id | Used for delete vehicle.       |
