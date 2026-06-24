"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";
import { daysUntil, formatCurrency } from "@/lib/dream-fund-app-utils";

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

export default function DreamFundBillsPage() {
  const { state } = useDreamFundApp();

  const calendar = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dueDays = new Set(
      state.bills
        .filter((bill) => {
          const due = new Date(bill.dueDate);
          return due.getMonth() === month && due.getFullYear() === year;
        })
        .map((bill) => new Date(bill.dueDate).getDate()),
    );

    const cells: Array<{ day: number | null; marked: boolean }> = [];

    for (let i = 0; i < firstDay; i += 1) {
      cells.push({ day: null, marked: false });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({ day, marked: dueDays.has(day) });
    }

    return {
      label: now.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      cells,
    };
  }, [state.bills]);

  const upcoming = [...state.bills]
    .filter((bill) => !bill.paid)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="v-dream-fund-app__screen">
      <header>
        <h1 className="v-dream-fund-app__section-title">Bills</h1>
        <p className="v-dream-fund-app__section-desc">Calendar view with upcoming must-pay reminders.</p>
      </header>

      <section className="v-dream-fund-app__calendar">
        <h2 className="v-dream-fund-app__calendar-title">{calendar.label}</h2>
        <div className="v-dream-fund-app__calendar-grid">
          {weekdays.map((day) => (
            <span key={day} className="v-dream-fund-app__calendar-weekday">
              {day}
            </span>
          ))}
          {calendar.cells.map((cell, index) => (
            <span
              key={`${cell.day ?? "blank"}-${index}`}
              className={[
                "v-dream-fund-app__calendar-day",
                cell.marked ? "v-dream-fund-app__calendar-day--marked" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {cell.day ?? ""}
            </span>
          ))}
        </div>
      </section>

      <section>
        <p className="v-dream-fund-app__group-label">Upcoming bills</p>
        <ul className="v-dream-fund-app__bill-list">
          {upcoming.map((bill) => (
            <li key={bill.id}>
              <Link href={`/dream-fund-app/bills/${bill.id}`} className="v-dream-fund-app__list-card">
                <div className="v-dream-fund-app__list-card-row">
                  <div>
                    <p className="v-dream-fund-app__list-card-title">{bill.name}</p>
                    <p className="v-dream-fund-app__list-card-meta">
                      Due in {Math.max(0, daysUntil(bill.dueDate))} days
                    </p>
                  </div>
                  <span className="v-dream-fund-app__bill-amount">{formatCurrency(bill.amount)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
