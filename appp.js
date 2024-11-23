const getUserLeaderBoard=async (req,res,next)=>{
    try{
        const userLeaderBoardDetails=await Users.findAll({
            attributes:["id","Username",[sequelize.fn("sum",sequelize.col("ExpenseTrackers.expense")),"total_cost"]],
            include:[
                {
                model:Expense,
                attributes:[]
                }
            ],
            group:["user.id"],
            order:[["total_cost","DESC"]]


        })
        console.log(userLeaderBoardDetails[0])
        res.status(200).json({userLeaderBoardDetails})

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)

    }
}
-----------------------------------------------------------------------------------------
const getUserLeaderBoard=async (req,res,next)=>{
    try{
        const userLeaderBoardDetails=await Users.findAll({
            attributes:["id","Username",[sequelize.fn("sum",sequelize.col("ExpenseTrackers.expense")),"total_cost"]],
            include:[
                {
                model:Expense,
                attributes:[]
                }
            ],
            group:["user.id"],
            order:[["total_cost","DESC"]]


        })
        console.log(userLeaderBoardDetails[0])
        res.status(200).json({userLeaderBoardDetails})

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)

    }
}

------------------------------------------------------------------------------------------------>
const { Op } = require('sequelize');  // For operators like Op.eq
const Expense = require('../models/Expense');
const Income = require('../models/Income');

async function getSortedTransactions(req, week, year) {
  try {
    // Fetch records from the ExpenseTracker table
    const expenses = await Expense.findAll({
      where: {
        userId: req.user.id,
        week: week,
        year: year
      },
      order: [['date', 'ASC']]  // Sort by date in ascending order
    });

    // Fetch records from the Income table
    const incomes = await Income.findAll({
      where: {
        userId: req.user.id,
        week: week,
        year: year
      },
      order: [['date', 'ASC']]  // Sort by date in ascending order
    });

    // Combine both the arrays (expenses and incomes)
    const combined = [...expenses, ...incomes];

    // Sort the combined array by the 'date' field in ascending order
    const sortedTransactions = combined.sort((a, b) => {
      // Compare by 'date' field of each transaction
      return new Date(a.date) - new Date(b.date);
    });

    return sortedTransactions;

  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

------------------------------------------------->
DB_NAME="Expensetracker"
DB_USERNAME="Saketh"
DB_PASSWORD="Saketh1234"
DB_HOST="database-1.cl2ewoagg6xg.eu-north-1.rds.amazonaws.com"
TOCKEN_SECRET="hi"
RAZORPAY_KEY_ID="rzp_test_gM54lkHEXhsDvO"
RAZORPAY_KEY_SECRET="0j1g3ErpySG1RDDi2aW172gL"



module.exports={
    getUserLeaderBoard
}