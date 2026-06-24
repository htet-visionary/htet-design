"use client";

import Link from "next/link";
import { IllustrationPlaceholder } from "@/components/dream-fund/app/IllustrationPlaceholder";
import { ScreenHeader } from "@/components/dream-fund/app/ScreenHeader";

export default function DreamFundPartnerInvitePage() {
  return (
    <div className="v-dream-fund-app__flow">
      <ScreenHeader title="Save together" backHref="/dream-fund-app/profile" />

      <IllustrationPlaceholder variant="hero" label="Partner invite illustration placeholder" />

      <div>
        <h1 className="v-dream-fund-app__flow-title">Dream together with a partner</h1>
        <p className="v-dream-fund-app__flow-desc">
          Invite someone to save toward shared dreams — Europe trips, home funds, and more.
        </p>
      </div>

      <Link href="/dream-fund-app/partner/dashboard" className="v-cmp-btn v-cmp-btn--md v-cmp-btn--primary-green">
        <span className="v-cmp-btn__label">Send Invite</span>
      </Link>
    </div>
  );
}
