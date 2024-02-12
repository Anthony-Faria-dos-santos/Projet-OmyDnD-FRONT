/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  UserIcon,
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  DevicePhoneMobileIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token && user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    setSidebarOpen(false);
    navigate("/signin");
  };

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setSidebarOpen}>
        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-700 sidebar-border">
              <button
                type="button"
                className="border border-transparent absolute top-0 right-0 mt-2 mr-2 flex items-center justify-center h-10 w-10 rounded-full text-gray-50"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon
                  className="h-6 w-6 text-gray-50 hover:bg-gray-500 hover:text-gray-900 rounded-md"
                  aria-hidden="true"
                />
              </button>

              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 px-2 space-y-1">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/profile"
                        className="pt-2 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-50 hover:bg-gray-500 hover:text-gray-900"
                      >
                        <UserIcon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-50"
                          aria-hidden="true"
                        />
                        Profil de
                        <span className="text-red-500 ml-1 font-bold">
                          {user.pseudo}
                        </span>
                      </Link>
                      <Link
                        to="/characters"
                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-50 hover:bg-gray-500 hover:text-gray-900"
                      >
                        <UserGroupIcon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-50"
                          aria-hidden="true"
                        />
                        Personnages
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-50 hover:bg-gray-500 hover:text-gray-900 w-full"
                      >
                        <ArrowLeftStartOnRectangleIcon
                          className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-50"
                          aria-hidden="true"
                        />
                        Se déconnecter
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signup"
                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-50 hover:bg-gray-500 hover:text-gray-900"
                      >
                        <DevicePhoneMobileIcon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-50"
                          aria-hidden="true"
                        />
                        Créer un compte
                      </Link>
                      <Link
                        to="/signin"
                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-50 hover:bg-gray-500 hover:text-gray-900"
                      >
                        <ArrowRightEndOnRectangleIcon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-50"
                          aria-hidden="true"
                        />
                        Se connecter
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Sidebar;
