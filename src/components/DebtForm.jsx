import React from "react";

export default function DebtForm({ debts, setDebts, setExtraPayment }) {
  const updateDebt = (id, field, value) => {
    setDebts((currentDebts) =>
      currentDebts.map((debt) =>
        debt.id === id
          ? { ...debt, [field]: field === "name" ? value : Number(value) }
          : debt
      )
    );
  };

  const addNewLoan = () => {
    setDebts((currentDebts) => [
      ...currentDebts,
      {
        id: crypto.randomUUID(),
        name: "",
        balance: 0,
        interestRate: 0,
        minPayment: 0,
      },
    ]);
  };

  const deleteDebt = (id) => {
    setDebts((current) => current.filter((debt) => debt.id !== id));
  };

  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Loans</h2>
        <p className="mt-1 text-sm text-slate-500">
          Add each loan to build your payoff plan.
        </p>
      </div>

      <div className="space-y-4">
        {debts.map((debt, index) => (
          <div
            key={debt.id}
            className="relative grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
          >

            <button
              type="button"
              onClick={() => deleteDebt(debt.id)}
              className="absolute right-3 top-2 text-sm font-bold text-red-400 aria-label={`Remove ${debt.name || `loan ${index + 1}`}`}"
            >
              ✕
            </button>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">
                Name
              </span>
              <input
                type="text"
                value={debt.name}
                onChange={(event) =>
                  updateDebt(debt.id, "name", event.target.value)
                }
                placeholder={`Loan ${index + 1}`}
                className="w-full rounded-lg border border-gray-300 p-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">
                Balance
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={debt.balance}
                onChange={(event) =>
                  updateDebt(debt.id, "balance", event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">
                Interest Rate (%)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={debt.interestRate}
                onChange={(event) =>
                  updateDebt(debt.id, "interestRate", event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">
                Minimum Payment
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={debt.minPayment}
                onChange={(event) =>
                  updateDebt(debt.id, "minPayment", event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addNewLoan}
        className="mt-5 rounded-lg border border-indigo-200 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
      >
        + Add New Loan
      </button>

      <div className="mt-6 border-t border-slate-200 pt-6">
        <label className="block max-w-sm">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Monthly Extra Payment
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            defaultValue={0}
            onChange={(event) => setExtraPayment(Number(event.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>
      </div>
    </section>
  );
}