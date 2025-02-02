import React from 'react';
import { Form, Formik } from 'formik';
import { TEventCreateUpdateParams } from '../../../constants/types';
import { eventSchema } from '../../../validators/Event';
import { useSelector } from 'react-redux';
import { eventParamUtils } from '../../../utils/formParamUtils';
import { selectCurrentEvent } from '../../../redux/selectors/EventSelector';
import FormikControl from '../../../components/FormikControl/FormikControl';
import FormikDatePicker from '../../../components/FormikControl/FormikDatePicker';

interface EventModalProps {
  action: 'create' | 'update';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TEventCreateUpdateParams) => void;
}
const EventModal: React.FC<EventModalProps> = ({ action, isOpen, onClose, onSubmit }) => {
  const currentEvent = useSelector(selectCurrentEvent);

  const initialValues = currentEvent
    ? eventParamUtils(currentEvent)
    : {
        name: '',
        description: '',
        startDate: null,
        endDate: null,
      };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{action === 'create' ? 'Create New ' : 'Update'} Event</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={eventSchema} enableReinitialize>
          {(formik) => {
            return (
              <Form>
                {/* Event Name */}
                <FormikControl control="input" label="Event Name" name="name" required />
                {/* Event Name */}
                <FormikControl control="input" label="Description" name="description" />
                {/* Event Start Date */}
                <FormikDatePicker
                  label="Start Date"
                  name="startDate"
                  value={formik.values.startDate}
                  setFieldValue={formik.setFieldValue}
                  minDate={new Date()}
                  maxDate={formik.values.endDate}
                  required
                />
                {/* Event End Date */}
                <FormikDatePicker label="End Date" name="endDate" value={formik.values.endDate} setFieldValue={formik.setFieldValue} minDate={formik.values.startDate} required />
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
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EventModal;
