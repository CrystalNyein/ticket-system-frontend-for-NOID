import { Form, Formik } from 'formik';
import { TOption, TTicketDeleteParams, TTicketSummary } from '../../../constants/types';
import { deleteTicketsSchema } from '../../../validators/Ticket';
import FormikSelect from '../../../components/FormikControl/FormikSelect';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvents } from '../../../redux/selectors/EventSelector';
import { optionUtils, ticketTypeOptionUtils } from '../../../utils/optionUtils';
import { selectTicketTypes } from '../../../redux/selectors/TicketTypeSelector';
import { useEffect } from 'react';
import { eventActions } from '../../../redux/actions/EventActions';
import { ticketTypeActions } from '../../../redux/actions/TicketTypeActions';

interface DeleteTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TTicketSummary) => void;
}

const DeleteTicketModal: React.FC<DeleteTicketModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const events = useSelector(selectEvents);
  const ticketTypes = useSelector(selectTicketTypes);
  const dispatch = useDispatch();
  const eventOptions: TOption[] = events
    .filter((event) => new Date(event.endDate!) > new Date())
    .map((event) => {
      return optionUtils(event);
    });
  const ticketTypeOptions: TOption[] = ticketTypes.map((ticketType) => {
    return ticketTypeOptionUtils(ticketType);
  });
  ticketTypeOptions.push({ value: 'ALL', label: 'All' });
  useEffect(() => {
    if (!events.length) dispatch(eventActions.getList());
    if (!ticketTypes.length) dispatch(ticketTypeActions.getList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues: TTicketDeleteParams = {
    eventId: '',
    ticketTypeCode: 'ALL',
  };

  const handleFormikSubmit = async (values: TTicketDeleteParams) => {
    const event = events.filter((event) => event.id === values.eventId)[0];
    const summary: TTicketSummary = {
      ...values,
      eventName: event.name,
      eventEndDate: event.endDate!,
      'Total Tickets': 0,
      'Sold Tickets': 0,
    };
    onSubmit(summary);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Tickets</h2>
        <Formik initialValues={initialValues} onSubmit={handleFormikSubmit} validationSchema={deleteTicketsSchema} enableReinitialize>
          {(formik) => {
            // Add useEffect hook here to update Formik field value when currentTemplate changes
            return (
              <Form>
                {/* Select Event */}
                <FormikSelect label="Event" name="eventId" options={eventOptions} required />
                {/* Select TicketType */}
                <FormikSelect label="Ticket Type" name="ticketTypeCode" options={ticketTypeOptions} required noSelectOption={true} />
                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!formik.isValid}
                    className="px-4 py-2 text-sm capitalize font-medium text-white bg-default-orange rounded-md hover:bg-opacity-80 disabled:cursor-not-allowed disabled:bg-gray-500"
                  >
                    Delete Tickets
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

export default DeleteTicketModal;
