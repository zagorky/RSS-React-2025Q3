export const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
export const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
export const consoleErrorSpy = vi.spyOn(console, 'error');
export const fallbackMock = vi.fn((error: Error) => (
  <div data-testid="error-fallback">{error.message}</div>
));
