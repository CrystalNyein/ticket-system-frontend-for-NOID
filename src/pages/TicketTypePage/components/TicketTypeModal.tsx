import React from 'react';
import { Form, Formik } from 'formik';
import { TTicketTypeCreateUpdateParams } from '../../../constants/types';
import { useSelector } from 'react-redux';
import { selectCurrentTicketType } from '../../../redux/selectors/TicketTypeSelector';
import FormikControl from '../../../components/FormikControl/FormikControl';
import { ticketTypeSchema } from '../../../validators/TicketType';
import { ticketTypeParamUtils } from '../../../utils/formParamUtils';

interface TicketTypeModalProps {
  action: 'create' | 'update';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TTicketTypeCreateUpdateParams) => void;
}
const TicketTypeModal: React.FC<TicketTypeModalProps> = ({ action, isOpen, onClose, onSubmit }) => {
  const currentTicketType = useSelector(selectCurrentTicketType);

  const initialValues: TTicketTypeCreateUpdateParams = currentTicketType
    ? ticketTypeParamUtils(currentTicketType)
    : {
        name: '',
        description: '',
        typeCode: '',
      };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{action === 'create' ? 'Create New ' : 'Update'} Ticket Type</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={ticketTypeSchema} enableReinitialize>
          {(formik) => {
            return (
              <Form>
                {/* TicketType Name */}
                <FormikControl control="input" label="Name" name="name" required />
                {/* TicketType Description */}
                <FormikControl control="input" label="Description" name="description" />
                {/* TicketType Code */}
                <FormikControl control="input" label="Code" name="typeCode" />
                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 capitalize text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    {action}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default TicketTypeModal;
