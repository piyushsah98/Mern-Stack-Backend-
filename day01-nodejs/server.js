let http = require("http");

let server = http.createServer((req, res) => {
  console.log("Hello mai server hu tumne apne local machine pe banaya hai");
  res.end("okay maine tumhari baat sun li hai");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
