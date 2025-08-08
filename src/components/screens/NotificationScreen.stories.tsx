import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import NotificationScreen from "./NotificationScreen";
import store from "../../lib/store";

const meta = {
  component: NotificationScreen,
  title: "Screens/NotificationScreen",
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = {};
