import { IDefinitionProperty } from "@/common/index.interface";
import { Input } from "antd";
import React, { FC, useImperativeHandle, useRef, useState } from "react";
type Props = {
  data: string;
  prop: IDefinitionProperty
}
const StringEditor = React.forwardRef((props: Props, ref: any) => {
  const {data, prop} = props
  const [value, setValue] = useState(() => data || '')
  // const propRef = useRef();
  const getResult = () => {
    return value
  }
  useImperativeHandle(ref, () => ({
    getResult
  }));
  return <Input value={value} onChange={e => setValue(e.target.value)} />
})

export default StringEditor