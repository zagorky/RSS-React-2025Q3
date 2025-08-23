import { render, screen } from '@testing-library/react';
import { useModal } from '~components/modal/hooks/use-modal';
import { Modal, ModalProvider } from '~components/modal/modal';
import { XIcon } from 'lucide-react';
import { vi } from 'vitest';

import { setupUserEvent } from '~/tests/test-utilties';

vi.mock('~components/modal/hooks/use-modal', async () => {
  const actual = await vi.importActual('~components/modal/hooks/use-modal');

  return { ...actual, useModal: vi.fn() };
});

const mockedUseModal = vi.mocked(useModal);

describe('Modal', () => {
  const mockOpen = vi.fn();
  const mockClose = vi.fn();

  beforeAll(() => {
    if (!HTMLDialogElement.prototype.showModal) {
      HTMLDialogElement.prototype.showModal = vi.fn();
    }
    if (!HTMLDialogElement.prototype.close) {
      HTMLDialogElement.prototype.close = vi.fn();
    }
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseModal.mockReturnValue({
      current: null,
      open: mockOpen,
      close: mockClose,
    });
  });

  const setupModalHookMock = (current: string | null = null) => {
    mockedUseModal.mockReturnValue({
      current,
      open: mockOpen,
      close: mockClose,
    });
  };

  test('should render trigger button and does not show modal initially', () => {
    render(
      <ModalProvider>
        <Modal type="test" openButton="Open Modal" closeButton={<XIcon />}>
          <div>Modal Content</div>
        </Modal>
      </ModalProvider>
    );

    expect(screen.getByText('Open Modal')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('should open modal when trigger button is clicked', async () => {
    setupModalHookMock(null);

    const { user } = setupUserEvent(
      <ModalProvider>
        <Modal type="test" openButton="Open Modal" closeButton={<XIcon />}>
          <div>Modal Content</div>
        </Modal>
      </ModalProvider>
    );

    await user.click(screen.getByText('Open Modal'));
    expect(mockOpen).toHaveBeenCalledWith('test');
  });
});