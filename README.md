
## Points to Remember while running the files on your system:

1. Set up MongoDB Compass and Postman on your system.

2. After setting up MongoDB Compass on your local system, create a database, and upload the dataset (json file: present in the repository).
**Note: Data Cleaning has been performed before execution of the above instructions.**

3. Now, in the backend, in the "services" folder go to "db.connection.js" file, go on line -

var inst1 = mongoose.createConnection(paste the link of your MongoDB database)

**4. Before running/executing the backend file in your ide, open terminal and write:**

npm install

nodemon app

5. Before running/executing the fontend file in your ide, open terminal and write:

'npm install'

npm start

6. During using the application, when searching for "Company Name" (under Company Details), do remember that the Company name is case sensetive as per the database used in the backend. So, write the Company Name same as given in the dataset.

## Getting started

- Recommended `node js 14.x` and `npm 6+`
- Install dependencies: `npm install` or `yarn install`
- Start the project: `npm run start` or `yarn start`
