import React, { useState } from "react";
import SelectBox from "@/components/common/SelectBox/SelectBox";

export default {
  title: "Common/SelectBox",
  component: SelectBox,
  argTypes: {
    placeholder: {
      control: "text",
      description: "text",
    },
  },
};

const Template = (args) => {
  const [selectedValue, setSelectedValue] = useState(args.selectedValue || "");

  const handleChange = (value) => {
    setSelectedValue(value);
    args.onChange && args.onChange(value);
  };

  return (
    <SelectBox
      {...args}
      selectedValue={selectedValue}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: "option1", label: "옵션 1" },
    { value: "option2", label: "옵션 2" },
    { value: "option3", label: "옵션 3" },
    { value: "option4", label: "옵션 4" },
    { value: "option5", label: "옵션 5" },
  ],
  selectedValue: "",
  placeholder: "선택하세요",
};
