import { Tag, Typography } from "antd";
import { FC } from "react"
import TypeTag from "./typeTag";

type Prop = {
  label: string
  type: "string" | "integer" | "object" | "array" | "file" | "number" | "boolean" | undefined;
}
const FormLabel:FC<Prop> = ({
  label,
  type
}) => {
  return <span>
    <Typography.Text ellipsis={{tooltip: `${label}, ${type}`}} style={{maxWidth: '100px'}}>{label}</Typography.Text>
    <TypeTag type={type} />
  </span>
}

export default FormLabel