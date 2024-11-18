const path = require('path');
const fs=require("fs")
const express = require('express');
const bodyParser = require('body-parser');
  
const errorController = require('./controllers/error');
const expenseTrackerRoutes = require('./routes/ExpenseTracker');
const purchaseRoutes = require('./routes/purchase');
const premiumFeatureRoutes = require('./routes/premiumFeature');
const resetPasswordRoutes = require('./routes/forgotPassword')
const User= require("./models/Expense")
const Expense= require("./models/ExpenseTracker")
const Order=require("./models/orders")
const Forgotpassword = require("./models/forgotPassword")
const downloadss=require("./models/allDownloads")
const sequelize=require('./util/database')
console.log(process.env.NODE_ENV)
const helmet=require("helmet")
const compression=require("compression")

const morgan=require("morgan")

var cors=require("cors")
const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();
const accessLogStream=fs.createWriteStream(path.join(__dirname,"access.log"),{flags:"a"})
app.use(helmet())
app.use(compression())
app.use(morgan("combined",{stream:accessLogStream}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));




app.use(cors());




const expenseRoutes = require('./routes/Expense');


app.set('view engine', 'ejs');
app.set('views', 'views');




app.use("/user",expenseRoutes)
app.use("/expense",expenseTrackerRoutes)
app.use("/purchase",purchaseRoutes)
app.use("/premium",premiumFeatureRoutes)
app.use('/password', resetPasswordRoutes);



User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);


User.hasMany(downloadss);
downloadss.belongsTo(User);


app.get('/search', (req, res) => {
  const query = req.query.query;
  const page = req.query.page;
  console.log(query)
  console.log(page)
  // Process the search logic here
  res.send(`Search query: ${query}, Page: ${page}`);
});


app.use(errorController.get404);

sequelize
.sync()
.then(result =>{
  console.log(result)
  const PORT = process.env.PORT || 4008; // Change to a different port
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
})
.catch(err =>{
  console.log(err)
})


