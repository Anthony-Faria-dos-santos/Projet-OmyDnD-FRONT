import { useState } from "react";
import { useForm } from '@formspree/react';
import { Switch } from "@headlessui/react";
import { ModalContact } from "./modal.jsx";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


function Form() {

  const [agreed, setAgreed] = useState(false);
  const [state, handleSubmit] = useForm("mgegkjbw");
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    email: '',
    message: '',
    phone: '',
    firstname: '',
    lastname: '',
  });

  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^((?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-8][02-9])\s*(?:[.-]\s*)?([0-9]{4})|(?:\+33\s?)(?:\(0\))?[1-9](?:[\s.-]?[0-9]{2}){4})$/;

    if (!formState.email.includes('@')) {
      newErrors.email = "Vous devez renseigner un email valide";
    }

    if (formState.message === '' || formState.message.length < 10) {
      newErrors.message = "Vous devez renseigner un message de 10 caractères minimum";
    }

    if (formState.phone === '' || formState.phone.length < 8 || !phoneRegex.test(formState.phone)) {
      newErrors.phone = "Vous devez renseigner un numéro de téléphone valide";
    }

    if (formState.firstname === '' || formState.firstname.length < 2) {
      newErrors.name = "Vous devez renseigner un prénom de 2 caractères minimum";
    }

    if (formState.lastname === '' || formState.lastname.length < 2) {
      newErrors.lastName = "Vous devez renseigner un nom de famille de 2 caractères minimum";
    }
    return newErrors;
  };

  const handleSubmitVerify = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    } else {
      handleSubmit(e).then(() => setShowModal(true));
    }
  };



  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      const newErrors = { ...errors };
      delete newErrors[e.target.name];
      setErrors(newErrors)
    }
  };




  if (state.succeeded) {
    return (
      <>
        {showModal && <ModalContact />}
      </>
    );
  }

  return (
    <>

      <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Formulaire de Contact
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Pour toutes questions relative à notre outil n&apos;hésitez pas à nous
            contacter via ce formulaire de contact.
          </p>
        </div>
        <form
          action="https://formspree.io/f/mgegkjbw"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
          onSubmit={handleSubmitVerify}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-white"
              >
                Prénom
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="firstname"
                  id="first-name"
                  autoComplete="given-name"
                  value={formState.firstname}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.firstname && <p style={{ color: "red" }}>{errors.firstname}</p>}
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-white"
              >
                Nom de famille
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="lastname"
                  id="last-name"
                  autoComplete="family-name"
                  value={formState.lastname}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.lastname && <p style={{ color: "red" }}>{errors.lastname}</p>}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-white"
              >
                Email
              </label>

              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  id="email"
                  autoComplete="email"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm font-semibold leading-6 text-white"
              >
                Téléphone
              </label>
              <div className="relative mt-2.5">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Pays
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-3 text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                  </select>

                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone-number"
                  autoComplete="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
              </div>
            </div>
            <div className="sm:col-span-2">
              {/* Champ message */}
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-white"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formState.message}
                  onChange={handleChange}
                />
                {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
              </div>
            </div>
            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={classNames(
                    agreed ? "bg-indigo-600" : "bg-gray-200",
                    "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      agreed ? "translate-x-3.5" : "translate-x-0",
                      "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                En cochant ceci vous acceptez notre{" "} <br />
                <a href="#" className="font-semibold text-indigo-600">
                  politique&nbsp;de confidentialité (Quand elle existera 😆)
                </a>
                .
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-10">
            {/* Bouton d'envoi */}
            <button
              type="submit"
              disabled={state.submitting || !agreed}
              className={
                agreed ? "flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" : "flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              }
            >
              Envoyer
            </button>
          </div>
          {/* Message de succès */}
          {state.succeeded}
        </form>
      </div>
    </>
  );
}

export default Form;
