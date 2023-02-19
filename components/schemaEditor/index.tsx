import { IDefinitionProperty, TEditorRefCurrent } from "@/common/index.interface";
import React, { FC, useImperativeHandle, useMemo, useRef } from "react";
import ArrayEditor from "./array";
import BooleanEditor from "./boolean";
import CommonEditor from "./common";
import NumberEditor from "./number";
import ObjecEditor from "./object";
import StringEditor from "./string";
import UnstableObjecEditor from "./unstableObject";
type Props = {
  data: any;
  prop: IDefinitionProperty;
}

const SchemaEditor = React.forwardRef((props: Props, ref: any) => {
  const {
    data, prop
  } = props
  const propRef = useRef<TEditorRefCurrent>();
  const getResult = () => {
    return propRef.current?.getResult()
  }
  useImperativeHandle(ref, () => ({
    getResult
  }));
  const Comp = useMemo<FC<any>>(() => {
    switch (prop.type) {
      case 'array':
        return ArrayEditor;
      case 'boolean':
        return BooleanEditor;
      case 'integer':
      case 'number':
        return NumberEditor;
      case 'object':
        if (prop.unstableProperties) {
          return UnstableObjecEditor
        }
        return ObjecEditor;
      case 'string':
        return StringEditor;
      default:
        return CommonEditor;
    }
  }, [prop.type])
  return <Comp prop={prop} data={data} ref={propRef} />
})

export default SchemaEditor