import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { connect } from 'react-redux'
import { Empty, Spin } from 'antd';
import { initMethod } from 'store/actions'
import Navabar from 'pages/conponents/Navabar/index'
import routes from 'router/index'
import RouterView from 'router/RouterView'
import cx from 'classnames'
import './index.css'

// 指定二级类型
interface matchValue {
  path: string
}
interface menusType {
  menus?: object
}
interface allDataType {
  NavabarData?: menusType
}
// 指定一级类型
interface layoutType {
  match?: matchValue,
  allData?: allDataType,
  initMethod?: any
}
const Layout: React.FC<layoutType> = ({
  match,
  allData
}) => {
  console.log('allData', allData)
  const [headerWidth, setHeaderWidth] = useState(false)

  useEffect(() => {
    let cache = sessionStorage.getItem('userinfo')
    // console.log('cache', cache)
    // cache && initMethod(cache)
  }, [headerWidth])
  // 取出二级路由
  const nowRouterPath = match && match.path
  const sercondRouter = routes.findIndex(item => item.path === nowRouterPath)
  const secondChildren = sercondRouter !== -1 && routes[sercondRouter].children

  console.warn('牛恒啊啊啊啊啊啊')
  console.log('match', match)
  console.log('nowRouterPath', nowRouterPath, sercondRouter, secondChildren)
  const navUseFunction = (val: boolean) => {
    setHeaderWidth(val)
  }

  const { NavabarData } = allData as allDataType
  const { menus } = NavabarData as menusType
  const renderNav = () => {
    return (
      menus && <Navabar
        menus={menus}
        navUseFunction={navUseFunction}
      />
    )
  }

  const renderSec = () => {
    console.log('secondChildren', secondChildren)
    return (
      secondChildren
        ? (
          <Suspense fallback={<div style={{ textAlign: 'center' }}><Spin size="large" /></div>}>
            <RouterView routes={secondChildren} />
          </Suspense>
        )
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    )
  }

  return (
    <div className={cx('layout')}>
      <div className={cx('layouTop')}>
        <div
          className={cx('lay-top-left')}
          style={{ width: headerWidth ? 80 : 226 }}>xiaoU</div>
        <div className={cx('lay-top-right')}></div>
      </div>
      <div className={cx('layouBottom')}>
        {renderNav()}
        {renderSec()}
      </div>
    </div>
  )
}

export default connect(
  (state) => {
    return {
      allData: state
    }
  }, {
  initMethod
})(Layout)