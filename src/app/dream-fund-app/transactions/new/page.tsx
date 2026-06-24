"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ScreenHeader } from "@/components/dream-fund/app/ScreenHeader";
import { dreamFundCategories } from "@/lib/dream-fund-app-data";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";

export default function DreamFundAddTransactionPage() {
  const router = useRouter();
  const { addTransaction } = useDreamFundApp();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>(dreamFundCategories[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = Number.parseFloat(amount);

    if (!Number.isFinite(value) || value <= 0) {
      return;
    }

    addTransaction({
      title: note.trim() || category,
      amount: value,
      type,
      category,
      date,
      note: note.trim() || undefined,
    });

    router.push("/dream-fund-app/transactions");
  }

  return (
    <form className="v-dream-fund-app__screen" onSubmit={handleSubmit}>
      <ScreenHeader title="Add Transaction" backHref="/dream-fund-app/transactions" />

      <SegmentType value={type} onChange={setType} />

      <label className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Amount</span>
        <input
          className="v-dream-fund-app__field-input"
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="0.00"
          required
        />
      </label>

      <label className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Category</span>
        <select
          className="v-dream-fund-app__field-input"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {dreamFundCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Date</span>
        <input
          className="v-dream-fund-app__field-input"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </label>

      <label className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Note</span>
        <input
          className="v-dream-fund-app__field-input"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="What was this for?"
        />
      </label>

      <button type="submit" className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green">
        <span className="v-cmp-btn__label">Save Transaction</span>
      </button>
    </form>
  );
}

function SegmentType({
  value,
  onChange,
}: {
  value: "expense" | "income";
  onChange: (value: "expense" | "income") => void;
}) {
  return (
    <div className="v-dream-fund-app__segments">
      <button
        type="button"
        className={[
          "v-dream-fund-app__segment",
          value === "expense" ? "v-dream-fund-app__segment--active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => onChange("expense")}
      >
        Expense
      </button>
      <button
        type="button"
        className={[
          "v-dream-fund-app__segment",
          value === "income" ? "v-dream-fund-app__segment--active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => onChange("income")}
      >
        Income
      </button>
    </div>
  );
}
