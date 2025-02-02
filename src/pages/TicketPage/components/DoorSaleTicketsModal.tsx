import { Form, Formik } from 'formik';
import { TDoorSaleTicketsParams, TOption } from '../../../constants/types';
import { doorSaleTicketsSchema } from '../../../validators/Ticket';
import FormikSelect from '../../../components/FormikControl/FormikSelect';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvents } from '../../../redux/selectors/EventSelector';
import { optionUtils } from '../../../utils/optionUtils';
import { useEffect } from 'react';
import { eventActions } from '../../../redux/actions/EventActions';
import { setLoading } from '../../../redux/slices/CommonSlice';
import FormikControl from '../../../components/FormikControl/FormikControl';

interface DoorSaleTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TDoorSaleTicketsParams) => void;
}

const DoorSaleTicketsModal: React.FC<DoorSaleTicketsModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const events = useSelector(selectEvents);
  const dispatch = useDispatch();
  const eventOptions: TOption[] = events
    .filter((event) => new Date(event.endDate!) > new Date())
    .map((event) => {
      return optionUtils(event);
    });
  useEffect(() => {
    if (!events.length) dispatch(eventActions.getList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues: TDoorSaleTicketsParams = {
    eventId: '',
    ticketCode: '',
    buyerName: '',
    buyerPhone: '',
    buyerEmail: '',
  };

  const handleFormikSubmit = async (values: TDoorSaleTicketsParams) => {
    dispatch(setLoading(true));
    onSubmit(values);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Door Sale Tickets</h2>
        <Formik initialValues={initialValues} onSubmit={handleFormikSubmit} validationSchema={doorSaleTicketsSchema} enableReinitialize>
          {(formik) => {
            // Add useEffect hook here to update Formik field value when currentTemplate changes
            return (
              <Form>
                {/* Select Event */}
                <FormikSelect label="Event" name="eventId" options={eventOptions} required />
                {/* Ticket Code */}
                <FormikControl control="input" label="Ticket Code" name="ticketCode" required />
                {/* Buyer Name */}
                <FormikControl control="input" label="Buyer Name" name="buyerName" required />
                {/* Buyer Phone */}
                <FormikControl control="input" label="Buyer Phone" name="buyerPhone" required />
                {/* Buyer Email */}
                <FormikControl control="input" label="Buyer Email" name="buyerEmail" />
                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm capitalize font-medium text-white bg-default-orange rounded-md hover:bg-opacity-80 disabled:cursor-not-allowed disabled:bg-gray-500"
                    disabled={!formik.isValid}
                  >
                    Sell Tickets
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

export default DoorSaleTicketsModal;
