const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
// const cruddata= require("../backend/Router/crud")
const cruddata= require("./Router/crud")
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
// app.use(express.json());
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use(bodyParser.json({ limit: '10mb' })); // increase limit as needed
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// If using express.json() (Express v4.16+)
app.use(express.json({ limit: "50mb" }));
app.use('/',cruddata)


const port = process.env.PORT || 8082;

// app.listen(port, () => {
//   console.log(`Connected to backend on port ${port}`);
// });

app.listen(port, () => {
  console.log("Server running on port 8082");
});
