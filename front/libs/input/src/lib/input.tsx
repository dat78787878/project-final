import { forwardRef } from 'react';
import { StyledInput } from './styles';

/* eslint-disable-next-line */
export type InputProps = {
  background?: string;
  height?: string;
  isError?: boolean;
  fontSize?: string;
  placeholder?: string;
  colorPlaceholder?: string;
  paddingTB?: string;
  paddingLR?: string;
} & React.ComponentPropsWithRef<'input'>;

function Input(
  {
    background = '#FFFFFF',
    height = '35px',
    isError = false,
    fontSize = '14px',
    placeholder,
    colorPlaceholder = '#b1b1b1',
    paddingTB = '8px',
    paddingLR = '14px',
    ...props
  }: InputProps,
  ref: any
) {
  return (
    <StyledInput
      ref={ref}
      background={background}
      height={height}
      isError={isError}
      fontSize={fontSize}
      placeholder={placeholder}
      colorPlaceholder={colorPlaceholder}
      paddingTB={paddingTB}
      paddingLR={paddingLR}
      {...props}
    ></StyledInput>
  );
}
export default forwardRef(Input);
