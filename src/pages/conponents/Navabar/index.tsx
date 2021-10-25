import React, { useState, useEffect } from 'react'
import { Menu, Button } from 'antd';
import { useHistory } from "react-router-dom";
import cx from 'classnames'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import './index.css'
// interface eleType {
//   t
// }
const { SubMenu } = Menu;
interface ItemChildren {
  map?: any
}
interface ItemType {
  title?: string,
  children?: ItemChildren,
  id?: number,
  url?: string
}
interface menusType {
  map?: any
}
interface NavabarProps {
  navUseFunction?: (val: boolean) => void,
  menus?: menusType
}
const Navabar: React.FC<NavabarProps> = ({
  navUseFunction,
  menus
}) => {
  console.log('menus', menus)
  const [collapsed, setCollapsed] = useState(false)

  let history = useHistory();

  const toggleCollapsed = () => {
    setCollapsed(collapsed => {
      return !collapsed
    })
    navUseFunction && navUseFunction(!collapsed)
  };


  return (
    <div
      className={cx('navabar')}
      style={{ width: collapsed ? 80 : 226 }}>
      <div className={cx('nav-btn-wrap')}>
        <Button
          type="primary"
          className={cx('nav-btn-pri')}
          onClick={toggleCollapsed}
        >
          {
            React.createElement(collapsed
              ? MenuUnfoldOutlined
              : MenuFoldOutlined)
          }
        </Button>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        className={cx('nav-menu')}
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="only" icon={<PieChartOutlined />}>
          管理中心
        </Menu.Item>
        {
          menus && menus.map((item: ItemType) => {
            return (
              <SubMenu key={item.id} icon={<MailOutlined />} title={item.title}>
                {
                  item
                  && item.children
                  && item.children.map((ele: ItemType, ind: number) => {
                    return (
                      <Menu.Item
                        key={ele.id}
                        onClick={() => history.push(`/layout${ele.url}`)}>{ele.title}</Menu.Item>
                    )
                  })}
              </SubMenu>
            )
          })
        }
      </Menu>
    </div>
  )
}

export default Navabar