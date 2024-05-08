import promisePool from "../utils/database.mjs";

// add an entry to lifestyle
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
    console.log(rows[0].insertId);
    return { lifestyle_id: rows[0].insertId };
  } catch (e) {
    console.error("error", e);
    return { error: e.message };
  }
};

// Lists lifestyle entries by user_id
const listLifestyleDataByUserId = async (user_id) => {
  try {
    const sql = 'SELECT * FROM Lifestyle WHERE user_id=?';
    const params = [user_id]
    const [rows] = await promisePool.query(sql, params);
    if (rows.length === 0 ) {
      return {error: 404, message: `No lifestyle entries found`};
    } else {
      return rows;
    };
  } catch (error) {
    console.error('listLifestyleDataByUserId: ', error);
    return {error: error.message};
  }
};

export { 
  addEntry,
  listLifestyleDataByUserId
};