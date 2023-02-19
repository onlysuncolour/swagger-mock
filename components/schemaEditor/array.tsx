import { IDefinitionProperty, IUuidRef, TUuid } from "@/common/index.interface";
import { Button, Form, Space } from "antd";
import _ from "lodash";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from './index.module.less'
import SchemaEditor from ".";
type Props = {
  data: any[];
  prop: IDefinitionProperty
}
type TArrayValue = {
  value: any;
  uuid: TUuid
}
const ArrayEditor = React.forwardRef((props: Props, ref: any) => {
  const {data, prop} = props
  const [values, setValues] = useState<TArrayValue[]>([])
  const propRef = useRef<IUuidRef>({});
  const [rendered, setRendered] = useState(false)
  useEffect(() => {
    if (data) {
      try {
        const _values:TArrayValue[] = data.map(d => ({value: d, uuid: _.uniqueId()}))
        if (_values.length > 0) {
          setValues(_values)
          _values.forEach(({uuid}) => {
            propRef.current[uuid] = {current: null}
          })
        }
      } catch (error) {}
    }
    setRendered(true)
  }, [])
  const getResult = () => {
    return values.map(({uuid}) => {
      return propRef.current[uuid].current?.getResult()
    })
  }
  useImperativeHandle(ref, () => ({
    getResult
  }));

  const addProp = (uuid) => {
    const _values:TArrayValue[] = [...values, {value: null, uuid}]
    propRef.current[uuid] = {current: null}
    setValues(_values)
  }
  const rmProp = (i) => {
    const _values = _.cloneDeep(values)
    _values.splice(i, 1)
    setValues(_values)
  }
  
  return <div className={styles.arrayRoot}>
    {
      rendered && <Form initialValues={{array: values}}>
        <Form.List name="array">
          {(fields, { add, remove }) => (
            <>{fields.map(({ key, name, ...restField }, index, arr) => (
              <Space key={key} style={{display: 'flex'}} align="baseline">
                <Form.Item {...restField}>
                  <SchemaEditor
                    data={values[index].value}
                    ref={propRef.current[values[index].uuid]}
                    prop={prop.children as IDefinitionProperty}
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
      </Form>
    }
    {/* <div className={styles.arrayContent}>
      {values.map((v, i) => <div key={v.uuid} className={styles.arrayItem}>
        <div className={styles.arrayItemValue}>
          <SchemaEditor data={v.value} ref={propRef.current[v.uuid]} prop={prop.children as IDefinitionProperty}></SchemaEditor>
        </div>
        <Button className={styles.commonRmBtn} onClick={() => rmProp(i)}>移除</Button>
      </div>
      )}
    </div>
    <Button className={styles.commonAddBtn} size="small" onClick={addProp}>add</Button> */}

  </div>
})

export default ArrayEditor