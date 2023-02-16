import react, {FC, useState, useEffect} from 'react'
import styles from './appContent.module.less'
import { Button } from 'antd'
import { fetchSyncSwagger } from '@/common/request'
type Props = {
  pathsCount?: number
}
const AppContent:FC<Props> = ({
  pathsCount
}) => {
  const [updateLoading, setUpdateLoding] = useState(false)
  const updateSwagger = () => {
    fetchSyncSwagger().then(() => {
      setUpdateLoding(false)
    })
  }
  return <div className={styles.main}>
      <div className={styles.toolbar}>
        <Button onClick={updateSwagger} loading={updateLoading}>同步swagger</Button>
      </div>
      <div className={styles.content}>
        <span>当前共有{pathsCount}个接口</span>
      </div>
    </div>
};
export default AppContent