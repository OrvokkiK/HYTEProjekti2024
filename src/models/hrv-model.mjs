import promisePool from "../utils/database.mjs";

const addHrv = async (entry) => {
  const {
    user_id,
    entry_date,
    stress_index,
    av_hrv,
    mean_rr_ms,
    sdnn_ms,
    readiness,
  } = entry;
  const sql = `INSERT INTO hrv_analysis (user_id, entry_date, stress_index, av_hrv, mean_rr_ms, sdnn_ms, readiness) VALUES ( ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    user_id,
    entry_date,
    stress_index,
    av_hrv,
    mean_rr_ms,
    sdnn_ms,
    readiness,
  ];
  try {
    const rows = await promisePool.query(sql, params);
    console.log("rows", rows);
    return { hrv_id: rows[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const listHrvByUserId = async (user_id) => {
  try {
    const sql = 'SELECT * FROM hrv_analysis WHERE user_id=?';
    const params = [user_id];
    const [rows] = await promisePool.query(sql, params);
    if (rows.length === 0 ) {
      return {error: 404, message: `No hrv entries found by user_id${user_id}`};
    } else {
      return rows;   
    };
  } catch (error) {
    console.error('listHrvByUserId: ', error.message);
    return {error: error.message};
  }
};

export { addHrv, listHrvByUserId };
