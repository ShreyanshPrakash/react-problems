import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "@/MachineCodeProblems/Accordion/Accordion";

/*
    ====================================================== [Setup for Component]======================================================
*/
const meta: Meta<typeof Accordion> = {
  title: "Example/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    accordionConfig: {
      control: {
        type: "radio",
        options: []
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/*
    ====================================================== [Write Stories]======================================================
*/

const SAMPLE_DATA = [
  {
    titleText: "Accordion 1",
    name: "accordion1",
    Component: () => {},
  },
];

export const Default: Story = {
  args: {},
};

export const SingleAccordion: Story = {
  args: {},
  render: (args: any) => <Accordion accordionConfig={SAMPLE_DATA} />,
};
