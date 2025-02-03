import { Form, Formik } from 'formik';
import { TImportTicketSaleParams, TOption } from '../../../constants/types';
import { importTicketSaleSchema } from '../../../validators/Ticket';
import FormikSelect from '../../../components/FormikControl/FormikSelect';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvents, selectFutureEvents } from '../../../redux/selectors/EventSelector';
import { optionUtils } from '../../../utils/optionUtils';
import { useEffect } from 'react';
import { eventActions } from '../../../redux/actions/EventActions';
import { setLoading } from '../../../redux/slices/CommonSlice';
import FormikFile from '../../../components/FormikControl/FormikFile';

interface ImportTicketSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TImportTicketSaleParams) => void;
}

const ImportTicketSaleModal: React.FC<ImportTicketSaleModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const events = useSelector(selectEvents);
  const futureEvents = useSelector(selectFutureEvents);
  const dispatch = useDispatch();
  const eventOptions: TOption[] = futureEvents.map((event) => {
    return optionUtils(event);
  });

  useEffect(() => {
    if (!events.length) dispatch(eventActions.getList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues: TImportTicketSaleParams = {
    eventId: '',
    file: null, // For file upload
  };

  const handleFormikSubmit = async (values: TImportTicketSaleParams) => {
    dispatch(setLoading(true));
    onSubmit(values);
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

                {/* TicketTemplatePath */}
                <FormikFile
                  type="file"
                  label="Ticket Sale"
                  name="file"
                  accept=".xlsx,.xls"
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
                    Import Ticket Sales
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

export default ImportTicketSaleModal;
