const fetchData = async (url, options = {}) => {
  let jsonData;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    jsonData = await response.json();
  } catch (error) {
    console.error('fetchData() error', error);
    jsonData = {};
  }
  return jsonData;
};

export {fetchData};