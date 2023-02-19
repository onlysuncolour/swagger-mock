import { Button, ButtonProps, Tooltip } from "antd";
import { FC } from "react"

type Prop = {
  tooltip: string
} & ButtonProps;
const TooltipButton:FC<Prop> = ({
  tooltip,
  ...restProps
}) => {
  return <Tooltip title={tooltip}>
    <Button {...restProps} />
  </Tooltip>
}

export default TooltipButton