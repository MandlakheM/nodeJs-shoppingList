const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

const shoppingListFile = path.join(__dirname, "data.json");

function readShoppingListFile() {
  fs.readFile(shoppingListFile, "utf8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const shoppingListData = data;
      return JSON.parse(shoppingListData);
    }
  });
  //   console.log(data);
}

function writeShoppingListFile(data) {
  fs.writeFileSync(shoppingListFile, JSON.stringify(data, null, 2), {flag: "a"}, "utf8", ()=>{
    if(error){
        console.log(error)
    } else {
        console.log("new shopping item added")
    }
  });
}

// console.log(readShoppingListFile);

// const server = http.createServer((req, res) => {
//   const successHeaders = { "Content-Type": "text/plain" };

//   if (req.method === "GET") {
//     switch (req.url) {
//       case "/":
//         res.writeHead(200, successHeaders);
//         return res.end("current shopping items");
//       case "/add":
//         res.writeHead(200, successHeaders);
//         return res.end("add shopping item");
//       default:
//         res.writeHead(404, successHeaders);
//         return res.end("Error 404: Page not found");
//     }
//   }
// });

// server.listen(5000, () => {
//   console.log("server running on port 5000");
// });
