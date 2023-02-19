import { Tag } from "antd";
import { FC } from "react"

type Prop = {
  type: "string" | "integer" | "object" | "array" | "file" | "number" | "boolean" | undefined;
} ;

const tagColorMap = {
  string: 'gold',
  integer: 'green',
  object: 'red',
  array: 'blue',
  file: 'lime',
  number: 'green',
  boolean: 'purple',
}
const defaultTagColor = 'gray'
const tagTextMap = {
  string: 'str',
  integer: 'num',
  object: 'obj',
  array: 'arr',
  file: 'file',
  number: 'num',
  boolean: 'bool',
}
const defaultTagText = 'null'
const TypeTag:FC<Prop> = ({
  type
}) => {
  const text = type ? tagTextMap[type] : defaultTagText
  const color = type ? tagColorMap[type] : defaultTagColor
  return <Tag color={color}>{text}</Tag>
}

export default TypeTag