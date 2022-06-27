const express = require('express');
const db = require('./models');
const cors = require('cors');
const app = express();
const port = 3001; 

app.use(express.json());
app.use(cors()); 

const userRouter = require("./routes/Users");
app.use('/users', userRouter); 

const productsRouter = require("./routes/Products");
app.use('/products', productsRouter); 

const categoryRouter = require("./routes/Category");
app.use('/category', categoryRouter); 

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("Server started on http://localhost:" + port);
    });
});

