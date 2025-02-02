import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import routes from '../constants/routes';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../redux/actions/AuthActions';
import logo from '../assets/logo/Logo.png';
import { selectAuthUser } from '../redux/selectors/AuthSelector';
import { allowRoles } from '../constants/common';
import { storage } from '../constants/storage';

const navigation = [
  {
    name: 'Dashboard',
    href: routes.DASHBOARD,
    allowedRoles: allowRoles.MANAGER,
  },
  { name: 'Events', href: routes.EVENT, allowedRoles: allowRoles.MANAGER },
  { name: 'Tickets', href: routes.DEFAULT },
  { name: 'Ticket Types', href: routes.TICKET_TYPE },
  { name: 'Ticket Templates', href: routes.TICKET_TEMPLATE },
  { name: 'Users', href: routes.USER, allowedRoles: allowRoles.ADMIN },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const NavBar = () => {
  const currentRoute = useLocation();
  const user = useSelector(selectAuthUser) || JSON.parse(storage.getUser()!);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <>
      <Disclosure as="nav" className="bg-light-orange sticky top-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <img alt="NOID Entertainment" src={logo} className="w-16" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => {
                    return item.allowedRoles ? (
                      user && item.allowedRoles?.includes(user.role!) && (
                        <a
                          key={item.name}
                          href={item.href}
                          aria-current={item.href === currentRoute.pathname ? 'page' : undefined}
                          className={classNames(
                            item.href === currentRoute.pathname
                              ? 'bg-default-orange text-white'
                              : 'text-default-black hover:bg-default-orange hover:bg-opacity-50 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                        >
                          {item.name}
                        </a>
                      )
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.href === currentRoute.pathname ? 'page' : undefined}
                        className={classNames(
                          item.href === currentRoute.pathname ? 'bg-default-orange text-white' : 'text-default-black hover:bg-default-orange hover:bg-opacity-50 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-light-orange text-sm hover:ring-2 hover:ring-white">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <span className="size-9 rounded-full text-center uppercase leading-9 bg-default-orange text-white">
                        {user
                          ? user?.name.split(' ').length > 1
                            ? user?.name.split(' ')[0].slice(0, 1) + user?.name.split(' ')[1].slice(0, 1)
                            : user?.name.split(' ')[0].slice(0, 2)
                          : 'AD'}
                      </span>
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                        Log Out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.href === currentRoute.pathname ? 'page' : undefined}
                className={classNames(
                  item.href === currentRoute.pathname ? 'bg-default-orange text-white' : 'text-default-black hover:bg-light-orange hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <span className="size-9 rounded-full text-center uppercase leading-9 bg-default-orange text-white">
                {user
                  ? user?.name.split(' ').length > 1
                    ? user?.name.split(' ')[0].slice(0, 1) + user?.name.split(' ')[1].slice(0, 1)
                    : user?.name.split(' ')[0].slice(0, 2)
                  : 'AD'}
              </span>
              <div className="ml-3">
                <div className="text-base/5 font-bold text-default-black">{user?.name}</div>
                <div className="text-sm font-medium text-default-black">{user?.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <DisclosureButton
                onClick={handleLogout}
                className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-default-black hover:bg-light-orange hover:text-white"
              >
                Log Out
              </DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      {navigation.filter((nav) => nav.href === currentRoute.pathname).length > 0 && (
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{navigation.filter((link) => link.href === currentRoute.pathname)[0].name}</h1>
          </div>
        </header>
      )}
    </>
  );
};
export default NavBar;
