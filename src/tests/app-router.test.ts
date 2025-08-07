import { navigation } from '~config/navigation';
import { router } from '~pages/app-router';

describe('Router Configuration', () => {
  test('should have correct main page route', () => {
    const route = router.routes[0].children?.find(
      (r) => r.path === navigation.main
    );
    expect(route).toBeDefined();
    expect(route?.id).toBe('main-page');
    expect(route?.loader).toBeDefined();
  });

  test('should have correct detailed page nested route', () => {
    const mainRoute = router.routes[0].children?.find(
      (r) => r.path === navigation.main
    );
    const detailedRoute = mainRoute?.children?.find(
      (r) => r.path === navigation.detailed
    );
    expect(detailedRoute).toBeDefined();
    expect(detailedRoute?.loader).toBeDefined();
  });
});
