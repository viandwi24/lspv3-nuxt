export const state = () => ({
  sidebarMenu: {
    admin: [
      {
        type: 'item-header',
        text: 'Menu'
      },
      {
        type: 'item',
        text: 'Dashboard',
        route: 'dashboard'
      },
      {
        type: 'item',
        text: 'Skema',
        route: 'asesmen'
      }
    ],
    asesi: [
      {
        type: 'item-header',
        text: 'Menu'
      },
      {
        type: 'item',
        text: 'Dashboard',
        route: 'dashboard'
      },
      {
        type: 'item',
        text: 'Asesmen Saya',
        route: 'asesmen'
      }
    ],
    asesor: [
      {
        type: 'item-header',
        text: 'Menu'
      },
      {
        type: 'item',
        text: 'Dashboard',
        route: 'dashboard'
      }
    ]
  }
})
