import { ErrorMessage, Field, useFormikContext } from 'formik';
import { twMerge } from 'tailwind-merge';
import { ComponentProps } from 'react';
import { TEventCreateUpdateParams } from '../../constants/types';

interface FormikRadioProps extends ComponentProps<typeof Field> {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  fieldCustomClass?: string;
}
const FormikRadio: React.FC<FormikRadioProps> = (props) => {
  const { name, label, className, fieldCustomClass, required, ...rest } = props;
  const { setFieldValue } = useFormikContext<TEventCreateUpdateParams>();

  return (
    <div className={twMerge('pb-6', className && className)}>
      <label htmlFor={name}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <div className="flex gap-4 mt-1">
        <label className="flex items-center gap-2">
          <Field type="radio" name={name} value={true} className={fieldCustomClass} onChange={() => setFieldValue(name, true)} {...rest} />
          Yes
        </label>
        <label className="flex items-center gap-2">
          <Field type="radio" name={name} value={false} className={fieldCustomClass} onChange={() => setFieldValue(name, false)} {...rest} />
          No
        </label>
      </div>
      <ErrorMessage name={name} className="absolute text-sm text-red-600" component="div" />
    </div>
  );
};

export default FormikRadio;
