import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { fn } from "@storybook/test";

import Notification from "./Notification";
import type { NotificationData } from "../../../types";

export const ActionsData = {
  onToggleRead: fn(),
  onDismiss: fn(),
};

const meta = {
  component: Notification,
  title: "Molecules/Notification",
  tags: ["autodocs"],
  // Exclude our helper data from being treated as stories
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unread: Story = {
  args: {
    notification: {
      id: "1",
      message: "You have a new follower!",
      read: false,
    } as NotificationData,
  },
};

export const Read: Story = {
  args: {
    notification: {
      ...Unread.args!.notification,
      read: true,
    },
  },
};

export const Dismissable: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return <></>;

    return (
      <Notification
        {...args}
        onDismiss={(id) => {
          action("onDismiss")(id);
          setVisible(false);
        }}
      />
    );
  },
  args: {
    notification: {
      id: "1",
      message: "Session expiring soon",
      read: false,
    } as NotificationData,
  },
};
