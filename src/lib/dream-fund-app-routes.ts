export const dreamFundAppBase = "/dream-fund-app";

const flowRoutePatterns = [
  "/onboarding",
  "/sign-up",
  "/goals/new",
  "/transactions/new",
  "/achievement",
];

export function isDreamFundFlowRoute(pathname: string): boolean {
  if (!pathname.startsWith(dreamFundAppBase)) {
    return false;
  }

  const subpath = pathname.slice(dreamFundAppBase.length);

  if (subpath === "/partner") {
    return true;
  }

  if (flowRoutePatterns.some((pattern) => subpath === pattern || subpath.startsWith(`${pattern}/`))) {
    return true;
  }

  if (subpath.match(/^\/goals\/[^/]+$/) && !subpath.endsWith("/new") && !subpath.endsWith("/empty")) {
    return true;
  }

  if (subpath.match(/^\/bills\/[^/]+$/)) {
    return true;
  }

  if (subpath.startsWith("/profile/settings")) {
    return true;
  }

  return false;
}

export function shouldShowDreamFundTabBar(pathname: string): boolean {
  return !isDreamFundFlowRoute(pathname);
}

export function shouldShowDreamFundHeader(pathname: string): boolean {
  if (!pathname.startsWith(dreamFundAppBase)) {
    return false;
  }

  const subpath = pathname.slice(dreamFundAppBase.length);

  return (
    subpath !== "/onboarding" &&
    subpath !== "/sign-up" &&
    subpath !== "/achievement" &&
    subpath !== "/partner" &&
    !subpath.match(/^\/goals\/[^/]+$/) &&
    !subpath.startsWith("/goals/new") &&
    !subpath.match(/^\/bills\/[^/]+$/) &&
    !subpath.startsWith("/transactions/new") &&
    !subpath.startsWith("/profile/settings")
  );
}

export function isDreamFundPartnerRoute(pathname: string): boolean {
  return pathname.startsWith(`${dreamFundAppBase}/partner`);
}
