import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSnackbar } from '../redux/selectors/SnackbarSelector';
import { hideSnackbar } from '../redux/slices/SnackbarSlice';
import { getBackgroundColor } from '../utils/snackbarUtils';

interface SnackbarProps {
  children?: ReactNode;
}
export const Snackbar: React.FC<SnackbarProps> = ({ children }) => {
  const snackbar = useSelector(selectSnackbar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        dispatch(hideSnackbar());
      }, snackbar.duration);

      return () => clearTimeout(timer);
    }
  }, [snackbar.open, snackbar.duration, dispatch]);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };
  return (
    <>
      {children}
      {snackbar.open && (
        <div
          className={`z-50 fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white rounded shadow-lg ${getBackgroundColor(snackbar.type)} transition duration-300`}
        >
          <div className="flex justify-between items-center">
            <span>{snackbar.message}</span>
            <button onClick={handleClose} className="ml-4">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};
