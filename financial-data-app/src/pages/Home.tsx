import React, { useEffect, useState } from 'react';
import { fetchFinancialData } from '../services/api';
import FinancialTable from '../components/FinancialTable';
import Slider from '@mui/material/Slider';

const RangeSlider = ({ min, max, value, onChange }) => (
    <Slider
        value={value}
        min={min}
        max={max}
        onChange={(_, newValue) => onChange(newValue)}
        valueLabelDisplay="auto"
    />
);

export default function Home() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dateRange, setDateRange] = useState({ from: 2020, to: 2024 });
    const [revenueRange, setRevenueRange] = useState({ min: 0, max: 500 });
    const [incomeRange, setIncomeRange] = useState({ min: -50, max: 200 });
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState('');

    const rowsPerPage = 10;

    useEffect(() => {
        fetchFinancialData().then((res) => {
            setData(res);
            setFilteredData(res);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredData]);

    const handleFilter = () => {
        if (dateRange.from > dateRange.to) {
            setError('The "From Year" cannot be greater than the "To Year".');
            return;
        }

        setError('');
        const result = data.filter((item: { date: string, revenue: number, netIncome: number }) => {
            const inDateRange = item.date >= `${dateRange.from}-01-01` && item.date <= `${dateRange.to}-12-31`;
            const inRevenueRange =
                item.revenue >= revenueRange.min * 1e9 && item.revenue <= revenueRange.max * 1e9;
            const inIncomeRange =
                item.netIncome >= incomeRange.min * 1e9 && item.netIncome <= incomeRange.max * 1e9;

            return inDateRange && inRevenueRange && inIncomeRange;
        });

        setFilteredData(result);
    };

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });

        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredData(sortedData);
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Section */}
            <div className="flex flex-col lg:w-1/2 gap-6">
                {/* Date Range Filter */}
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 dark:text-gray-300">From Year</label>
                    <input
                        type="number"
                        value={dateRange.from}
                        onChange={(e) =>
                            setDateRange((prev) => ({ ...prev, from: +e.target.value }))
                        }
                        className="border rounded px-4 py-2 focus:ring focus:ring-blue-300 dark:bg-gray-800"
                        placeholder="2020"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium text-gray-700 dark:text-gray-300">To Year</label>
                    <input
                        type="number"
                        value={dateRange.to}
                        onChange={(e) =>
                            setDateRange((prev) => ({ ...prev, to: +e.target.value }))
                        }
                        className="border rounded px-4 py-2 focus:ring focus:ring-blue-300 dark:bg-gray-800"
                        placeholder="2024"
                    />
                </div>

                {/* Revenue and Net Income Range Filters */}
                <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Revenue (in billions)</h3>
                    <RangeSlider
                        min={0}
                        max={500}
                        value={[revenueRange.min, revenueRange.max]}
                        onChange={([min, max]) => setRevenueRange({ min, max })}
                    />
                    <p>{`Range: $${revenueRange.min}B - $${revenueRange.max}B`}</p>
                </div>
                <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Net Income (in billions)</h3>
                    <RangeSlider
                        min={-50}
                        max={200}
                        value={[incomeRange.min, incomeRange.max]}
                        onChange={([min, max]) => setIncomeRange({ min, max })}
                    />
                    <p>{`Range: $${incomeRange.min}B - $${incomeRange.max}B`}</p>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button
                    onClick={handleFilter}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Apply Filters
                </button>
            </div>

            {/* Sorting and Data Display */}
            <div className="lg:w-1/2 flex flex-col gap-4">
                {/* Sorting Buttons */}
                <div className="flex gap-4">
                    {['date', 'revenue', 'netIncome'].map((key) => (
                        <button
                            key={key}
                            onClick={() => handleSort(key)}
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 min-w-85"
                        >
                            Sort by {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                            {sortConfig.key === key && (
                                <span>{sortConfig.direction === 'asc' ? '⬆️' : '⬇️'}</span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Financial Table */}
                <FinancialTable data={paginatedData} />

                {/* Pagination Controls */}
                <div className="flex justify-between">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:text-black"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                currentPage * rowsPerPage < filteredData.length ? prev + 1 : prev
                            )
                        }
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:text-black"
                        disabled={currentPage * rowsPerPage >= filteredData.length}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
