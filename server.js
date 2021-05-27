const express = require("express");
const morgan = require("morgan");
const pkg = require("./package.json");
const mongoose = require("./config/database");

const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");

const app = express();

mongoose.connection.on("error", console.error.bind(console, "DB Connection Error"));

app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
    res.json({
        author: app.get("pkg").author,
        name: app.get("pkg").name,
        description: app.get("pkg").description,
        version: app.get("pkg").version,
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});
