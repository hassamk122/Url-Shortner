const express = require("express");
const urlRouter = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const connectToMongoDB = require('./connect');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.PORT;




connectToMongoDB(process.env.DATABASE_URL);

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));


app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/",staticRouter);
app.use("/url",urlRouter);

 app.listen(PORT, () => console.log(`Server started at ${PORT}`));