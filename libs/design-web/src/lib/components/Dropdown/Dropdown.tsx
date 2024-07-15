import React from 'react';
import Select, { StylesConfig } from 'react-select';
import chroma from 'chroma-js';

import { ReactNode } from 'react';

import styles from './Dropdown.module.scss';

interface DropdownOptionProps {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string; // Make label prop optional
  name?: string;
  children?: ReactNode; // Make children prop optional
  options: DropdownOptionProps[];
  onSelect: (_selectedOption: DropdownOptionProps) => void;
  placement: string;
  isRequired?: boolean;
  style?: React.CSSProperties;
  value?: DropdownOptionProps;
  isSearchable?: boolean;
}

const requiredFieldAsteriskSymbol = '*';

const Dropdown: React.FC<DropdownProps> = ({
  name,
  options,
  onSelect,
  placement,
  label,
  isRequired = false,
  isSearchable = false,
  value,
}) => {
  const handleOptionSelect = (option: DropdownOptionProps) => {
    onSelect(option);
  };

  const selectStyles: StylesConfig<DropdownOptionProps> = {
    control: styles => ({
      ...styles,
      minWidth: 240,
    }),
    menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: isFocused || isSelected ? 'white' : 'black',
      };
    },
  };

  return (
    <div>
      {label && (
        <label htmlFor={label} className={styles.DropdownLabel}>
          {label}
          {isRequired && (
            <span className={styles.DropdownLabelRequiredAsterisk}>
              {requiredFieldAsteriskSymbol}
            </span>
          )}
        </label>
      )}

      <Select
        className="dropdown-toggle"
        name={name}
        placeholder={placement}
        options={options}
        onChange={option => handleOptionSelect(option as DropdownOptionProps)}
        styles={selectStyles}
        value={value}
        isSearchable={isSearchable}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#652dbf',
            primary: '#652dbf',
            primary50: '#652dbf',
            primary75: '#652dbf',
          },
        })}
      />
    </div>
  );
};

export default Dropdown;
