import React from "react";

interface FinancialData {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

interface Props {
  data: FinancialData[];
}

export default function FinancialTable({ data }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
          <tr>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Revenue</th>
            <th className="px-6 py-3 text-left">Net Income</th>
            <th className="px-6 py-3 text-left">Gross Profit</th>
            <th className="px-6 py-3 text-left">EPS</th>
            <th className="px-6 py-3 text-left">Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } text-gray-800 hover:bg-blue-100 transition duration-200`}
            >
              <td className="px-6 py-4">{item.date}</td>
              <td className="px-6 py-4">${item.revenue.toLocaleString('en-US')}</td>
              <td className="px-6 py-4">${item.netIncome.toLocaleString('en-US')}</td>
              <td className="px-6 py-4">${item.grossProfit.toLocaleString('en-US')}</td>
              <td className="px-6 py-4">{item.eps}</td>
              <td className="px-6 py-4">${item.operatingIncome.toLocaleString('en-US')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
