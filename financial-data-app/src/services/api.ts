const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const fetchFinancialData = async () => {
    const response = await fetch(
        `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&&apikey=${API_KEY}&&limit=100`
    );
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
};
