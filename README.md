
## Node.js File Manager and Shopping List API
This project is a basic File Manager and REST API built with Node.js. It allows users to manage a shopping list through HTTP endpoints using CRUD operations. The shopping list data is stored in a JSON file on the server.

## Features
File Manager:

Create and manage a JSON file to store shopping list data.
Asynchronously read and write to the JSON file.
Shopping List REST API:

Perform CRUD operations (Create, Read, Update, Delete) on shopping list items.

Handle JSON data exchange via HTTP requests.

Technologies Used

Node.js

HTTP Module

File System (fs) Module

JSON for Data Storage

```bash

# Clone the repository

git clone https://github.com/MandlakheM/nodeJs-shoppingList.git

# Navigate to the project directory

cd projectname

# Install dependencies

npm install

# node index.js
```

## Endpoints

1. Post method:
```
    http://localhost:5000/add
```

   Request body:
```
  {
    "itemName": "kota",
    "category": "others",
    "quantity": "2"
  }
```

  This will add an item to the shopping list

2. Get method: 
```
http://localhost:5000/
```
  This will get all the items in the shopping list

3. Put method:
```
http://localhost:5000/updating/:id
```
This will edit the item of the given id

4. Delete method:
  ```
http://localhost:5000//deletinging/:id
```
This will delete the item of the given id
