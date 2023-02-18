import { IDefinitionProperty } from "@/common/index.interface";
import { Radio } from "antd";
import React, { FC, useImperativeHandle, useRef, useState } from "react";
type Props = {
  data: boolean;
  prop: IDefinitionProperty
}
const options = [
  { label: 'true', value: true },
  { label: 'false', value: false },
];
const BooleanEditor = React.forwardRef((props: Props, ref: any) => {
  const {data, prop} = props
  const [value, setValue] = useState(data || false)
  const getResult = () => {
    return value
  }
  useImperativeHandle(ref, () => ({
    getResult
  }));
  return <div>
      <Radio.Group options={options} size="small" onChange={e => setValue(e.target.value)} value={value} optionType="button" />
  </div>
})

export default BooleanEditor