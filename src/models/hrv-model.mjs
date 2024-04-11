import promisePool from "../utils/database.mjs";

const addHrv = async (entry) => {
  const { user_id, entry_date, stress_index, mood, av_hrv, rmssd } = entry;
  const sql = `INSERT INTO hrv_analysis (user_id, entry_date, stress_index, mood, av_hrv, rmssd) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, stress_index, mood, av_hrv, rmssd];
try {
    const rows = await promisePool.query(sql, params);
    console.log("rows", rows);
    return {hrv_id: rows[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export {addHrv};