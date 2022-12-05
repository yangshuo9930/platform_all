import { renderIcon } from '@/utils/index'
import { DashboardOutlined, WalletOutlined } from '@vicons/antd'

//前端路由图标映射表
export const constantRouterIcon = {
  dashboard: renderIcon(DashboardOutlined),
  wallet: renderIcon(WalletOutlined)
}
