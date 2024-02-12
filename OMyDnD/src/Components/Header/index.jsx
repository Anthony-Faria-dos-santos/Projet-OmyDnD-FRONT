import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "semantic-ui-react";
import Sidebar from "../UserPanel/SideBar";

const sanctuaries = [
  {
    name: "Races",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: `/images/races-logo.png`,
  },
  {
    name: "Classes",
    description: "Speak directly to your customers",
    href: "#",
    icon: `/images/classes-logo.png`,
  },
  {
    name: "Personnalités et historiques",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: `/images/background-logo.png`,
  },
  {
    name: "Caractéristiques",
    description: "Connect with third-party tools",
    href: "#",
    icon: `/images/caracteristiques-logo.png`,
  },
  {
    name: "Équipements",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: `/images/equipements-logo.png`,
  },
  {
    name: "Altérations d'état",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: `/images/alterations-logo.png`,
  },
  {
    name: "Sorts",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: `/images/sorts-logo.png`,
  },
  {
    name: "Dons",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: `/images/dons-logo.png`,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="bg-white border-solid border-b-indigo-500 border-b-4">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <button
            type="button"
            className="px-4 text-gray-500 "
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <UserCircleIcon
              className="text-black h-10 w-10"
              aria-hidden="true"
            />
          </button>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="flex lg:hidden">
          <Button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 custom-color"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu déroulant</span>
            <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </Button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 rounded-md bg-indigo-600 px-7 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">
              Sanctuaire
              <Bars3Icon
                className="h-5 w-5 float-right ml-2 text-white"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 flex justify-center"
                  >
                    Voir tout
                  </a>
                  {sanctuaries.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-gray-50 group-hover:bg-white">
                        <img
                          src={item.icon}
                          className="h-9 w-12 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900 hover:text-indigo-600"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <button className="rounded-md bg-indigo-600 px-7 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-[#fff] hover:text-[#fff]"
            >
              Outil
            </a>
          </button>
          <button className="rounded-md bg-indigo-600 px-7 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-[#fff] hover:text-[#fff]"
            >
              Contact
            </a>
          </button>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            <MagnifyingGlassCircleIcon
              className="h-10 w-10"
              aria-hidden="true"
            />
          </a>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="custom-link -m-1.5 p-1.5 sm:block"
              onClick={() => {
                setSidebarOpen(true);
                setMobileMenuOpen(false);
              }}
            >
              <span className="sr-only">Profil utilisateur</span>
              <UserCircleIcon
                className="h-8 w-auto text-black"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 ml-auto text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fermer le menu déroulant</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Sanctuaire
                        <Bars3Icon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500 flex justify-center text-sm"
                        >
                          Voir tout
                        </a>
                        {[...sanctuaries].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Outil
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Header;
