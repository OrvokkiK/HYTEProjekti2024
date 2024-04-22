import promisePool from "../utils/database.mjs";

const addEntry = async (entry) => {
  const {
    user_id,
    entry_date,
    feel_healthy,
    medication,
    medication_purpose,
    caffeine_intake,
    nicotine_intake,
    alcohol_intake,
    hours_slept,
    enough_sleep,
    quality_sleep,
    physical_activity,
    duration,
    intensity,
  } = entry;
  const sql = `INSERT INTO Lifestyle 
      (user_id, entry_date, feel_healthy, medication, medication_purpose, caffeine_intake, nicotine_intake, alcohol_intake, hours_slept, enough_sleep, quality_sleep, physical_activity, duration, intensity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    user_id,
    entry_date,
    feel_healthy,
    medication,
    medication_purpose,
    caffeine_intake,
    nicotine_intake,
    alcohol_intake,
    hours_slept,
    enough_sleep,
    quality_sleep,
    physical_activity,
    duration,
    intensity,
  ];
  try {
    const rows = await promisePool.query(sql, params);
    console.log("rows", rows);
    return { lifestyle_id: rows[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const listLifestyleDataByUserId = async (user_id) => {
  try {
    const sql = 'SELECT * FROM LIFESTYLE WHERE user_id=?';
    const params = [user_id]
    const [rows] = await promisePool.query(sql, params);
    if (rows.length === 0 ) {
      return {error: 404, message: `No lifestyle entries found`};
    } else {
      return rows;
    };
  } catch (error) {
    console.error('listLifestyleDataByUserId: ', error.message);
    return {error: error.message};
  }
};

export { addEntry,
listLifestyleDataByUserId };
