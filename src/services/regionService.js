const pool = require('../database/index');
const { nanoid } = require('nanoid');

const createRegion = async (name) => {
   const id = `region-${nanoid()}`;
   const sql = 'INSERT INTO Regions (id, name) values (?, ?)';

   const [rows, fields] = await pool.query(sql, [id, name]);

   return rows;
}

const findAllRegion = async () => {
   const [rows] = await pool.query('SELECT * FROM Regions');

   return rows;
}

module.exports = {
   createRegion,
   findAllRegion
}