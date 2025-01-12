# EV Insights Dashboard

A modern Next.js application for visualizing electric vehicle trends using interactive data visualizations. The app leverages web workers for performance optimization, ShadCN for UI components, and Chart.js for creating insightful graphs and charts.

## Features

- **Interactive Graphs**: Analyze EV trends with dynamic line, bar, and area charts.
- **Data Insights**: Explore data by year, manufacturer, and EV type (BEV vs. PHEV).
- **Web Worker Integration**: Offload data processing to web workers for smooth performance.
- **Modern Design**: Built using ShadCN components and Tailwind CSS for a clean, responsive UI.
- **Optimized Performance**: Efficiently handles large datasets with asynchronous parsing and rendering.

## Technologies Used

- **Frontend**: Next.js (React)
- **Styling**: Tailwind CSS and ShadCN Component Library
- **Data Parsing**: Papaparse for CSV data processing
- **Visualization**: Recharts for creating interactive charts
- **Performance**: Web workers for processing data off the main thread

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/karanjoshi1206/analytics-dashboard-assessment.git
   cd analytics-dashboard-assessment/analytics-dashboard
   ```

2. **Install Packages**

   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```


# Visit the dashboard here
[https://analytics-dashboard-assessment-three.vercel.app/dashboard](https://analytics-dashboard-assessment-three.vercel.app/dashboard)