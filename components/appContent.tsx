import react, {FC, useState, useEffect} from 'react'
import styles from './appContent.module.less'
import { Button } from 'antd'
type Props = {
  updateSwagger: () => void
  updateLoading: boolean
}
const AppContent:FC<Props> = ({
  updateSwagger,
  updateLoading
}) => {
  return <div className={styles.main}>
      <Button onClick={updateSwagger} loading={updateLoading}>同步swagger</Button>
    </div>
};
export default AppContent