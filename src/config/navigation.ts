export const navigation = {
  main: '/',
  detailed: 'anime/:id',
  error: '*',
  about: '/about',
} as const;

export const navBar = [
  {
    path: navigation.main,
    title: 'main',
  },
  {
    path: navigation.about,
    title: 'about',
  },
];
