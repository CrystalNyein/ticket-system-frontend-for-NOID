import { ErrorMessage, Field, FieldProps } from 'formik';
import React from 'react';
import ReactDatePicker from 'react-DatePicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import { TFormControlProps } from '../../constants/types';
import { twMerge } from 'tailwind-merge';

const FormikDatePicker: React.FC<TFormControlProps> = (props) => {
  const { className, label, name, fieldCustomClass, required, ...rest } = props;
  return (
    <div className={twMerge('pb-6', className && className)}>
      <label htmlFor={name}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      {/* <ReactDatePicker
        className={twMerge('block w-full border my-1 py-1 px-2 outline-none rounded focus:border-default-blue', fieldCustomClass && fieldCustomClass)}
        id={name}
        name={name}
        selected={value}
        onChange={(val) => {
          setFieldValue(name, val);
        }}
        {...rest}
      ></ReactDatePicker> */}
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <ReactDatePicker
              id={name}
              className={twMerge('block w-full border my-1 py-1 px-2 outline-none rounded focus:border-default-blue', fieldCustomClass && fieldCustomClass)}
              {...field}
              {...rest}
              selected={value || null} // Handle undefined or null values
              onChange={(val) => setFieldValue(name, val)} // Update Formik state
              dateFormat="yyyy-MM-dd" // Example: Customize the date format
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} className="absolute text-sm text-red-600" component="div" />
    </div>
  );
};

export default FormikDatePicker;
