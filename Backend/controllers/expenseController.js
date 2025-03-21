const { hashPassword, checkEmailExists, checkPassword, checkData } = require("../models/User");
const Expense = require("../models/Expense")
const connectDb = require("../config/db");
const xlsx = require('xlsx');


exports.addExpense = async (req, res) =>{
    const userId = req.user.id;
    const {icon, category, amount, createdAt} = req.body;

    if ( !category || !amount ||!createdAt) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const conn = await connectDb();
        const query = 'INSERT INTO expense (userId, icon, category, amount, createdAt) VALUES (?, ?, ?, ?, ?)';
        
        const [result] = await conn.execute(query, [userId, icon, category, amount, createdAt]);

        const income = {
            userId,
            icon,
            category,
            amount,
            createdAt
        }

        return res.status(201).json({
            income,
            // token: generatejwt(income)
        });
    } catch (error) {
        res.status(500).json({message:"Server Error", error: error.message})
    }
}
exports.getAllExpense = async (req, res) =>{
    const userId = req.user.id;
    try {
        const conn = await connectDb();
        const query = 'SELECT * FROM expense WHERE userId = ?';
        
        
        const [result] = await conn.execute(query, [userId]);
        return res.json(result)
    } catch (error) {
        res.status(500).json({message:"Server Error", error: error.message})
    }
}
exports.deleteExpense = async (req, res) =>{
    const id = req.params.id;

    try {
        const conn = await connectDb();
        const query = 'DELETE FROM expense WHERE id = ?';
        
        
        const [result] = await conn.execute(query, [id]);
        return res.status(200).json({message: "Income Deleted."})
    } catch (error) {
        res.status(500).json({message:"Server Error", error: error.message})
    }

}
exports.downloadExpenseExcel = async (req, res) =>{
    const userId = req.user.id;
    try {
        const conn = await connectDb();
        const query = 'SELECT * FROM expense WHERE userId = ?';
        const [result] = await conn.execute(query, [userId]);
        console.log(result);
        

        const data = result.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            CreatedAt: item.createdAt,
            UpdatedAt: item.updatedAt
        }));

        console.log("hgfd",data);
        
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    } catch (error) {
        res.status(500).json({message:"Server Error", error: error.message})
    }
}