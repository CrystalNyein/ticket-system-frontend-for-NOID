import React, { ComponentProps } from 'react';
import { Field, ErrorMessage } from 'formik';
import { twMerge } from 'tailwind-merge';
import { TOption } from '../../constants/types';

interface FormikSelectProps extends ComponentProps<typeof Field> {
  name: string;
  label: string;
  options: TOption[] | string[];
  required?: boolean;
  className?: string;
  fieldCustomClass?: string;
  noSelectOption?: boolean;
  control?: string;
}

const FormikSelect: React.FC<FormikSelectProps> = ({
  name,
  label,
  options,
  required = false,
  className,
  fieldCustomClass,
  control = 'select', // Default to 'select' for this component
  noSelectOption = false,
  ...rest
}) => {
  return (
    <div className={twMerge('pb-6', className && className)}>
      <label htmlFor={name}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <Field
        className={twMerge('block w-full border my-1 py-1 px-2 outline-none rounded focus:border-default-blue bg-white', fieldCustomClass && fieldCustomClass)}
        id={name}
        name={name}
        as={control}
        {...rest}
      >
        {!noSelectOption && <option value="">Select an option</option>}
        {options.map((option) => {
          return typeof option === 'string' ? (
            <option key={option} value={option}>
              {option}
            </option>
          ) : (
            <option key={option.value} value={option.value} className="bg-white text-black">
              {option.label}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} className="absolute text-sm text-red-600" component="div" />
    </div>
  );
};

export default FormikSelect;
