import { IDefinitionProperty } from "@/common/index.interface";
import { Button } from "antd";
import _ from "lodash";
import React, { FC, useEffect, useImperativeHandle, useRef, useState } from "react";
import SchemaEditor from ".";
type Props = {
  data: any[];
  prop: IDefinitionProperty
}
type TArrayValue = [any, string]
const ArrayEditor = React.forwardRef((props: Props, ref: any) => {
  const {data, prop} = props
  const [values, setValues] = useState<TArrayValue[]>([])
  const propRef = useRef<any>({});
  useEffect(() => {
    if (data) {
      try {
        const _values:TArrayValue[] =data.map(d => [d, _.uniqueId()])
        if (_values.length > 0) {
          setValues(_values)
          _values.map(v => v[1]).forEach(uuid => {
            propRef.current[uuid] = {current: null}
          })
        }
      } catch (error) {}
    }
  }, [])
  const getResult = () => {
    return values.map(v => v[1]).map(uuid => {
      return propRef.current[uuid].current.getResult()
    })
  }
  useImperativeHandle(ref, () => ({
    getResult
  }));

  const addProp = () => {
    const uuid = _.uniqueId()
    const _values:TArrayValue[] = [...values, [null, uuid]]
    propRef.current[uuid] = {current: null}
    setValues(_values)
  }
  const rmProp = (i) => {
    const _values = _.cloneDeep(values)
    _values.splice(i, 1)
    setValues(_values)
  }
  
  return <div>
    <div>
      {values.map((v, i) => <div key={v[1]}>
        <SchemaEditor data={v[0]} ref={propRef.current[v[1]]} prop={prop.children as IDefinitionProperty}></SchemaEditor>
        <Button onClick={() => rmProp(i)}>移除</Button>
      </div>
      )}
    </div>
    <Button size="small" onClick={addProp}>add</Button>

  </div>
})

export default ArrayEditor