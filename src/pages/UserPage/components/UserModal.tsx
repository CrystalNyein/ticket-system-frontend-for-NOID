import React from 'react';
import { Form, Formik } from 'formik';
import { TUserCreateUpdateParams, TUserRole } from '../../../constants/types';
import { useSelector } from 'react-redux';
import { userParamUtils } from '../../../utils/formParamUtils';
import { selectCurrentUser } from '../../../redux/selectors/UserSelector';
import FormikControl from '../../../components/FormikControl/FormikControl';
import { userSchema } from '../../../validators/User';
import { userRoleOption } from '../../../constants/common';
import FormikSelect from '../../../components/FormikControl/FormikSelect';

interface UserModalProps {
  action: 'create' | 'update';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TUserCreateUpdateParams) => void;
}
const UserModal: React.FC<UserModalProps> = ({ action, isOpen, onClose, onSubmit }) => {
  const currentUser = useSelector(selectCurrentUser);

  const initialValues = currentUser
    ? userParamUtils(currentUser)
    : {
        name: '',
        email: '',
        password: '',
        role: 'staff' as TUserRole,
      };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{action === 'create' ? 'Create New ' : 'Update'} User</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={userSchema(action === 'create')} enableReinitialize>
          <Form>
            {/* Email */}
            <FormikControl control="input" label="Email" name="email" disabled={action === 'update'} fieldCustomClass={action === 'update' ? 'cursor-not-allowed' : ''} required />
            {/* User Name */}
            <FormikControl control="input" label="User Name" name="name" required />
            {/* Password */}
            {action === 'create' && <FormikControl control="input" type="password" label="Password" name="password" required autoComplete="new-password" />}
            {/* Select User Role */}
            <FormikSelect label="UserRole" name="role" options={userRoleOption} required />
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 text-sm capitalize font-medium text-white bg-default-orange rounded-md hover:bg-opacity-80">
                {action}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default UserModal;
