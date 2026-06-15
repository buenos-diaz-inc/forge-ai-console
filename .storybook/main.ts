import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  async viteFinal(config) {
    // Resolve the `@/*` path alias from tsconfig.json so stories can import
    // `@/components/...` and `@/lib/...` the same way the app does.
    const { default: tsconfigPaths } = await import("vite-tsconfig-paths");
    config.plugins = [...(config.plugins ?? []), tsconfigPaths()];
    return config;
  },
};

export default config;
