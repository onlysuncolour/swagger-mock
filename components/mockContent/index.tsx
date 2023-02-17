import { IDefinitionFile, IMockPathData, IPath } from "@/common/index.interface"
import { FC, useState } from "react"
import styles from './index.module.less'
import { Button, Input, message, Radio, Switch } from "antd";
import { formatSearchToObj } from "@/common/utils";

const {TextArea} = Input
type Prop = {
  mock: IMockPathData;
  defs: IDefinitionFile;
  path: IPath
  onRemoveMock: (cb: any) => void
  onSaveMock: (v, cb: any) => void
}
const options = [
  { label: 'schema', value: 'schema' },
  { label: 'json', value: 'json' },
];
const MockContent:FC<Prop> = ({
  mock,
  defs,
  path,
  onRemoveMock,
  onSaveMock,
}) => {
  const [data, setData] = useState(mock.data);
  const [param, setParam] = useState(mock.param)
  const [type, setType] = useState(mock.type)
  const [jsonData, setJsonData] = useState(() => mock.data ? JSON.stringify(mock.data) : '')
  const [show, setShow] = useState(() => param === 'default')
  const [rmLoading, setRmLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const saveCb = () => {
    setSaveLoading(false)
  }
  const handleSave = () => {
    let mockData = ''
    if (type !== 'json') {
      message.error('暂时仅支持json')
      return
    }
    try {
      if (param !== 'default') {
        formatSearchToObj(param)
      }
    } catch (error) {
      message.error('参数不合法')
      return
    }
    try {
      if (type === 'json') {
        mockData = JSON.parse(jsonData)
      }
    } catch (error) {
      message.error('JSON数据不合法')
      return
    }
    onSaveMock({
      type,
      param,
      data: mockData
    }, saveCb);
    setSaveLoading(true)
  }
  const rmCb = () => {
    setRmLoading(false)
  }
  const handleRmMock = () => {
    setRmLoading(true)
    onRemoveMock(rmCb)
  }
  return <div className={styles.root}>
    <div className={styles.header}>
      <Switch className={styles.showSwitch} checkedChildren="展开" size="small" unCheckedChildren="收起" onChange={setShow} checked={show} />
      {
        mock.param === 'default' ? 
          <span className={styles.defaultTitle}>默认</span> :
          <>
            <span className={styles.paramHint}>参数：</span>
            <Input className={styles.input} value={param} onChange={e => setParam(e.target.value)}></Input>
          </>
      }
      <Radio.Group className={styles.typeRadio} options={options} size="small" onChange={e => setType(e.target.value)} value={type} optionType="button" />
      <Button className={styles.saveBtn} size="small" onClick={handleSave}>保存</Button>
      {param !== 'default' && <Button className={styles.rmBtn} size="small" loading={rmLoading} onClick={handleRmMock} danger>删除</Button>}
    </div>
    {
      show && <div className={styles.content}>
        {
          type === 'json' && <TextArea value={jsonData} onChange={e => setJsonData(e.target.value)} />
        }
      </div>
    }
    
  </div>
}

export default MockContent