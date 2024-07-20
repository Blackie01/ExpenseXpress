## Project Title
ExpenseXpress - An expense tracker and invoice generator

## Live Link
https://expense-xpress.vercel.app/

## Table of Contents
* Introduction
* Prerequisites
* Getting Started
1. Clone the Repository
2. Install Dependencies
3. Set Up Environment Variables
4. Run the Application
* Features
  1. Expense and Income Tracking
  2. Invoice Generation
* Running Tests
* License

## Introduction
This application is an expense tracker and invoice generation tool that allows users to input their expenses and income, categorize them, and generate invoices when needed. It is built using Next.js (TypeScript), Tailwind CSS, and Redux.

## Prerequisites
Before you begin, ensure you have met the following requirements:

* Node.js (version 20.0.0)
* npm (version 9.6.4)
* Git (version 2.39.3)
* TypeScript (version 5.5.3)
* Redux Toolkit (version 2.2.6)
* React (version 18.3.1)
* React-dom (version 18.3.1)
* React-redux (version 19.1.2)
* Next.js (version 14.2.5)

## Getting Started
Follow these instructions to set up and run the application locally.

## 1. Clone the Repository
Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/Blackie01/ExpenseXpress.git
```

## 2. Navigate to the project directory:

```bash
cd expensexpress
```

### 3. Install Dependencies
Install the required dependencies using npm:

```bash
npm install
```

## 4. Set Up Environment Variables
Create a .env.local file in the root directory of the project and add the necessary environment variables. Below is an example of the variables you might need:

## (note, this is an example)
```bash
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000/api
```

## 5. Run the Application
Start the development server with the following command:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000 to see the application in action.

## Feature
There are two major features of the application
## 1. Expense and Income tracking
This allows users to make entries of their day-to-day expenses and automatically calculates where the bulk of their money goes, as well as their balance
## 2. Invoice generator
This allows users to create invoices they can download as pdf. 

## Running tests
The test suite is written in Jest. 
To run the tests, first set up Jest locally: 
```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

then, cd to the project folder, and run 
```bash
npm run test
```

## License
This project is licensed under the MIT License. 
