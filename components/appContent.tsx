import react, {FC, useState, useEffect} from 'react'
import styles from './appContent.module.less'
import { Button } from 'antd'
type Props = {
  pathsCount?: number
}
const AppContent:FC<Props> = ({
  pathsCount
}) => {
  const [updateLoading, setUpdateLoding] = useState(false)
  const updateSwagger = () => {
    
  }
  return <div className={styles.main}>
      <Button onClick={updateSwagger} loading={updateLoading}>同步swagger</Button>
    </div>
};
export default AppContent