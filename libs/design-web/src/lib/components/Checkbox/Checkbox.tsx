import React from 'react';

type CheckboxProps = {
  name: string;
  label: string;
  value?: boolean;
  className?: string;
  onChange?: (_value: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  className,
  onChange,
  name,
}) => {
  const onChangeHandler = (e: any) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <>
      <input
        name={name}
        id={name}
        type="checkbox"
        checked={value}
        onChange={onChangeHandler}
        className="border-3 form-checkbox h-3.5 w-3.5 bg-white"
      />
      <span className={className}>{label}</span>
    </>
  );
};

export default Checkbox;
