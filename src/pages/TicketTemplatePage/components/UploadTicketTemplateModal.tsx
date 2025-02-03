import { Form, Formik, FormikHelpers } from 'formik';
import { TUploadTicketTemplateParams, TOption } from '../../../constants/types';
import { importTicketSaleSchema } from '../../../validators/Ticket';
import FormikSelect from '../../../components/FormikControl/FormikSelect';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvents, selectFutureEvents } from '../../../redux/selectors/EventSelector';
import { optionUtils, ticketTypeOptionUtils } from '../../../utils/optionUtils';
import { useEffect } from 'react';
import { eventActions } from '../../../redux/actions/EventActions';
import { setLoading } from '../../../redux/slices/CommonSlice';
import FormikFile from '../../../components/FormikControl/FormikFile';
import { selectTicketTypes } from '../../../redux/selectors/TicketTypeSelector';
import { ticketTemplateService } from '../../../services/TicketTemplateService';
import { setCurrentTicketTemplate } from '../../../redux/slices/TicketTemplateSlice';
import { showSnackbar } from '../../../redux/slices/SnackbarSlice';
import { SnackbarType } from '../../../constants/common';
import { ticketTemplateActions } from '../../../redux/actions/TicketTemplateActions';
import { ticketTypeActions } from '../../../redux/actions/TicketTypeActions';

interface UploadTicketTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadTicketTemplateModal: React.FC<UploadTicketTemplateModalProps> = ({ isOpen, onClose }) => {
  const events = useSelector(selectEvents);
  const futureEvents = useSelector(selectFutureEvents);
  const ticketTypes = useSelector(selectTicketTypes);
  const dispatch = useDispatch();
  const eventOptions: TOption[] = futureEvents.map((event) => {
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

  const initialValues: TUploadTicketTemplateParams = {
    eventId: '',
    ticketTypeCode: '',
    file: null, // For file upload
  };

  const handleFormikSubmit = async (values: TUploadTicketTemplateParams, actions: FormikHelpers<TUploadTicketTemplateParams>) => {
    dispatch(setLoading(true));
    if (values.file) {
      // Step 1: Upload ticket template
      const uploadTemplateData = new FormData();
      uploadTemplateData.append('eventId', values.eventId); // Add eventId
      uploadTemplateData.append('ticketTypeCode', values.ticketTypeCode); // Add ticketTypeCode
      uploadTemplateData.append('file', values.file);
      try {
        const uploadResponse = await ticketTemplateService.uploadTicketTemplate(uploadTemplateData);
        dispatch(setCurrentTicketTemplate(uploadResponse.data));
        dispatch(ticketTemplateActions.getList());
      } catch (error) {
        dispatch(showSnackbar({ payload: 'Error uploading template: ' + error, type: SnackbarType.ERROR }));
        return;
      }
      onClose();
      actions.resetForm();
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Import Ticket Sales</h2>
        <Formik initialValues={initialValues} onSubmit={handleFormikSubmit} validationSchema={importTicketSaleSchema} enableReinitialize>
          {(formik) => {
            // Add useEffect hook here to update Formik field value when currentTemplate changes
            return (
              <Form>
                {/* Select Event */}
                <FormikSelect label="Event" name="eventId" options={eventOptions} required />

                {/* Select TicketType */}
                <FormikSelect label="Ticket Type" name="ticketTypeCode" options={ticketTypeOptions} required />
                {/* TicketTemplatePath */}
                <FormikFile
                  type="file"
                  label="Upload Ticket Template"
                  name="file"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.setFieldValue('file', e.target.files?.[0]);
                  }}
                />

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm capitalize font-medium text-white bg-default-orange rounded-md hover:bg-opacity-80 disabled:cursor-not-allowed disabled:bg-gray-500"
                  >
                    Add Ticket Template
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

export default UploadTicketTemplateModal;
