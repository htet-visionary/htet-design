"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useDreamFundApp } from "@/lib/dream-fund-app-context";

export default function DreamFundSignUpPage() {
  const router = useRouter();
  const { completeSignUp } = useDreamFundApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    completeSignUp(name.trim() || "Alex Morgan", email.trim() || "alex@example.com");
    router.push("/dream-fund-app");
  }

  return (
    <form className="v-dream-fund-app__screen" onSubmit={handleSubmit}>
      <header>
        <h1 className="v-dream-fund-app__section-title">Create your account</h1>
        <p className="v-dream-fund-app__section-desc">Start funding dreams with a supportive plan.</p>
      </header>

      <label className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Full name</span>
        <input
          className="v-dream-fund-app__field-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Alex Morgan"
          required
        />
      </label>

      <label className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Email</span>
        <input
          className="v-dream-fund-app__field-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />
      </label>

      <label className="v-dream-fund-app__field">
        <span className="v-dream-fund-app__field-label">Password</span>
        <input
          className="v-dream-fund-app__field-input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          required
        />
      </label>

      <button type="submit" className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green">
        <span className="v-cmp-btn__label">Create Account</span>
      </button>

      <div className="v-dream-fund-app__social-row">
        <button type="button" className="v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green">
          <span className="v-cmp-btn__label">Google</span>
        </button>
        <button type="button" className="v-cmp-btn v-cmp-btn--md v-cmp-btn--secondary-green">
          <span className="v-cmp-btn__label">Facebook</span>
        </button>
      </div>
    </form>
  );
}
