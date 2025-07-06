import { withDataTestId } from '~utils/utilities';
import { Component, type MouseEvent, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  classNames?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  dataTestId?: string;
};

export class Button extends Component<Props> {
  static readonly defaultProps = {
    type: 'button',
    disabled: false,
  };

  render() {
    const {
      classNames = '',
      onClick,
      type,
      disabled,
      children,
      dataTestId = '',
    } = this.props;
    const buttonClasses = `${classNames} btn`.trim();
    return (
      <button
        {...withDataTestId(dataTestId)}
        onClick={onClick}
        className={buttonClasses}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}
