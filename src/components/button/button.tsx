import { withDataTestId } from '~utils/utilities';
import { Component } from 'react';
import { JSX } from 'react/jsx-runtime';

import IntrinsicElements = JSX.IntrinsicElements;

type ButtonProps = IntrinsicElements['button'] & {
  dataTestId?: string;
  classNames?: string;
};

export class Button extends Component<ButtonProps> {
  render() {
    const {
      classNames = '',
      onClick,
      type,
      disabled,
      children,
      dataTestId = '',
      ...restProps
    } = this.props;
    const buttonClasses = `${classNames} btn`.trim();
    return (
      <button
        {...restProps}
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
