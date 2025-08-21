// src/components/screens/NotificationScreen.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { http, HttpResponse } from "msw";
import { within, expect, userEvent } from "@storybook/test";

import NotificationScreen from "./NotificationScreen";
import { makeStore } from "../../lib/store";

const meta = {
  component: NotificationScreen,
  title: "Screens/NotificationScreen",
  decorators: [
    (Story) => (
      <Provider store={makeStore()}>
        <Story />
      </Provider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // wait for items (any "Mark Read" button)
    const markReadButtons = await canvas.findAllByRole("button", {
      name: /Mark Read/i,
    });

    // click first → should flip to "Mark Unread"
    await userEvent.click(markReadButtons[0]);
    await expect(
      await canvas.findByRole("button", { name: /Mark Unread/i })
    ).toBeInTheDocument();
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        // wildcard matches ?userId=1
        http.get("*/todos", () => new HttpResponse(null, { status: 403 })),
      ],
    },
  },
};
