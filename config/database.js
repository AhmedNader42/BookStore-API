const mongoose = require("mongoose");

const mongoDB = "mongodb+srv://test:reallyWeakPassword123@cluster0.uzua7.mongodb.net/bookstore?retryWrites=true&w=majority" 

mongoose.connect(
    mongoDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    () => {
        console.log("Connected");
    }
);

mongoose.Promise = global.Promise;

module.exports = mongoose;
