const routes: RouteConfig[] = [
  {
    key: 'Home',
    path: '/',
    redirect: { to: '/demo' },
    windowOptions: {
      title: 'Electron App',
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
    },
    createConfig: {
      showSidebar: true,
      saveWindowBounds: true,
      openDevTools: true,
    },
  },
]

export default routes
