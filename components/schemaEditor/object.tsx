import { IDefinitionProperty, IUuidRef } from "@/common/index.interface";
import { Form, Tag } from "antd";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import SchemaEditor from ".";
import FormLabel from "../base/formLabel";
import TypeTag from "../base/typeTag";
import styles from './index.module.less'
type Props = {
  data: any;
  prop: IDefinitionProperty
}
const ObjecEditor = React.forwardRef((props: Props, ref: any) => {
  const {data, prop} = props
  const propRef = useRef<IUuidRef>({});
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
      result[key] = propRef.current[key].current?.getResult()
    })
    return result
  }
  useImperativeHandle(ref, () => ({
    getResult
  }));
  return <div className={styles.objectRoot}>
    <Form className={styles.objectForm} labelAlign="left">
      <div className={styles.objectTip}>
        <TypeTag type='object' />
      </div>
      <div>
        {
          propKeys.map(key => 
            <Form.Item
              key={key}
              labelCol={{ span: 6 }}
              label={
                <FormLabel label={key} type={prop.properties?.[key]?.type}></FormLabel>
              }
            >
              <SchemaEditor
                data={data?.[key]}
                prop={prop.properties?.[key] as IDefinitionProperty}
                ref={propRef.current[key]}
                />
            </Form.Item>
          )
        }
      </div>
    </Form>
  </div>
})

export default ObjecEditor