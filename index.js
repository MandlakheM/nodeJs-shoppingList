const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs/promises");

const shoppingListFile = path.join(__dirname, "data.json");
const successHeaders = { "Content-Type": "application/json" };

async function readShoppingListFile() {
  try {
    const data = await fs.readFile(shoppingListFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
}

async function writeShoppingListFile(data) {
  try {
    await fs.writeFile(shoppingListFile, JSON.stringify(data, null, 2), "utf8");
    console.log("Shopping list updated");
  } catch (error) {
    console.error("Error writing to file:", error);
  }
}

function validateShoppingItem(item) {
  return item && item.itemName && item.category && item.quantity;
}

const server = http.createServer(async (req, res) => {
    
  if (req.url === "/" && req.method === "GET") {
    const shoppingList = await readShoppingListFile();
    res.writeHead(200, successHeaders);
    res.end(JSON.stringify(shoppingList));
  } else if (req.url === "/add" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      const newItem = JSON.parse(body);
      if (!validateShoppingItem(newItem)) {
        res.writeHead(404, successHeaders);
        res.end(JSON.stringify({ error: "Invalid item data" }));
        return;
      }

      const shoppingList = await readShoppingListFile();
      newItem.id = Date.now();
      shoppingList.push(newItem);
      await writeShoppingListFile(shoppingList);

      res.writeHead(200, successHeaders);
      res.end(JSON.stringify(newItem));
    });
  } else if (req.url.startsWith("/updating/") && req.method === "PUT") {
    const id = url.split("/")[2];
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      const updatedItem = JSON.parse(body);
      if (!validateShoppingItem(updatedItem)) {
        res.writeHead(404, successHeaders);
        res.end(JSON.stringify({ error: "Invalid item data" }));
        return;
      }

      const shoppingList = await readShoppingListFile();
      const itemIndex = shoppingList.findIndex((item) => item.id == id);

      if (itemIndex === -1) {
        res.writeHead(404, successHeaders);
        res.end(JSON.stringify({ error: "Item not found" }));
        return;
      }

      shoppingList[itemIndex] = { ...shoppingList[itemIndex], ...updatedItem };
      await writeShoppingListFile(shoppingList);

      res.writeHead(200, successHeaders);
      res.end(JSON.stringify(shoppingList[itemIndex]));
    });
  } else if (url.startsWith("/deleting/") && method === "DELETE") {
    const id = url.split("/")[2];
    const shoppingList = await readShoppingListFile();
    const updatedList = shoppingList.filter((item) => item.id != id);

    if (shoppingList.length === updatedList.length) {
      res.writeHead(404, successHeaders);
      res.end(JSON.stringify({ error: "Item not found" }));
      return;
    }

    await writeShoppingListFile(updatedList);
    res.writeHead(200, successHeaders);
    res.end(JSON.stringify({ message: "Item deleted" }));
  } else {
    res.writeHead(404, successHeaders);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
