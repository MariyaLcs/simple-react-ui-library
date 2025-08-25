import type { Preview } from "@storybook/react";
import { initialize, mswLoader, mswDecorator } from "msw-storybook-addon";
import "../src/styles/tokens.css";
import "../src/styles/tokens.typography.css";
import "../src/styles/base.css";

initialize({ onUnhandledRequest: "bypass" });

export const loaders = [mswLoader];

const customViewports = {
  iphone15: { name: "Small", styles: { width: "393px", height: "852px" } },
  tablet: { name: "Medium", styles: { width: "768px", height: "1024px" } },
  laptop: { name: "Large", styles: { width: "1280px", height: "800px" } },
};

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: customViewports,
      defaultViewport: "laptop",
    },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/ },
    },
    measure: { disabled: false },
    outline: { disabled: false },
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
  mswDecorator,
  (Story, { globals }) => {
    document.documentElement.setAttribute("data-theme", globals.theme);
    return Story();
  },
];
