import { IDefinitionProperty, IUuidRef, TUuid } from "@/common/index.interface";
import { Button, Form, Input, message, Space, Tag } from "antd";
import _ from 'lodash'
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import SchemaEditor from ".";
import TypeTag from "../base/typeTag";
import styles from './index.module.less'
type Props = {
  data: any;
  prop: IDefinitionProperty
}
type TValue = {
  key: string;
  value: any;
  uuid: TUuid
}
const UnstableObjecEditor = React.forwardRef((props: Props, ref: any) => {
  const {data, prop} = props
  const [rendered, setRendered] = useState(false)
  const [values, setValues] = useState<TValue[]>([])
  const propRef = useRef<IUuidRef>({});
  useEffect(() => {
    if (data) {
      try {
        // const _values:TValue[] = Object.entries(data).map(v => [...v, _.uniqueId()])
        const _values:TValue[] = Object.entries(data).map(v => ({key: v[0], value: v[1], uuid: _.uniqueId()}))
        if (_values.length > 0) {
          setValues(_values)
          _values.map(v => v[2]).forEach((uuid) => {
            propRef.current[uuid] = {current: null}
          })
        }
      } catch (error) {}
    }
    setRendered(true)
  }, [])
  const getResult = () => {
    const result:any = {}
    let flag = true
    values.forEach((v, i) => {
      const key = v.key
      if (result[key]) {
        flag = false
      } else {
        result[key] = propRef.current[v.uuid].current?.getResult()
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
  const addProp = (uuid) => {
    const _values:TValue[] = [...values, {key: '', value: null, uuid}]
    propRef.current[uuid] = {current: null}
    setValues(_values)
  }
  const rmProp = (i) => {
    const _values = _.cloneDeep(values)
    _values.splice(i, 1)
    setValues(_values)
  }
  const onChangePropName = (i, v) => {
    const _values = _.cloneDeep(values)
    _values[i].key = v
    setValues(_values)
  }
  return <div className={styles.unstableObjectRoot}>
    {
      rendered && <Form labelAlign="left" initialValues={{unstableObject: values}} className={styles.unstableObjectForm}>
        <div className={styles.unstableObjectTip}>
          <TypeTag type="object" />
        </div>
        <div>
          <Form.List name="unstableObject">
            {(fields, { add, remove }) => (
              <>{fields.map(({ key, name, ...restField }, index, arr) => (
                <Space key={key} style={{display: 'flex'}} align="baseline">
                  <Form.Item name={[name, 'key']} {...restField}>
                    <Input onChange={(e) => onChangePropName(index, e.target.value)}></Input>
                  </Form.Item>
                  {": "}
                  <Form.Item {...restField}>
                    <SchemaEditor
                      data={values[index].value}
                      ref={propRef.current[values[index].uuid]}
                      prop={prop.unstableProperties as IDefinitionProperty}
                    />
                  </Form.Item>
                  <Button
                    className={styles.commonRmBtn}
                    onClick={() => {
                      rmProp(index)
                      remove(index)
                    }}
                  >
                    移除
                  </Button>
                </Space>
              ))}
              <Form.Item>
                <Button
                  size="small"
                  onClick={() => {
                    const uuid = _.uniqueId()
                    addProp(uuid)
                    add({
                      key: '',
                      value: null,
                      uuid
                    })
                  }}
                  className={styles.commonAddBtn}
                >
                  add
                </Button>
              </Form.Item>
              </>
            )}

          </Form.List>
        </div>
      </Form>
    }
  </div>
})

export default UnstableObjecEditor