import React from 'react';
import { StyleButton } from './styles';

export type ButtonProps = {
  color?: string;
  background?: string;
  textSize?: string;
  onClick?: () => void;
  isOutline?: boolean;
  paddingTB?: string;
  paddingLR?: string;
  disabled?: boolean;
  fontWeight?: string;
} & React.ComponentPropsWithoutRef<'button'>;

function Button({
  color = '#000000',
  children,
  background = '#2CA3A3',
  textSize = '14px',
  onClick,
  isOutline = false,
  paddingTB = '2px',
  paddingLR = '5px',
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <StyleButton
      {...props}
      onClick={onClick}
      background={background}
      isOutline={isOutline}
      textSize={textSize}
      color={color}
      paddingTB={paddingTB}
      paddingLR={paddingLR}
      disabled={disabled}
    >
      {children}
    </StyleButton>
  );
}

export default Button;
