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
  
export {
    addEntry,
};