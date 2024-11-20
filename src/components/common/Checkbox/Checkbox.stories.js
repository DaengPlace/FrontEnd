import React, { useState } from "react";
import Checkbox from "./Checkbox";

export default {
  title: "Common/Checkbox",
  component: Checkbox,
};

const Template = (args) => {
  const [isChecked, setIsChecked] = useState(args.isChecked);
  const handleChange = () => setIsChecked(!isChecked);

  return <Checkbox {...args} isChecked={isChecked} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  isChecked: false,
  label: "체크박스",
};
