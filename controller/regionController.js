const pool = require('../database/index')

const createRegionHandler = async (req, res) => {
   const { name } = req.body;
  const sql = 'insert into Regions (id, name) values (?, ?)'
  const [rows, fields] = await pool.query(sql, [2, name])

  res.status(200).json({
   status: 'success',
   data: {
      rows
   }
  })
}

module.exports = {
  createRegionHandler
}
