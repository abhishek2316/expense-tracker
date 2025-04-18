// const Income = require("../controllers/incomeController")
const connectDb = require("../config/db");

exports.getDashboardData = async (req, res) => {
    try{
        const userId = req.user.id
        const conn = await connectDb();
        const queryIncome = 'SELECT SUM(amount) FROM income WHERE userId = ?';
        const [income] = await conn.execute(queryIncome, [userId]);
        // console.log("Income", income);
        

        const queryExpense = 'SELECT SUM(amount) FROM expense WHERE userId = ?';
        const [expense] = await conn.execute(queryExpense, [userId]);
        // console.log("Expense", expense);
        

        // const last60daysIncomeTransaction = 
        const incomequery60days = 'SELECT * FROM income WHERE createdAt > NOW() - INTERVAL 60 DAY AND userId = ? order by createdAt DESC';
        const [last60daysIncomeTransaction] = await conn.execute(incomequery60days, [userId]);

        const incomeLast60Days = last60daysIncomeTransaction.reduce(
            (sum, income) => sum + Number(income.amount), 0
        );
        // console.log("Hey",incomeLast60Days);
        
        // Get Expense transaction in last 30 days
        const expensequery30days = 'SELECT * FROM expense WHERE createdAt > NOW() - INTERVAL 30 DAY AND userId = ? order by createdAt DESC';
        const [last30daysExpenseTransaction] = await conn.execute(expensequery30days, [userId]);

        const expenseLast30Days = last30daysExpenseTransaction.reduce(
            (sum, expense) => sum + Number(expense.amount), 0
        );
        // console.log("dsd", expenseLast30Days);

        // const lastTransaction = 
        const incomeLast5Transactions = 'SELECT * FROM income WHERE userId = ? order by createdAt DESC LIMIT 5';
        const [last5daysIncomeTransaction] = await conn.execute(incomeLast5Transactions, [userId]);
        const expenseLast5Transactions = 'SELECT * FROM expense WHERE userId = ? order by createdAt DESC LIMIT 5';
        const [last5daysExpenseTransaction] = await conn.execute(expenseLast5Transactions, [userId]);
        
        const lastTransactions = [
            ...last5daysIncomeTransaction.map(txn => ({ ...txn, type: 'income' })),
            ...last5daysExpenseTransaction.map(txn => ({ ...txn, type: 'expense' })),
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        console.log("last",lastTransactions);
        
        // Final response
        res.json({
            totalBalance: (income[0]?.['SUM(amount)'] || 0) - (expense[0]?.['SUM(amount)'] || 0),
            income: income[0]?.['SUM(amount)'] || 0,
            expense: expense[0]?.['SUM(amount)'] || 0,
            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: last30daysExpenseTransaction,
            },
            last60DaysIncome: {
                total:incomeLast60Days,
                transactions: last60daysIncomeTransaction,
            },
            recentTransactions: lastTransactions
        });
    } catch (error){
        res.status(500).json({message: "Server Error", error});
    }
}

