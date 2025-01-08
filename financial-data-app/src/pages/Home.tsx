import { useEffect, useState } from 'react';
import { fetchFinancialData } from '../services/api';
import FinancialTable from '../components/FinancialTable';

export default function Home() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dateRange, setDateRange] = useState({ from: 2020, to: 2024 });
    const [error, setError] = useState<string | null>(null);
    const [revenueRange, setRevenueRange] = useState({ min: '', max: '' });
    const [incomeRange, setIncomeRange] = useState({ min: '', max: '' });
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    useEffect(() => {
        fetchFinancialData().then((res) => {
            setData(res);
            setFilteredData(res);
        });
    }, []);



    const handleFilter = () => {
        if (dateRange.from < 2000 || dateRange.to < 2020) {
            setError('Please enter a year from 2020 or later.');
            return;
        }
        if (dateRange.from > dateRange.to) {
            setError('From Year cannot be greater than To Year');
            return;
        }
        setError(null);

        const result = data.filter((item: { date: string, revenue: string, netIncome: string }) => {
            const inDateRange = item.date >= `${dateRange.from}-01-01` && item.date <= `${dateRange.to}-12-31`;
            const inRevenueRange =
                (!revenueRange.min || item.revenue >= revenueRange.min) &&
                (!revenueRange.max || item.revenue <= revenueRange.max);
            const inIncomeRange =
                (!incomeRange.min || item.netIncome >= incomeRange.min) &&
                (!incomeRange.max || item.netIncome <= incomeRange.max);

            return inDateRange && inRevenueRange && inIncomeRange;
        });

        setFilteredData(result);
    };


    const handleSort = (key: string) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredData(sortedData);
    };

    return (
        <div>
            {/* Filter Section */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">From Year</label>
                    <input
                        type="number"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: +e.target.value })}
                        className="border rounded px-4 py-2 focus:ring focus:ring-blue-300"
                        placeholder="2020"
                    />
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">To Year</label>
                        <input
                            type="number"
                            value={dateRange.to}
                            onChange={(e) => setDateRange({ ...dateRange, to: +e.target.value })}
                            className="border rounded px-4 py-2 focus:ring focus:ring-blue-300"
                            placeholder="2024"
                        />
                        <div className="flex flex-wrap gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Revenue Min</label>
                                <input
                                    type="number"
                                    value={revenueRange.min}
                                    onChange={(e) => setRevenueRange({ ...revenueRange, min: e.target.value })}
                                    className="mt-1 block w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Revenue Max</label>
                                <input
                                    type="number"
                                    value={revenueRange.max}
                                    onChange={(e) => setRevenueRange({ ...revenueRange, max: e.target.value })}
                                    className="mt-1 block w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Net Income Min</label>
                                <input
                                    type="number"
                                    value={incomeRange.min}
                                    onChange={(e) => setIncomeRange({ ...incomeRange, min: e.target.value })}
                                    className="mt-1 block w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Net Income Max</label>
                                <input
                                    type="number"
                                    value={incomeRange.max}
                                    onChange={(e) => setIncomeRange({ ...incomeRange, max: e.target.value })}
                                    className="mt-1 block w-full p-2 border rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-500 mt-2">
                            {error}
                        </div>
                    )}
                </div>
                <button
                    onClick={handleFilter}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                    Filter Data
                </button>
            </div>

            {/* Sort Buttons */}

            <div className="flex gap-4 mt-4 mb-4">
                <button
                    onClick={() => handleSort('date')}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                    Sort by Date {sortConfig.key === 'date' && (
                        <span className="ml-2">{sortConfig.direction === 'asc' ? '⬆️' : '⬇️'}</span>
                    )}
                </button>
                <button
                    onClick={() => handleSort('revenue')}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                    Sort by Revenue {sortConfig.key === 'revenue' && (
                        <span className="ml-2">{sortConfig.direction === 'asc' ? '⬆️' : '⬇️'}</span>
                    )}
                </button>
                <button
                    onClick={() => handleSort('netIncome')}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                    Sort by Net Income {sortConfig.key === 'netIncome' && (
                        <span className="ml-2">{sortConfig.direction === 'asc' ? '⬆️' : '⬇️'}</span>
                    )}
                </button>
            </div>
            {/* Data Table */}
            <FinancialTable data={filteredData} />
        </div>
    );
}
