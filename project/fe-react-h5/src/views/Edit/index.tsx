import { editUserPhoto, editUserProfile, getUserProfile } from '@/store/actions/profile'
import { Button, List, DatePicker, NavBar, Popup, Toast, Dialog } from 'antd-mobile'
import classNames from 'classnames'
import { useState, useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useReduxState from '@/hooks/useReduxState'

import styles from './index.module.scss'
import EditInput from './EditInput'
import EditList from './EditList'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { logout } from '@/store/actions/login'

const Item = List.Item

const ProfileEdit = () => {
  const history = useHistory()
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getUserProfile())
  // }, [dispatch])

  // const { profile } = useSelector((state: RootState) => state.profile)
  const { profile } = useReduxState(getUserProfile, 'profile')

  const [popup, setPopup] = useState({
    visible: false,
    type: '',
    title: ''
  })

  const hidePopup = () => {
    setPopup({
      type: '',
      visible: false,
      title: ''
    })
  }

  const dispatch = useDispatch()
  const onUpdate = (key: keyof UserProfileKey, value: string) => {
    if (key === 'photo') {
      console.log('上传图片')
      refFileInput.current!.click()

      return '调用上传图片接口'
    }
    dispatch(editUserProfile({ [key]: value }))
  }

  const [popupA, setPopupA] = useState({
    type: '',
    visible: false
  })
  const hidePopupA = () => {
    setPopupA({
      type: '',
      visible: false
    })
  }

  const refFileInput = useRef<HTMLInputElement>(null)
  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    const fd = new FormData()
    fd.append('photo', file)
    // ajax
    await dispatch(editUserPhoto(fd))
    Toast.show({
      icon: 'success',
      content: '修改成功'
    })
    hidePopupA()
  }

  const [date, setDate] = useState({
    visible: false
  })

  // syslog('函数组件和Hook的特点,重复执行')

  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0'
          }}
          onBack={() => history.goBack()}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img width={24} height={24} src={profile.photo} alt="" />
                </span>
              }
              arrow
              onClick={() =>
                setPopupA({
                  type: 'photo',
                  visible: true
                })
              }
            >
              头像
            </Item>
            <Item
              arrow
              extra={profile.name}
              onClick={() =>
                setPopup({
                  type: 'name',
                  visible: true,
                  title: '昵称'
                })
              }
            >
              昵称
            </Item>
            <Item
              arrow
              extra={<span className={classNames('intro', 'normal')}>{profile.intro}</span>}
              onClick={() =>
                setPopup({
                  type: 'intro',
                  visible: true,
                  title: '简介'
                })
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={profile.gender}>
              性别
            </Item>
            <Item arrow extra={profile.birthday} onClick={() => setDate({ visible: true })}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={date.visible}
            value={new Date(profile.birthday)}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
            onClose={() => {
              setDate({ visible: false })
            }}
            onConfirm={(val) => {
              onUpdate('birthday', dayjs(val).format('YYYY-MM-DD'))
            }}
          />
        </div>

        <div className="logout">
          <Button
            className="btn"
            onClick={() => {
              Dialog.show({
                title: '退出登陆',
                content: '确定要退出吗',
                // 点任意action都可触发关闭
                closeOnAction: true,
                // actions 结构
                actions: [
                  [
                    {
                      key: 'cancel',
                      text: '取消',
                      style: {
                        color: 'var(--adm-color-weak)'
                      }
                    },
                    {
                      key: 'confirm',
                      text: '退出',
                      danger: true,
                      onClick: async () => {
                        await dispatch(logout())
                        history.push('/login')
                        Toast.show({
                          content: '退出成功',
                          icon: 'success'
                        })
                      }
                    }
                  ]
                ]
              })
            }}
          >
            退出登录
          </Button>
        </div>
      </div>

      {/*  */}
      <Popup visible={popup.visible} position="right" destroyOnClose>
        <EditInput hidePopup={hidePopup} onUpdate={onUpdate}></EditInput>
      </Popup>

      <Popup onMaskClick={hidePopupA} position="bottom" visible={popupA.visible} destroyOnClose>
        <EditList hidePopupA={hidePopupA} onUpdate={onUpdate}></EditList>
      </Popup>
      <input type="file" hidden ref={refFileInput} onChange={(e) => changeImage(e)} />
    </div>
  )
}

export default ProfileEdit
