const API_KEY = 'Hfw05ZlFWlpNFSZlfSfJts9SwKJk7IRp';

export const fetchFinancialData = async () => {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${API_KEY}&&limit=100`);
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
};
