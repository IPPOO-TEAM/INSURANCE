export const BILLING = {
  dailyPerProduct: 500,
  accountFee: 1000,
  cardFee: 500,
};

/**
 * Returns the number of days in the current month for a given date.
 */
export function getDaysInMonth(date: Date): number {
  return new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getDate();
}

export function computeBilling(contracts: any[], profile: any, now = new Date()) {
  const daysInMonth = getDaysInMonth(now);
  const perProduct = BILLING.dailyPerProduct * daysInMonth;
  const active = (contracts ?? []).filter((c) => c.status === "active");
  const items: any[] = active.map((c) => ({
    kind: "insurance",
    label: `Assurance — ${c.product}`,
    contractId: c.id,
    perDay: BILLING.dailyPerProduct,
    days: daysInMonth,
    amount: perProduct,
  }));
  items.push({ kind: "account_fee", label: "Frais de gestion de compte", amount: BILLING.accountFee });
  if (profile?.cardActive) {
    items.push({ kind: "card_fee", label: "Carte membre IPPOO", amount: BILLING.cardFee });
  }
  const total = items.reduce((s, it) => s + it.amount, 0);
  return {
    items,
    total,
    perInsurance: perProduct,
    accountFee: BILLING.accountFee,
    cardFee: BILLING.cardFee,
    activeCount: active.length,
    daysInMonth,
    cycle: "mensuel",
  };
}
