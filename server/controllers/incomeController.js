const { hashPassword, checkEmailExists, checkPassword, checkData } = require("../models/User");
const Income = require("../models/Income")
const connectDb = require("../config/db");
const xlsx = require('xlsx');


exports.addIncome = async (req, res) =>{
    const userId = req.user.id;
    const {icon, source, amount, createdAt} = req.body;

    if ( !source || !amount ||!createdAt) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const conn = await connectDb();
        const query = 'INSERT INTO income (userId, icon, source, amount, createdAt) VALUES (?, ?, ?, ?, ?)';
        
        
        const [result] = await conn.execute(query, [userId, icon, source, amount, createdAt]);

        const income = {
            userId,
            icon,
            source,
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
exports.getAllIncome = async (req, res) =>{
    const userId = req.user.id;
    try {
        const conn = await connectDb();
        const query = 'SELECT * FROM income WHERE userId = ?';
        
        
        const [result] = await conn.execute(query, [userId]);
        return res.json(result)
    } catch (error) {
        res.status(500).json({message:"Server Error", error: error.message})
    }
}
exports.deleteIncome = async (req, res) =>{
    const id = req.params.id;

    try {
        const conn = await connectDb();
        const query = 'DELETE FROM income WHERE id = ?';
        
        
        const [result] = await conn.execute(query, [id]);
        return res.status(200).json({message: "Income Deleted."})
    } catch (error) {
        res.status(500).json({message:"Server Error", error: error.message})
    }

}
exports.downloadIncomeExcel = async (req, res) =>{
    const userId = req.user.id;
    try {
        const conn = await connectDb();
        const query = 'SELECT * FROM income WHERE userId = ?';
        const [result] = await conn.execute(query, [userId]);
        console.log(result);
        

        const data = result.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            CreatedAt: item.createdAt,
            UpdatedAt: item.updatedAt
        }));

        console.log(data);
        
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    } catch (error) {
        res.status(500).json({message:"Server Error", error: error.message})
    }
}
// exports.editItem = async (req, res) => {

// }


