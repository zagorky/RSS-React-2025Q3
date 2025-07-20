import { withDataTestId } from '~utils/utilities';
import { JSX } from 'react/jsx-runtime';

import IntrinsicElements = JSX.IntrinsicElements;

type ButtonProps = IntrinsicElements['button'] & {
  dataTestId?: string;
  classNames?: string;
};

export const Button = (props: ButtonProps) => {
  const {
    classNames = '',
    onClick,
    type,
    disabled,
    children,
    dataTestId = '',
    ...restProps
  } = props;
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
};
