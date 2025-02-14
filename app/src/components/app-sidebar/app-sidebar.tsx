import React from 'react'
import { Tooltip } from 'antd'

import AppSideMenus from '../../config/menu/side-menus.json'
import './app-sidebar.less'

interface SideMenuItem {
  key: string
  href: string
  title: string
  icon: string
}

interface State {
  activeMenuKey: string
}

export class AppSidebar extends React.Component<unknown, State> {
  state: State = {
    activeMenuKey: AppSideMenus[0]?.key,
  }

  componentDidMount(): void {
    window.addEventListener('router-update', this.onRouterUpdate)
  }

  onRouterUpdate = (e: CustomEventMap['router-update']): void => {
    const routeProps: PageProps = e.detail
    this.setState({ activeMenuKey: routeProps.name })
  }

  render(): JSX.Element {
    return (
      <div className="app-sidebar">
        <div className="flex center app-sidebar-header">
          <img width="40" src={$tools.APP_ICON} />
        </div>

        <div className="flex column side-menu">{AppSideMenus.map(this.renderMenuItem)}</div>
      </div>
    )
  }

  renderMenuItem = ({ key, icon, title, href }: SideMenuItem): JSX.Element => {
    const { activeMenuKey } = this.state
    const isActive = activeMenuKey === key

    return (
      <Tooltip key={key} overlayClassName="side-menu-item-tooltip" placement="right" title={title}>
        <a
          className={`side-menu-item fs-24 ri-${icon}-${isActive ? 'fill' : 'line'}`}
          style={{ color: isActive ? '#fff' : '' }}
          href={href}
        ></a>
      </Tooltip>
    )
  }

  componentWillUnmount(): void {
    window.removeEventListener('router-update', this.onRouterUpdate)
  }
} // class AppSidebar end
