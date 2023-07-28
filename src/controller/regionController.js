const pool = require('../database/index')
const { nanoid } = require('nanoid')

const createRegionHandler = async (req, res) => {
  const { name } = req.body
  const id = `region-${nanoid()}`
  const sql = 'insert into Regions (id, name) values (?, ?)'
  const [rows, fields] = await pool.query(sql, [id, name])

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
