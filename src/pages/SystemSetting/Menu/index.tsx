import React, { useState, useEffect } from 'react'
import { menuList } from 'request'
const Menu: React.FC<{}> = (props) => {

  useEffect(() => {
    menuTree()
  }, [])
  const menuTree = async () => {
    const res = await menuList({})
    console.log('res- 树形结尾狗-->', res)
  }

  return (
    <div>Menu</div>
  )
}

export default Menu