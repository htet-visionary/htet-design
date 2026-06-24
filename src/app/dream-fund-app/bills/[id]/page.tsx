"use client";

import { useParams, useRouter } from "next/navigation";
import { ScreenHeader } from "@/components/dream-fund/app/ScreenHeader";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { formatCurrency } from "@/lib/dream-fund-app-utils";

export default function DreamFundBillDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getBillById, markBillPaid } = useDreamFundApp();
  const bill = getBillById(params.id);

  if (!bill) {
    return (
      <div className="v-dream-fund-app__screen">
        <ScreenHeader title="Bill not found" backHref="/dream-fund-app/bills" />
      </div>
    );
  }

  const billRecord = bill;

  function handleMarkPaid() {
    markBillPaid(billRecord.id);
    router.push("/dream-fund-app/bills");
  }

  return (
    <div className="v-dream-fund-app__screen">
      <ScreenHeader title={bill.name} backHref="/dream-fund-app/bills" />

      <article className="v-dream-fund-app__hero">
        <p className="v-dream-fund-app__hero-label">Amount due</p>
        <p className="v-dream-fund-app__hero-amount">{formatCurrency(bill.amount)}</p>
      </article>

      <div className="v-dream-fund-app__stat-grid">
        <article className="v-dream-fund-app__stat">
          <p className="v-dream-fund-app__stat-label">Due date</p>
          <p className="v-dream-fund-app__stat-value">
            {new Date(bill.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </article>
        <article className="v-dream-fund-app__stat">
          <p className="v-dream-fund-app__stat-label">Frequency</p>
          <p className="v-dream-fund-app__stat-value v-dream-fund-app__stat-value--cap">
            {bill.frequency}
          </p>
        </article>
      </div>

      {!bill.paid ? (
        <button
          type="button"
          className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green"
          onClick={handleMarkPaid}
        >
          <span className="v-cmp-btn__label">Mark as Paid</span>
        </button>
      ) : (
        <p className="v-dream-fund-app__hero-note">This bill is marked as paid.</p>
      )}
    </div>
  );
}
