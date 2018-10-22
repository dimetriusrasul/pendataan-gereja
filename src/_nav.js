export default {
  items: [
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Admin',
      url: '/admin',
      icon: 'icon-user',
    },
    {
      name: 'Traffic',
      url: '/traffic',
      icon: 'icon-people',
    },
    {
      name: 'Report',
      url: '/report',
      icon: 'icon-pie-chart',
      children: [
        {
          name: 'Traffic',
          url: '/report/traffic',
          icon: 'icon-puzzle',
        },
      ],
    },
  ],
};
