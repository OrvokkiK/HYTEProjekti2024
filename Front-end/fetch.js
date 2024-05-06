const fetchData = async (url, options = {}) => {
  let jsonData;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 401) {
        handleUnauthorizedAccess();
      }
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    jsonData = await response.json();
  } catch (error) {
    console.error('fetchData() error', error);
    jsonData = {};
  }
  return jsonData;
};

function handleUnauthorizedAccess() {
  localStorage.removeItem('analysisModalShown');
  localStorage.removeItem('user_id');
  localStorage.removeItem('token');
  localStorage.removeItem('loginTime');
  alert('Kirjautumisesi on vanhentunut. Kirjaudu sisään uudelleen.');
  window.location.href = 'index.html';
}

export { fetchData };
