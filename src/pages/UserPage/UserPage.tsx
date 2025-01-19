import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { UserTableHeader } from '../../constants/tableHeader';
import { TUser, TUserCreateUpdateParams } from '../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/actions/UserActions';
import { selectCurrentUser, selectUsers } from '../../redux/selectors/UserSelector';
import UserModal from './components/UserModal';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { setCurrentUser } from '../../redux/slices/UserSlice';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';

const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [action, setAction] = useState<'create' | 'update'>('create');
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(userActions.getList());
  }, [dispatch]);

  const handleCreateUser = () => {
    setAction('create');
    dispatch(setCurrentUser(null));
    setIsModalOpen(true);
  };
  const handleUpdateUser = (user: TUser) => {
    setAction('update');
    dispatch(setCurrentUser(user));
    setIsModalOpen(true);
  };
  const handleDeleteUser = (user: TUser) => {
    dispatch(setCurrentUser(user));
    setIsConfirmationModalOpen(true);
  };
  const handleConfirmDelete = () => {
    if (currentUser) {
      dispatch(userActions.delete(currentUser.id));
    }
    setIsConfirmationModalOpen(false);
    dispatch(setCurrentUser(null));
  };

  const handleSubmit = (userData: TUserCreateUpdateParams) => {
    if (action === 'create') {
      dispatch(userActions.create(userData));
    } else if (action === 'update') {
      dispatch(userActions.update(userData));
    }
    setIsModalOpen(false);
  };
  return (
    <div className="main-content-container">
      <div className="flex justify-between">
        <p>A list of all the users created.</p>
        <button onClick={handleCreateUser} className="bg-default-orange cursor-pointer text-white px-3 py-1.5 rounded">
          Add User
        </button>
      </div>
      {!users || users.length === 0 ? (
        <div className="text-center py-4 font-bold">No users available</div>
      ) : (
        <Table
          data={users}
          header={UserTableHeader}
          tableRowAction={(user: TUser) => (
            <div className="flex space-x-2">
              <PencilIcon className="h-6 w-6 cursor-pointer" onClick={() => handleUpdateUser(user)} />
              <TrashIcon
                className={`h-6 w-6 cursor-pointer ${user.role === 'admin' ? 'text-gray-400 cursor-not-allowed' : 'text-red-600'}`}
                onClick={() => handleDeleteUser(user)}
              />
            </div>
          )}
        />
      )}

      {isModalOpen && <UserModal action={action} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          title="Delete User"
          message={`Are you sure you want to delete the user "${currentUser?.name}"`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserPage;
