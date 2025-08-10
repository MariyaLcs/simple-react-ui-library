import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { http, HttpResponse } from "msw";

import { MockedState } from "../organisms/NotificationList/NotificationList.stories";

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

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos", () =>
          HttpResponse.json(MockedState.notifications)
        ),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          "https://jsonplaceholder.typicode.com/todos",
          () => new HttpResponse(null, { status: 403 })
        ),
      ],
    },
  },
};
