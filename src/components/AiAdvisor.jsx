import React, { useEffect, useRef, useState } from "react";

export default function AiAdvisor({ debts, payoffData, extraPayment }) {
  const [isLoading, setIsLoading] = useState(false);
  const [strategy, setStrategy] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  const getAdvice = () => {
    if (!debts.length) {
      return { type: "generic" };
    }

    const highestInterestLoan = debts.reduce((highest, loan) =>
      Number(loan.interestRate) > Number(highest.interestRate) ? loan : highest
    );

    return {
      type: "loan",
      loanName: highestInterestLoan.name?.trim() || "Unnamed Loan",
      rate: Number(highestInterestLoan.interestRate) || 0,
      extra: Number(extraPayment) || 0,
    };
  };

  const handleGetStrategy = () => {
    setIsLoading(true);
    setStrategy(null);

    timerRef.current = window.setTimeout(() => {
      setStrategy(getAdvice());
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-blue-950">AI debt advisor</h2>
      <p className="mt-1 text-sm text-blue-700">
        Get a focused strategy based on your avalanche payoff plan.
      </p>

      <button
        type="button"
        onClick={handleGetStrategy}
        disabled={isLoading}
        className="mt-5 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Analyzing your debt avalanche..." : "Get AI Strategy"}
      </button>

      {isLoading && (
        <div className="mt-5 flex items-center gap-3 text-sm text-blue-700">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
          Analyzing your debt avalanche...
        </div>
      )}

      {strategy && (
        <div className="mt-5 rounded-xl border border-blue-200 bg-white p-4 text-sm leading-6 text-blue-950">
          {strategy.type === "generic" ? (
            "Add your loans to receive a personalized debt payoff strategy."
          ) : (
            <>
              Your <strong>{strategy.loanName}</strong> has the highest interest
              rate at <strong>{strategy.rate}%</strong>. By aggressively applying
              your extra{" "}
              <strong>
                {strategy.extra.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </strong>{" "}
              toward this specific balance, you mathematically minimize the
              amount of interest the bank can siphon from you. Attack this balance first
              to maximize your cash flow before finishing school in December of this year
              and funding your post-graduation travels! Good Luck!
            </>
          )}
        </div>
      )}
    </section>
  );
}