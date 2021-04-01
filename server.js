const http = require("http");
const fs = require("fs");
const express = require("express");
const PORT = 8080;

let app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  fs.readFile(`${__dirname}/public/index.html`, (err, data) => {
    if (err) throw err;
    res.status(200).end(data);
  });
});

app.get("/notes", (req, res) => {
  console.log("i am get notes");
  fs.readFile(`${__dirname}/public/notes.html`, (err, data) => {
    if (err) throw err;
    res.status(200).end(data);
  });
});

///should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  console.log("i am get api/notes");
  fs.readFile("./db/db.json", "utf8", (err, content) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    res.status(200).json(JSON.parse(content));
    //return content;
  });
});

//should receive a new note to save on the request body
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, content) => {
    if (err) throw err;
    let arrayObj = JSON.parse(content);
    //let jsonData = JSON.parse(req.body)
    console.log("req.body:" + req.body);
    arrayObj.push(req.body);
    dataTowrite = JSON.stringify(arrayObj);
    fs.writeFile("./db/db.json", dataTowrite, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  });
});

app.listen(process.env.PORT || 8080);
