const http = require("node:http");

const server = http.createServer((req, res) => {

  const successHeaders = { "Content-Type": "text/plain" };

  if (req.method === "GET") {
    switch (req.url) {
      case "/":
        res.writeHead(200, successHeaders);
        return res.end("current shopping items");
      case "/add":
        res.writeHead(200, successHeaders);
        return res.end("add shopping item");
      default:
        res.writeHead(404, successHeaders);
        return res.end("Error 404: Page not found");
    }
  }

});

server.listen(5000, () => {
  console.log("server running on port 5000");
});
