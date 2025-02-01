import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { TOption, TTicketCreateParams } from '../../../constants/types';
import { bulkCreateTicketSchema } from '../../../validators/Ticket';
import FormikControl from '../../../components/FormikControl/FormikControl';
import FormikSelect from '../../../components/FormikControl/FormikSelect';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvents } from '../../../redux/selectors/EventSelector';
import { optionUtils, ticketTypeOptionUtils } from '../../../utils/optionUtils';
import { selectTicketTypes } from '../../../redux/selectors/TicketTypeSelector';
import { useEffect, useRef, useState } from 'react';
import { eventActions } from '../../../redux/actions/EventActions';
import { ticketTypeActions } from '../../../redux/actions/TicketTypeActions';
import { selectCurrentTemplate } from '../../../redux/selectors/TicketTemplateSelector';
import { ticketTemplateActions } from '../../../redux/actions/TicketTemplateActions';
import { showSnackbar } from '../../../redux/slices/SnackbarSlice';
import { SnackbarType } from '../../../constants/common';
import { setCurrentTemplate } from '../../../redux/slices/TicketTemplateSlice';
import { ticketTemplateService } from '../../../services/TicketTemplateService';
import FormikFile from '../../../components/FormikControl/FormikFile';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TTicketCreateParams) => void;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const events = useSelector(selectEvents);
  const ticketTypes = useSelector(selectTicketTypes);
  const currentTemplate = useSelector(selectCurrentTemplate);
  const [isChecking, setIsChecking] = useState(false);
  const dispatch = useDispatch();
  const formikRef = useRef<FormikProps<TTicketCreateParams>>(null);
  const eventOptions: TOption[] = events.map((event) => {
    return optionUtils(event);
  });
  const ticketTypeOptions: TOption[] = ticketTypes.map((ticketType) => {
    return ticketTypeOptionUtils(ticketType);
  });

  useEffect(() => {
    if (!events.length) dispatch(eventActions.getList());
    if (!ticketTypes.length) dispatch(ticketTypeActions.getList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues: TTicketCreateParams = {
    eventId: '',
    ticketTypeCode: '',
    ticketTemplate: '',
    file: null, // For file upload
    totalCount: 1,
  };

  // Effect to update ticketTemplate when currentTemplate changes
  useEffect(() => {
    if (formikRef.current && currentTemplate) {
      formikRef.current.setFieldValue('ticketTemplate', currentTemplate?.id);
    }
  }, [currentTemplate]); // Depend on currentTemplate
  const checkTemplate = async (eventId: string, ticketTypeCode: string) => {
    if (eventId !== '' && ticketTypeCode !== '') {
      setIsChecking(true);
      dispatch(ticketTemplateActions.checkTemplate({ eventId, ticketTypeCode }));
      setIsChecking(false);
    }
  };
  const handleFormikSubmit = async (values: TTicketCreateParams, actions: FormikHelpers<TTicketCreateParams>) => {
    if (!currentTemplate && values.file) {
      // Step 1: Upload ticket template
      const uploadTemplateData = new FormData();
      uploadTemplateData.append('eventId', values.eventId); // Add eventId
      uploadTemplateData.append('ticketTypeCode', values.ticketTypeCode); // Add ticketTypeCode
      uploadTemplateData.append('file', values.file);
      try {
        const uploadResponse = await ticketTemplateService.uploadTemplate(uploadTemplateData);
        dispatch(setCurrentTemplate(uploadResponse.data));
        values.ticketTemplate = uploadResponse.data.id;
        // Step 2: Generate tickets
        onSubmit(values);
      } catch (error) {
        dispatch(showSnackbar({ payload: 'Error uploading template: ' + error, type: SnackbarType.ERROR }));
        return;
      }
      actions.resetForm();
    } else if (currentTemplate) {
      onSubmit(values);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Generate Tickets</h2>
        <Formik initialValues={initialValues} onSubmit={handleFormikSubmit} validationSchema={bulkCreateTicketSchema} enableReinitialize innerRef={formikRef}>
          {(formik) => {
            // Add useEffect hook here to update Formik field value when currentTemplate changes
            return (
              <Form>
                {/* Select Event */}
                <FormikSelect
                  label="Event"
                  name="eventId"
                  options={eventOptions}
                  required
                  onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
                    formik.handleChange(e);
                    checkTemplate(e.target.value, formik.values.ticketTypeCode);
                  }}
                />
                {/* Select TicketType */}
                <FormikSelect
                  label="Ticket Type"
                  name="ticketTypeCode"
                  options={ticketTypeOptions}
                  required
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    formik.handleChange(e);
                    checkTemplate(formik.values.eventId, e.target.value);
                  }}
                />
                {/* TicketTemplatePath */}
                {!currentTemplate && (
                  <FormikFile
                    type="file"
                    label="Upload Ticket Template"
                    name="file"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formik.setFieldValue('file', e.target.files?.[0]);
                    }}
                  />
                )}
                {/* Total tickets */}
                <FormikControl control="input" type="number" label="Total Tickets" name="totalCount" required />
                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isChecking}
                    className="px-4 py-2 text-sm capitalize font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-500"
                  >
                    Generate Tickets
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

export default CreateTicketModal;
