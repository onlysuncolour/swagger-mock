import { IDefinitionProperty } from "@/common/index.interface";
import { Form, InputNumber } from "antd";
import React, { useImperativeHandle, useState } from "react";
type Props = {
  data: number;
  prop: IDefinitionProperty
}
const NumberEditor = React.forwardRef((props: Props, ref: any) => {
  const {data, prop} = props
  const [value, setValue] = useState<number>(() => data)
  const getResult = () => {
    return value
  }
  useImperativeHandle(ref, () => ({
    getResult
  }));
  return <Form.Item>
    <InputNumber value={value} onChange={v => setValue(v as number)} />
  </Form.Item>
})

export default NumberEditor