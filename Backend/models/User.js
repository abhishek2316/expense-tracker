// const bcrypt = require('bcryptjs');
// const connectDB = require('../config/db');

// class User {
//   static async save(fullName, email, password, profileImageUrl) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const query = 'INSERT INTO users (fullName, email, password, profileImageUrl) VALUES (?, ?, ?, ?)';
//     try {
//       const con = await connectDB();
//       const [result] = await con.execute(query, [fullName, email, hashedPassword, profileImageUrl]);
//       con.end();
//       return result;
//     } catch (err) {
//       throw err;
//     }
//   }

//   static async comparePassword(candidatePassword, userId) {
//     const query = 'SELECT password FROM users WHERE id = ?';
//     try {
//       const con = await connectDB();
//       const [rows] = await con.execute(query, [userId]);
//       con.end();
//       if (rows.length === 0) throw new Error('User not found');
//       return await bcrypt.compare(candidatePassword, rows[0].password);
//     } catch (err) {
//       throw err;
//     }
//   }

//   static async getByEmail(email) {
//     const query = 'SELECT * FROM users WHERE email = ?';
//     try {
//       const con = await connectDB();
//       const [rows] = await con.execute(query, [email]);
//       con.end();
//       return rows.length ? rows[0] : null;
//     } catch (err) {
//       throw err;
//     }
//   }
// }

// module.exports = User;
