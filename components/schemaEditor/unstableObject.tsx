import { IDefinitionProperty } from "@/common/index.interface";
import { Button, Input, message } from "antd";
import _ from 'lodash'
import React, { FC, useEffect, useImperativeHandle, useRef, useState } from "react";
import SchemaEditor from ".";
type Props = {
  data: any;
  prop: IDefinitionProperty
}
type TValue = [string, any, string]
const UnstableObjecEditor = React.forwardRef((props: Props, ref: any) => {
  const {data, prop} = props
  const [values, setValues] = useState<TValue[]>([])
  const propRef = useRef<any>({});
  useEffect(() => {
    if (data) {
      try {
        const _values:TValue[] = Object.entries(data).map(v => [...v, _.uniqueId()])
        if (_values.length > 0) {
          setValues(_values)
          _values.map(v => v[2]).forEach((uuid) => {
            propRef.current[uuid] = {current: null}
          })
        }
      } catch (error) {}
    }
  }, [])
  const getResult = () => {
    const result:any = {}
    let flag = true
    values.forEach((v, i) => {
      const key = v[0]
      if (result[key]) {
        flag = false
      } else {
        result[key] = propRef.current[v[2]].current.getResult()
      }
    })
    if ((flag as boolean) === false) {
      message.error('不能有同名属性！')
      throw('error')
    }
    return result
  }
  useImperativeHandle(ref, () => ({
    getResult
  }));
  const addProp = () => {
    const uuid =  _.uniqueId()
    const _values:TValue[] = [...values, ['', null, uuid]]
    propRef.current[uuid] = {current: null}
    setValues(_values)
  }
  const rmProp = (i) => {
    const _values = _.cloneDeep(values)
    _values.splice(i, 1)
    propRef.current.splice(i, 1)
    setValues(_values)
  }
  const onChangePropName = (i, v) => {
    const _values = _.cloneDeep(values)
    _values[i][0] = v
    setValues(_values)
  }
  return <div>
    <div>
      {
        values.map((v, i) => <div key={v[2]}>
          <Input value={v[0]} onChange={e => onChangePropName(i, e.target.value)} />
          <SchemaEditor data={v[1]} ref={propRef.current[i]} prop={prop.unstableProperties as IDefinitionProperty}></SchemaEditor>
          <Button onClick={() => rmProp(i)}>移除</Button>
        </div>)
      }
    </div>
    <Button size="small" onClick={addProp}>add</Button>
  </div>
})

export default UnstableObjecEditor