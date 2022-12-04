import styles from './index.module.scss'

type Porps = {
  hidePopupA: () => void
  onUpdate: (key: keyof UserProfileKey, value: string) => void
}
//
const EditList = ({ hidePopupA, onUpdate }: Porps) => {
  return (
    <div className={styles.root}>
      <div className="list-item" onClick={() => onUpdate('photo', '2')}>
        拍照
      </div>
      <div className="list-item" onClick={() => onUpdate('photo', '1')}>
        本地图片
      </div>

      <div className="list-item" onClick={() => hidePopupA()}>
        取消
      </div>
    </div>
  )
}

export default EditList
