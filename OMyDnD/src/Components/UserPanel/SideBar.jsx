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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Profil", href: "#", icon: UserIcon, current: false },
  { name: "Personnages", href: "#", icon: UserGroupIcon, current: false },
  { name: "Créer un compte", href: "#", icon: DevicePhoneMobileIcon, current: false },
  { name: "Se connecter", href: "#", icon: ArrowRightEndOnRectangleIcon, current: false },
  { name: "Se déconnecter", href: "#", icon: ArrowLeftStartOnRectangleIcon, current: false },
];

function Sidebar({ sidebarOpen, setSidebarOpen }) {
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
            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <button
                type="button"
                className="border border-transparent absolute top-0 right-0 mt-2 mr-2 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-black" aria-hidden="true" />
              </button>
              
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                          "mr-4 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Élément vide pour forcer la sidebar à rétrécir pour s'adapter à l'icône de fermeture */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Sidebar;
