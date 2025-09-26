const http = require("http");
const fs = require("fs");
const math = require("./mathModule");

console.log("\n--- Blocking vs Non-Blocking Demo ---");

try {
  const data = fs.readFileSync("feedback.txt", "utf8");
  console.log("Blocking read:", data);
} catch (err) {
  console.log("Blocking read: feedback.txt not found yet");
}

fs.readFile("feedback.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Non-blocking read: feedback.txt not found yet");
  } else {
    console.log("Non-blocking read:", data);
  }
});

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "POST" && req.url === "/feedback") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const { username, feedback } = JSON.parse(body);

        const line = `${username}: ${feedback}\n`;
        fs.appendFile("feedback.txt", line, (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Error saving feedback" }));
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Feedback saved successfully" }));
        });
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
    });
  }

  else if (req.method === "GET" && req.url === "/feedbacks") {
    fs.readFile("feedback.txt", "utf8", (err, data) => {
      if (err) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        return res.end("No feedback available yet.");
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    });
  }

  else if (req.method === "GET" && req.url === "/math") {
    const result = {
      add: math.add(10, 5),
      sub: math.sub(10, 5),
      mul: math.mul(10, 5),
      div: math.div(10, 5),
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

server.listen(5000, () => {
  console.log("Server running at http://localhost:5000/");
});