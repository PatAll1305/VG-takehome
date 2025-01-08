# Financial Data Filtering App

Welcome to the Financial Data Filtering App! This web application allows users to view, filter, and analyze Apple's annual income statements using real financial data from the Financial Modeling Prep API.

```bash
Live site URL: https://vg-takehome.onrender.com
```

## Project Overview
This application fetches data from an API endpoint that provides Apple's annual income statements and displays them in an easy-to-read table. Users can filter data by date range, revenue, and net income. Additionally, users can sort the table by date, revenue, or net income in ascending or descending order.

## Features
- **Data Display**: View Apple's annual income statement data in a table format.
- **Filtering**:
  - Date Range (from 2020 onward).
  - Revenue (minimum and maximum values).
  - Net Income (minimum and maximum values).
- **Sorting**:
  - Sort by Date.
  - Sort by Revenue.
  - Sort by Net Income.
- **User Feedback**:
  - Error message if the date range entered is before 2020.
  - Hover effects for interactive and intuitive navigation.
- **Responsive Design**:
  - The app is fully responsive and adapts to different screen sizes.
- **Social Media Links**:
  - Quick access to the developer's LinkedIn, GitHub, email, and phone.

## How to Use the App
1. **View Financial Data**: Upon opening the app, a table with Apple's income statement will be displayed.
2. **Filter by Date**:
   - Enter the starting and ending years to filter by a specific date range.
   - A warning message will appear if a date before 2020 is selected.
3. **Filter by Revenue/Net Income**:
   - Enter minimum and maximum values for revenue and net income to filter the results.
4. **Sort Data**:
   - Click the buttons above the table to sort by date, revenue, or net income.
   - The table will update to show results in ascending or descending order.
5. **Access Social Links**:
   - On the right side of the page, click on buttons with social media logos to access the developer's profiles or contact details.

## Technical Overview
- **Frontend**: React (TypeScript) with TailwindCSS for styling.
- **API**: Financial data sourced from Financial Modeling Prep.
- **Deployment**: The app is deployed on Render for public access.

## Deployment
- The app is hosted on Render. Simply visit the provided URL to use the app.

## Developer Contact
- **LinkedIn**: [Patrick Allen](https://www.linkedin.com/in/patrick-allen-540938246/)
- **GitHub**: [PatAll1305](https://github.com/PatAll1305)
- **Phone**: +1 (773)-789-3105
- **Email**: patrickallen1305@gmail.com

## Running the Project Locally
### Prerequisites
- Node.js and npm/yarn installed.
- Command line terminal open and navigated to directory to house project

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd financial-data-filtering-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set .env variables:
   ```bash
   VITE_APP_API_KEY=<api key>
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Navigate to the provided link from the terminal in your browser if you are not automatically navigated.

## Notes
- The API endpoint used returns a maximum of 5 entries. This is a limitation from the data provider.
- For larger datasets, consider upgrading the API plan or contacting Financial Modeling Prep support.
