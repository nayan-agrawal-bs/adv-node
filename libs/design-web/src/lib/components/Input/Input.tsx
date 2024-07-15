import React, { forwardRef, useRef, ChangeEvent } from 'react';
import styles from './Input.module.scss';
import Icon from '../Icon/Icon';

export type InputProps = {
  name: string;
  label?: string;
  value?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  isRequired?: boolean;
  className?: string;
  onChange?: (_value: string, _fieldName?: string) => void;
  validation?: {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
  iconName?: string;
  iconPosition?: 'left' | 'right';
  ref?: any;
};

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    name,
    value,
    type = 'text',
    placeholder = '',
    isRequired = false,
    onChange,
    className,
    iconName,
    iconPosition,
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      if (onChange) {
        onChange(e.target.value, name || '');
      }
    }

    return (
      <>
        {label && (
          <label htmlFor={name} className={styles.InputLabel}>
            {label}
            {isRequired && (
              <span className={styles.InputLabelRequiredAstrisk}>*</span>
            )}
          </label>
        )}
        <div className={styles.InputWrapper}>
          <input
            ref={inputRef}
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
            className={`form-input border-2 focus:border-primary ${className} ${
              iconName
                ? 'placeholder:tracking-wider ltr:pl-12 rtl:pr-12 peer px-8 py-2 '
                : ''
            }`}
            value={value}
            onChange={handleChange}
          />
          {iconName && (
            <button
              type="button"
              className={`text-dark/70 absolute ltr:right-1 rtl:left-1 inset-y-0 my-auto w-9 h-9 p-0 flex items-center justify-center peer-focus:text-primary `}
            >
              <Icon name={iconName} height={24} width={24} />
            </button>
          )}
        </div>
      </>
    );
  }
);

export default Input;
