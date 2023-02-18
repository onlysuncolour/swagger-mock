import { IDefinitionProperty } from "@/common/index.interface";
import React, { FC, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import SchemaEditor from ".";
type Props = {
  data: any;
  prop: IDefinitionProperty
}
const ObjecEditor = React.forwardRef((props: Props, ref: any) => {
  const {data, prop} = props
  const propRef = useRef<any>({});
  const [propKeys, setPropKeys] = useState<string[]>([])
  useEffect(() => {
    const _propKeys = Object.keys(prop.properties as any)
    _propKeys.forEach(key => {
      propRef.current[key] = {current: null}
    })
    setPropKeys(_propKeys)
  }, [])
  const getResult = () => {
    const result:any = {}
    propKeys.forEach(key => {
      result[key] = propRef.current[key].current.getResult()
    })
    return result
  }
  useImperativeHandle(ref, () => ({
    getResult
  }));
  return <div>
    {
      propKeys.map(key => <div key={key}>
        <span>{key}: </span>
        <SchemaEditor
          data={data?.[key]}
          prop={prop.properties?.[key] as IDefinitionProperty}
          ref={propRef.current[key]}
        />
      </div>)
    }
  </div>
})

export default ObjecEditor