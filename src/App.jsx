import AiAdvisor from './components/AiAdvisor';
import DebtChart from './components/DebtChart';
import DebtForm from './components/DebtForm';
import { useState } from 'react';
import { calculateAvalanchePayoff } from './calculations';

export default function App() {
  // Pre-loaded state for testing
  const [debts, setDebts] = useState([
    { 
      id: 1, 
      name: " ", 
      balance: 0, 
      interestRate: 0, 
      minPayment: 0 
    },
    { 
      id: 2, 
      name: " ", 
      balance: 0, 
      interestRate: 0, 
      minPayment: 0 
    }
  ]);
  const [extraPayment, setExtraPayment] = useState(300);

  // Run the math engine
  const payoffData = calculateAvalanchePayoff(debts, extraPayment);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Visual Debt Avalanche</h1>
        <p className="text-gray-500 mb-8">Map out your fastest route to zero balance.</p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left Column: Inputs */}
          <div className="md:col-span-2">
            
            <DebtForm
            debts={debts}
            setDebts={setDebts}
            setExtraPayment={setExtraPayment}
            />
          </div>

          {/* Right Column: Chart & AI */}
          <div className="md:col-span-3 space-y-6">
            
              <DebtChart debts={debts} payoffData={payoffData} />
          
              <AiAdvisor debts={debts} payoffData={payoffData} extraPayment={extraPayment}  />

          </div>
        </div>
      </div> 
    </div>
  );
}