import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../src/styles/tokens.css";
import "../src/styles/tokens.typography.css";

initialize({ onUnhandledRequest: "bypass" });

export const loaders = [mswLoader];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/ },
    },
  },
};

export default preview;

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme",
    defaultValue: "light",
    toolbar: {
      icon: "mirror",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
    },
  },
};

export const decorators = [
  (Story, { globals }) => {
    document.documentElement.setAttribute("data-theme", globals.theme);
    return Story();
  },
];
