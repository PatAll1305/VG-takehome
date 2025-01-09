import React, { useEffect, useState } from 'react';
import { fetchFinancialData } from '../services/api';
import FinancialTable from '../components/FinancialTable';
import ReactSlider from 'react-slider';

const RangeSlider = ({ min, max, step, value, onChange }) => {
    return (
        <ReactSlider
            className="horizontal-slider"
            thumbClassName="thumb"
            trackClassName="track"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
    );
};

export default function Home() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dateRange, setDateRange] = useState({ from: 2020, to: 2024 });
    const [error, setError] = useState<string | null>(null);
    const [revenueRange, setRevenueRange] = useState({ min: 0, max: 500 });
    const [incomeRange, setIncomeRange] = useState({ min: -50, max: 200 });
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedData = filteredData.slice(startIndex, endIndex);

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
        if (dateRange.from < 2000 || dateRange.to < 2020) {
            setError('Please enter a year from 2020 or later.');
            return;
        }
        if (dateRange.from > dateRange.to) {
            setError('From Year cannot be greater than To Year');
            return;
        }
        setError(null);

        const result = data.filter((item: { date: string; revenue: number; netIncome: number }) => {
            const inDateRange = item.date >= `${dateRange.from}-01-01` && item.date <= `${dateRange.to}-12-31`;
            const inRevenueRange =
                (!revenueRange.min || item.revenue >= revenueRange.min * 1e9) &&
                (!revenueRange.max || item.revenue <= revenueRange.max * 1e9);
            const inIncomeRange =
                (!incomeRange.min || item.netIncome >= incomeRange.min * 1e9) &&
                (!incomeRange.max || item.netIncome <= incomeRange.max * 1e9);

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
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">To Year</label>
                    <input
                        type="number"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: +e.target.value })}
                        className="border rounded px-4 py-2 focus:ring focus:ring-blue-300"
                        placeholder="2024"
                    />
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                    <div className="filter-section">
                        <div>
                            <h3>{"Revenue (in billions)"}</h3>
                            <RangeSlider
                                min={0}
                                max={500}
                                step={1}
                                value={[revenueRange.min, revenueRange.max]}
                                onChange={([min, max]) => setRevenueRange({ min, max })}
                            />
                            <p>{`Range: $${revenueRange.min}B - $${revenueRange.max}B`}</p>
                        </div>
                        <div>
                            <h3>{"Net Income (in billions)"}</h3>
                            <RangeSlider
                                min={-50}
                                max={200}
                                step={1}
                                value={[incomeRange.min, incomeRange.max]}
                                onChange={([min, max]) => setIncomeRange({ min, max })}
                            />
                            <p>{`Range: $${incomeRange.min}B - $${incomeRange.max}B`}</p>
                        </div>
                    </div>
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                <button
                    onClick={handleFilter}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                    Filter Data
                </button>
            </div>
            {/* Sorting Buttons */}
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
            <FinancialTable data={paginatedData} />

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button
                    className="btn"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className="btn"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={endIndex >= filteredData.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
