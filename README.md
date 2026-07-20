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

## AI Workflow Integration: GPT-5.6 & Codex

This project was built utilizing OpenAI's models to accelerate development, inform architectural decisions, and rapidly generate complex logic. 

**How GPT-5.6 was used (Architecture & Strategy):**
*   **Key Decisions:** GPT-5.6 acted as a strategic sounding board. It guided the structural decision to separate the mathematical logic engine from the Chart.js rendering components to maintain clean, scalable code. 
*   **Problem Solving:** Used to conceptualize the best approach for managing complex dictionary lookups (synchronizing raw data IDs with human-readable inputs) before any code was written.

**How Codex was used (Implementation & Acceleration):**
*   **Workflow Acceleration:** Codex exponentially sped up the frontend development process. It was utilized to rapidly scaffold Tailwind CSS components and write the boilerplate `useRef` and `useEffect` hooks for the loading states.
*   **Logic Generation:** Codex was directly responsible for writing the core `reduce` function inside the AI Advisor component, accurately plucking the highest interest rate from a dynamic array and automatically formatting the output into localized USD currency. This saved hours of manual syntax formatting and debugging.

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
