const express = require("express"),
    app = express();
    mongoose = require("mongoose"),
    cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT

app.use(express.json())
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//setup routes
app.use("/v1/users", require("./routes/user"));
app.use("/v1/admins", require("./routes/admin"));
app.use("/v1/i-cases", require("./routes/i_case"));
app.use("/v1/ringlights", require("./routes/ringlight"));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});