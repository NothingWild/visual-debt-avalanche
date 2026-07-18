export function calculateAvalanchePayoff(debts, monthlyExtraPayment) {
  const remaining = debts.map((debt) => ({
    ...debt,
    balance: Math.max(0, debt.balance),
  }));

  const snapshots = [];
  let month = 0;

  while (remaining.some((debt) => debt.balance > 0)) {
    month += 1;

    // Apply one month of interest, then each active debt's minimum payment.
    let avalanchePayment = monthlyExtraPayment;

    for (const debt of remaining) {
      if (debt.balance <= 0) {
        avalanchePayment += debt.minPayment;
        continue;
      }

      const monthlyRate = debt.interestRate / 100 / 12;
      debt.balance += debt.balance * monthlyRate;

      const payment = Math.min(debt.minPayment, debt.balance);
      debt.balance -= payment;

      // A debt paid off this month frees its minimum payment immediately.
      if (debt.balance === 0) {
        avalanchePayment += debt.minPayment;
      }
    }

    // Apply all available extra money to debts in descending interest-rate order.
    const targets = remaining
      .filter((debt) => debt.balance > 0)
      .sort((a, b) => b.interestRate - a.interestRate);

    for (const debt of targets) {
      if (avalanchePayment <= 0) break;

      const payment = Math.min(avalanchePayment, debt.balance);
      debt.balance -= payment;
      avalanchePayment -= payment;
    }

    snapshots.push({
      month,
      balances: Object.fromEntries(
        remaining.map((debt) => [debt.id, Math.max(0, debt.balance)])
      ),
    });
  }

  return snapshots;
}