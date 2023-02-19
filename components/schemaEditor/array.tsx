import { IDefinitionProperty, IUuidRef, TUuid } from "@/common/index.interface";
import { Button, Form, Space } from "antd";
import _ from "lodash";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from './index.module.less'
import SchemaEditor from ".";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import TooltipButton from "../base/tooltipButton";
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
      rendered && <Form initialValues={{array: values}} labelAlign="left">
        <Form.List name="array">
          {(fields, { add, remove }) => (
            <>{fields.map(({ key, name, ...restField }, index, arr) => (
              <Space key={key} className={styles.arrayItem} align="baseline">
                <TooltipButton
                  tooltip="移除 array item"
                  className={styles.commonRmBtn}
                  onClick={() => {
                    rmProp(index)
                    remove(index)
                  }}
                  size="small"
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                />
                <Form.Item {...restField}>
                  <SchemaEditor
                    data={values[index].value}
                    ref={propRef.current[values[index].uuid]}
                    prop={prop.children as IDefinitionProperty}
                  />
                </Form.Item>
              </Space>
            ))}
            <Form.Item>
              <TooltipButton
                size="small"
                onClick={() => {
                  const uuid = _.uniqueId()
                  addProp(uuid)
                  add({
                    value: null,
                    uuid
                  })
                }}
                type="text"
                tooltip="add array item"
                icon={<PlusCircleOutlined />}
                className={styles.commonAddBtn}
              />
            </Form.Item>
            </>
          )}

        </Form.List>
      </Form>
    }
  </div>
})

export default ArrayEditor