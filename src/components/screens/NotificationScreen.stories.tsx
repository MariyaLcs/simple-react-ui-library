import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { http, HttpResponse } from "msw";

import { MockedState } from "../organisms/NotificationList/NotificationList.stories";

import NotificationScreen from "./NotificationScreen";
import store from "../../lib/store";
import {
  fireEvent,
  waitFor,
  within,
  waitForElementToBeRemoved,
  expect,
  userEvent,
} from "@storybook/test";
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // wait for the list to load (any one button is fine)
    const markReadButtons = await canvas.findAllByRole("button", {
      name: /Mark Read/i,
    });
    await new Promise((r) => setTimeout(r, 1000));
    // click the first "Mark Read"
    await userEvent.click(markReadButtons[0]);

    // expect it to flip to "Mark Unread"
    await expect(
      await canvas.findByRole("button", { name: /Mark Unread/i })
    ).toBeInTheDocument();
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
