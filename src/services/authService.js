const pool = require('../database/index');
const bcrypt = require('bcryptjs');
const AuthenticationError = require('../exeptions/AuthenticationError');

const login = async ({ email, password }) => {
   const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);

   if (!rows) {
      throw new AuthenticationError('Kredensial yang anda masukkan salah');
   }

   const validPassword = await bcrypt.compareSync(password, rows[0].password);

   if (!validPassword) {
      throw new AuthenticationError('Kredensial yang anda masukkan salah.');
   }

   return rows[0];
}

module.exports = {
   login,
}