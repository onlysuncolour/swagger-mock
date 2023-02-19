import { IDefinitionProperty } from "@/common/index.interface";
import { Form, Input } from "antd";
import React, { useImperativeHandle, useState } from "react";
type Props = {
  data: any;
  prop: IDefinitionProperty
}
const DateEditor = React.forwardRef((props: Props, ref: any) => {
  const {data, prop} = props
  const [value, setValue] = useState(() => data || '')
  const getResult = () => {
    return value
  }
  useImperativeHandle(ref, () => ({
    getResult
  }));
  return <Form.Item>
    <Input value={value} onChange={e => setValue(e.target.value)} />
  </Form.Item>
})

export default DateEditor