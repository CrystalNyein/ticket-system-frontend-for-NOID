import { ErrorMessage, Field } from 'formik';
import { TFormControlProps } from '../../constants/types';
import { twMerge } from 'tailwind-merge';

const FormikControl: React.FC<TFormControlProps> = (props) => {
  const { control, name, label, className, fieldCustomClass, required, ...rest } = props;

  return (
    <div className={twMerge('pb-6', className && className)}>
      <label htmlFor={name}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <Field
        className={twMerge('block w-full border my-1 py-1 px-2 outline-none rounded focus:border-default-blue', fieldCustomClass && fieldCustomClass)}
        id={name}
        name={name}
        as={control}
        autocomplete="off"
        {...rest}
      />
      <ErrorMessage name={name} className="absolute text-sm text-red-600" component="div" />
    </div>
  );
};

export default FormikControl;
