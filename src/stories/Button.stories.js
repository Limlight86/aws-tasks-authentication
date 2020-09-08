import React from "react";
import Button from "../components/Button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args}>{args.text}</Button>;

export const Basic = Template.bind({});

Basic.args = {
  text: "Click Me",
  primary: false,
  fullWidth: false,
  round: false,
  shadow: false,
  size: "",
  onClick: () => window.alert("clicked"),
};

export const FullWidthPrimary = Template.bind({});

FullWidthPrimary.args = {
  text: "Full Width",
  primary: true,
  fullWidth: true,
  onClick: () => window.alert("clicked"),
};

export const SmallX = Template.bind({});

SmallX.args = {
  text: "×",
  size: "small",
  onClick: () => window.alert("clicked"),
};

export const LargePrimaryRoundShadowPlus = Template.bind({});

LargePrimaryRoundShadowPlus.args = {
  text: "+",
  size: "large",
  primary: true,
  round: true,
  shadow: true,
  onClick: () => window.alert("clicked"),
};
