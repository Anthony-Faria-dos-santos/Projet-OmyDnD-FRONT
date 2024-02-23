import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button, Label } from "semantic-ui-react";
import Sidebar from "../UserPanel/SideBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const sanctuaries = [
  {
    name: "Races",

    href: "/sanctuary/races",
    icon: `/images/sanctuary/races-logo-2.png`,
  },
  {
    name: "Classes",

    href: "/sanctuary/classes",
    icon: `/images/sanctuary/classes-logo-2.png`,
  },
  {
    name: "Personnalités et historiques",
    href: "/sanctuary/backgrounds",
    icon: `/images/sanctuary/background-logo.png`,
  },
  {
    name: "Caractéristiques",
    href: "/sanctuary/abilities",
    icon: `/images/sanctuary/caracteristiques-logo.png`,
  },
  {
    name: "Équipements",
    href: "/sanctuary/equipments",
    icon: `/images/sanctuary/equipements-logo-2.png`,
  },
  {
    name: "Altérations d'état",
    href: "/sanctuary/conditions",
    icon: `/images/sanctuary/alterations-logo.png`,
  },
  {
    name: "Sorts",
    href: "/sanctuary/spells",
    icon: `/images/sanctuary/sorts-logo-3.png`,
  },
  {
    name: "Dons",
    href: "/sanctuary/skills",
    icon: `/images/sanctuary/dons-logo-3.png`,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(token && user);
  const [showPopupLoggedIn, setshowPopupLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setshowPopupLoggedIn(true);
      const timer = setTimeout(() => {
        setshowPopupLoggedIn(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  return (
    <header className="bg-white border-solid border-b-gray-700 border-b-4">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <button
            type="button"
            className="px-4 text-gray-400"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Ouvrir bar latérale</span>
            <UserCircleIcon
              className={`text-gray-400 hover:text-gray-600 h-10 w-10 ${isLoggedIn ? "connexion-color" : "text-gray-400"
                }`}
              aria-hidden="true"
            />
          </button>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Popup */}
          {isLoggedIn && showPopupLoggedIn && (
            <Label as="a" open={showPopupLoggedIn} color="teal" tag>
              Vous êtes maintenant connecté !
            </Label>
          )}
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
        <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-gray-700 px-7 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 text-[#fff] hover:text-[#fff]"
            >
              Accueil
            </Link>
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 rounded-md bg-gray-700 px-7 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600">
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
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-gray-700 text-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  <Link
                    to="/sanctuary"
                    className="p-3 rounded-lg font-semibold text-white hover:text-gray-900 flex justify-center mb-2"
                  >
                    Voir tout
                  </Link>
                  {sanctuaries.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-500"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-gray-50 group-hover:bg-white">
                        <img
                          src={item.icon}
                          className="h-9 w-12 text-gray-600 group-hover:text-gray-700"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          to={item.href}
                          className="block font-semibold text-gray-50 hover:text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          {isLoggedIn && (
            <Link
              to="/tool/character-creator"
              className="inline-flex items-center justify-center rounded-md bg-gray-700 px-7 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 text-[#fff] hover:text-[#fff]"
            >
              Outil
            </Link>
          )}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-gray-700 px-7 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 text-[#fff] hover:text-[#fff]"
          >
            Contact
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/search"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            <MagnifyingGlassCircleIcon
              className="h-10 w-10 text-gray-400 hover:text-gray-600"
              aria-hidden="true"
            />
          </Link>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-700 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
                className="h-8 w-auto text-gray-400 hover:text-gray-600"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 ml-auto text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fermer le menu déroulant</span>
              <XMarkIcon
                className="rounded-md h-6 w-6 text-gray-50 hover:bg-gray-500 hover:text-gray-900"
                aria-hidden="true"
              />
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
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-50 hover:bg-gray-500 hover:text-gray-900">
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
                        <Link
                          to="/sanctuary"
                          className="font-semibold text-gray-50 hover:text-gray-900 flex justify-center text-sm"
                        >
                          Voir tout
                        </Link>
                        {[...sanctuaries].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-50 hover:bg-gray-500 hover:text-gray-900"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {isLoggedIn && (
                  <Link
                    to="/tool/character-creator"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-50 hover:bg-gray-500 hover:text-gray-900"
                  >
                    Outil
                  </Link>
                )}
                <Link
                  to="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-50 hover:bg-gray-500 hover:text-gray-900"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Header;
