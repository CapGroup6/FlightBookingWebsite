import React, { useState, useEffect, useRef} from "react";
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function FormLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-5 text-slate-700 self-start">
      {children}
    </label>
  );
}

function TextInput({ id, placeholder }) {
  return (
    <input
      id={id}
      className="px-3.5 py-2.5 bg-white rounded-lg border border-gray-300 shadow-sm text-base leading-6 text-gray-500"
      placeholder={placeholder}
      aria-label={placeholder}
    />
  );
}

function Dropdown({ options, id }) {
  return (
    <select id={id} className="px-2.5 py-1.5 bg-white rounded-md border-2 border-solid border-zinc-500">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function PreferencePopup({isOpen, onRequestClose}) {
  const [birthDate, setBirthDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef();
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  const genders = ['Female', 'Male', 'Prefer not to say'];

  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="modal-content modal"
    >
        <div className="flex flex-col bg-white rounded-xl shadow-xl max-w-[688px]">
        <header className="flex flex-col w-full bg-white max-md:max-w-full">
            <div className="flex flex-col px-6 pt-6 w-full bg-white max-md:px-5 max-md:max-w-full">
            <h1 className="text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">Welcome to Flight Booking!</h1>
            <p className="mt-1 text-sm leading-5 text-slate-600 max-md:max-w-full">
                To provide a more personalized service, we need to know a bit more about you. Please fill in the following blanks:
            </p>
            </div>
            <hr className="mt-5 w-full bg-gray-200 min-h-[1px] max-md:max-w-full" />
        </header>

        <form className="flex flex-col px-6 pt-5 w-full max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 text-sm font-medium leading-5 text-slate-700 max-md:flex-wrap">
            <FormLabel htmlFor="firstName">First Name*</FormLabel>
            <input type="text" id="firstName" placeholder="e.g. David" />
            <FormLabel htmlFor="lastName">Last Name*</FormLabel>
            <TextInput id="lastName" placeholder="e.g. Smith" />
            </div>

            <div className="flex gap-5 mt-4 max-md:flex-wrap">
            <FormLabel htmlFor="dob">Date of Birth*</FormLabel>
            <div className="flex flex-col flex-1 justify-center text-base leading-6 text-gray-500 whitespace-nowrap max-md:max-w-full">
                <div className="flex flex-col justify-center max-md:max-w-full">
                <div className="flex flex-col justify-center max-md:max-w-full">
                    <div className="flex gap-2 items-center px-3 py-2 bg-white rounded-lg border border-gray-300 shadow-sm max-md:flex-wrap max-md:pr-5">
                    <div className="flex-1 self-stretch">{birthDate ? birthDate.toLocaleDateString() : ''}</div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ca732f50c12e3b87707f157a52dec077f76ab8507575e306250a15f2a545598?apiKey=e35f36ff56764292afe21d9cb1dc1589&"
                        alt=""
                        className="shrink-0 self-stretch my-auto w-5 aspect-square"
                        onClick={() => setBirthDate(null)}
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/801d9bb48161d6534e0df7c9ec4167c67e3d8d424e667491d9f14e7d2ca78792?apiKey=e35f36ff56764292afe21d9cb1dc1589&"
                        alt=""
                        className="shrink-0 self-stretch my-auto w-5 aspect-square"
                        onClick={() => setShowCalendar(!showCalendar)}
                    />
                    {showCalendar && (
                    <div ref={calendarRef} style={{position: 'absolute', zIndex: 1000}}>
                      <Calendar
                        onChange={(date) => {
                          setBirthDate(date);
                          setShowCalendar(false);
                        }}
                        value={birthDate}
                      />
                      </div>
                    )}
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="flex gap-5 mt-4 text-sm max-md:flex-wrap">
            <FormLabel htmlFor="gender">Gender*</FormLabel>
            <div className="flex flex-col flex-1 justify-center text-gray-300 text-opacity-60 max-md:max-w-full">
                <div className="flex gap-5 justify-between pl-6 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
                <div
                    className="justify-center px-5 py-2.5 text-gray-500 whitespace-nowrap bg-white rounded-lg border-2 border-gray-500"
                    role="button"
                    tabIndex="0"
                >
                    Female
                </div>
                <div
                    className="justify-center px-5 py-2.5 whitespace-nowrap bg-white rounded-lg border-2 border-solid border-gray-300 border-opacity-60"
                    role="button"
                    tabIndex="0"
                >
                    Male
                </div>
                <div
                    className="justify-center px-5 py-2.5 bg-white rounded-lg border-2 border-solid border-gray-300 border-opacity-60"
                    role="button"
                    tabIndex="0"
                >
                    Prefer not to say
                </div>
                </div>
            </div>
            </div>

            <div className="flex mt-4 gap-5 text-sm font-medium leading-5 text-slate-700 max-md:flex-wrap">
            <FormLabel htmlFor="firstName">Phone*</FormLabel>
            <TextInput id="firstName" placeholder="11225443" />
            <FormLabel htmlFor="lastName">Country*</FormLabel>
            <TextInput id="lastName" placeholder="Canada" />
            </div>

            <div className="flex gap-5 mt-4 w-full max-md:flex-wrap max-md:max-w-full">
            <FormLabel htmlFor="passportVisa">Passport & Visa Type*</FormLabel>
            <div className="flex flex-1 gap-5 justify-between items-start pr-1.5 pb-12 text-base leading-6 text-gray-500 max-md:flex-wrap">
                <Dropdown id="passportVisa" options={['Country', 'Passport / Visa']} />
                <Dropdown id="passportVisaType" options={['Passport / Visa', 'Visa Type']} />
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/baec27309b2051164fdd4c33001e2243af1a9b8a97b5e949a5f91469e8e5811f?apiKey=e35f36ff56764292afe21d9cb1dc1589&" alt="" className="shrink-0 aspect-square w-[34px]" />
            </div>
            </div>

            <footer className="flex flex-col pt-8 w-full max-md:max-w-full">
            <hr className="w-full bg-gray-200 min-h-[1px] max-md:max-w-full" />
            <div className="flex gap-3 px-6 pb-6 w-full text-base font-semibold leading-6 whitespace-nowrap max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                <button 
                onClick={onRequestClose}
                type="button" className="flex-1 justify-center items-center px-5 py-2.5 bg-white rounded-lg border border-gray-300 shadow-sm text-slate-700 max-md:px-5">
                Cancel
                </button>
                <button type="submit" className="flex-1 justify-center items-center px-5 py-2.5 text-white bg-blue-600 rounded-lg border border-violet-500 shadow-sm max-md:px-5">
                Confirm
                </button>
            </div>
            </footer>
        </form>
        </div>
    </Modal>
  );
}

export default PreferencePopup;

