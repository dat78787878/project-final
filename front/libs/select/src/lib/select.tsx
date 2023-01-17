import React from 'react';
import { StyledSelect, Option, OptionDisabledSelected } from './styles';
import { Select as SelectButton } from '@chakra-ui/react';

export type ObjSelectProps = {
  name: string | number;
  value: string | number;
};

export type OptionProps = {
  key: number;
  value: string | number;
};

export type SelectProps = {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  size?: string;
  options?: ObjSelectProps[];
  height?: string;
  borderColor?: string;
  disabledSelected?: any;
  isError?: boolean;
} & React.ComponentPropsWithRef<'select'>;

function Select({
  isError = false,
  color = '#000000',
  backgroundColor = 'white',
  fontSize = '14px',
  children,
  options,
  placeholder,
  height = '35px',
  borderColor,
  disabledSelected,
  ...props
}: SelectProps) {
  return (
    <StyledSelect
      backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize}
      options={options}
      height={height}
      borderColor={borderColor}
      disabledSelected={disabledSelected}
      isError={isError}
    >
      <SelectButton {...props} placeholder={placeholder}>
        {disabledSelected && (
          <OptionDisabledSelected value="" hidden>
            {disabledSelected}
          </OptionDisabledSelected>
        )}
        {options?.map((item: ObjSelectProps, index: number) => (
          <Option
            value={item.value}
            key={index}
            title={String(item.name).length > 30 ? String(item.name) : ''}
          >
            {String(item.name).length > 30
              ? `${String(item.name).slice(0, 30)}...`
              : item.name}
          </Option>
        ))}
      </SelectButton>
    </StyledSelect>
  );
}

export default Select;
