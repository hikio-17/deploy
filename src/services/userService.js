// email, fullname, password, regionId
const pool = require('../database/index');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const InvariantError = require('../exeptions/InvariantError');

const createuser = async ({ email, fullname, password, regionId, imageProfile = '', role = 'USER' }) => {
   const id = `user-${nanoid()}`;
   const sql = 'INSERT INTO Users (id, fullname, email, password, imageProfile, role, regionId) values (?, ?, ?, ?, ?, ?, ?)';
   const hashedPassword = await bcrypt.hashSync(password, 10);
   const [rows, fields] = await pool.query(sql, [id, fullname, email, hashedPassword, imageProfile, role, regionId]);

   return rows;
}

const existingEmail = async (email) => {
   const [rows ] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
          
   if (rows[0]) {
      throw new InvariantError(`Alamat email ''${email} sudah digunakan`);
   }
}

module.exports = {
   createuser,
   existingEmail
}