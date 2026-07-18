# 🏔️ Visual Debt Avalanche

**Live Demo:** https://visual-debt-avalanche.vercel.app/

Visual Debt Avalanche is a dynamic, interactive React application designed to help users map out their fastest route to zero debt. By leveraging the mathematical "avalanche method" (targeting high-interest debt first), this tool visualizes complex payoff timelines and provides automated, personalized financial strategies based on user inputs.

## Features

*   **Real-Time Data Visualization:** Integrates `Chart.js` to dynamically render a line chart mapping out the remaining balances of multiple loans over time. The chart instantly updates as users adjust their inputs.
*   **Dynamic State Management:** Users can infinitely add, edit, or remove individual loans. The app securely handles complex array states and uses UUIDs to track unique datasets.
*   **Algorithmic "AI" Advisor:** Features a custom logic engine that analyzes the user's specific debt portfolio, calculates the mathematically optimal payoff strategy (highest interest rate), and generates a personalized, actionable plan.
*   **Responsive Modern UI:** Fully styled with Tailwind CSS to provide a clean, accessible, and intuitive user experience across all devices.

## Tech Stack

*   **Framework:** React (Vite)
*   **Styling:** Tailwind CSS
*   **Data Visualization:** Chart.js / react-chartjs-2
*   **Deployment:** Vercel

## Technical Highlights

Building this application involved solving several interesting technical challenges:
*   **Complex Dictionary Lookups:** Synchronizing raw data IDs from the math engine with human-readable inputs in the UI so the chart legends update dynamically.
*   **Data Parsing:** Safely handling JavaScript type conversions (ensuring user inputs act as numbers rather than strings) to prevent rendering bugs in the visualization logic.
*   **Simulated Asynchronous Operations:** Implementing `setTimeout` and cleanup functions via `useRef` and `useEffect` to create a smooth, non-blocking loading state for the dynamic advisor component.

## Local Installation

To run this project locally on your machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/NothingWild/visual-debt-avalanche.git
2. Navigate into the directory:
   ```bash
   cd visual-debt-avalanche
3. Install the dependencies:
   ```bash
   npm install
4. Start the development server:
   ```bash
   npm run dev

**Designed and built by Victor Pacheco for the OpenAI Build Week hackathon project.**
