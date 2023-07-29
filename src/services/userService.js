// email, fullname, password, regionId
const pool = require('../database/index');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const InvariantError = require('../exeptions/InvariantError');
const AuthorizationError = require('../exeptions/AuthorizationError');
const NotFoundError = require('../exeptions/NotFoundError');

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

const findAllUser = async ({ role, regionId }) => {
   const [rows] = await pool.query(`
   SELECT Users.id, Users.fullname, Users.email, Users.role, Regions.name as region
   FROM Users
   INNER JOIN Regions ON Users.regionId = Regions.id
   `);

   if (role === 'ADMIN_UTAMA') {
      return rows;
   }

   if (role === 'ADMIN_DAERAH') {
      return rows.map((user) => user.regionId === regionId);
   }
}

const findUserById = async (userId, {role, regionId}) => {
   const [rows] = await pool.query(`
   SELECT Users.*, Regions.name AS regionName, Devices.name as deviceName, Devices.regionId as deviceRegionId
   FROM Users
   INNER JOIN Regions ON Users.regionId = Regions.id
   INNER JOIN Devices ON Users.regionId = Devices.regionId
   WHERE Users.id = ?
   `, [userId]);

   if (!rows[0]) {
      throw new NotFoundError(`User dengan id '${userId}' tidak dapat ditemukan`);   
   }

   if (role === 'ADMIN_UTAMA' || (role === 'ADMIN_DAERAH' && regionId === rows[0].regionId) || regionId === rows[0].regionId) {
      return rows[0];
   }

   throw new AuthorizationError('Anda tidak berhak mengakses resource ini');

}

const destroyUser = async (userId, { role, regionId }) => {

   const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [userId]);

   if (role !== 'ADMIN_UTAMA' && role !== 'ADMIN_DAERAH') {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini.')
   }


   if (role === 'ADMIN_UTAMA' || (role === 'ADMIN_DAERAH' && regionId === rows[0].regionId)) {
      await pool.query('DELETE FROM Users WHERE id = ?', [userId])
   }
}

// const findUserById = async (userId) => {
//    const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [userId]);

//    if (!rows[0]) {
//       throw new Not
//    }
// }

module.exports = {
   createuser,
   existingEmail,
   findAllUser,
   destroyUser,
   findUserById,
}