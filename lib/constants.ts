export const NAV_ITEMS = [
  { label: "Dashboard", href: "/" },
  { label: "Models", href: "/models" },
  { label: "Datasets", href: "/datasets" },
  { label: "Experiments", href: "/experiments" },
  { label: "Deployments", href: "/deployments" },
  { label: "Settings", href: "/settings" },
] as const;

export const ROUTE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/models": "Models",
  "/datasets": "Datasets",
  "/experiments": "Experiments",
  "/deployments": "Deployments",
  "/settings": "Settings",
};

/**
 * Earthy categorical palette — fallback hex values that mirror the
 * `--chart-*` tokens in `app/globals.css`. The charts read the live CSS
 * variables at runtime (see `useChartColors`) so editing a token in the Soffi
 * UI recolors every chart; these hexes are the SSR / no-DOM fallback.
 */
export const FORGE_COLORS = [
  "#2B6B4F", // forest   (--chart-1)
  "#C0593A", // terracotta (--chart-2)
  "#C48E2A", // amber    (--chart-3)
  "#6B8F71", // sage     (--chart-4)
  "#A16B3F", // copper   (--chart-5)
  "#B47267", // clay     (--chart-6)
  "#7A8B3C", // olive    (--chart-7)
  "#8B5A3E", // sienna   (--chart-8)
] as const;
