import { useState } from 'react';
import * as React from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "../../translations/en.json";
import zh from "../../translations/zh.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });


function Dropdown({ options, id, placeholder }) {
    const [selected, setSelected] = useState('');
    const { t } = useTranslation();
    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
      <select id={id} className={`px-2.5 py-1.5 bg-white rounded-md border-2 border-solid border-zinc-500 ${selected ? 'selected' : ''}`} value={selected} onChange={handleChange} style={{width: '52vh'}}>
        <option value="" disabled>{t(placeholder)}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {t(option)}
          </option>
        ))}
      </select>
    );
}

function UserProfileForm() {
    const [isIconClicked, setIsIconClicked] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const { t, i18n } = useTranslation();
    const [dropdownPairs, setDropdownPairs] = useState([{}]);
    const [selectedButton, setSelectedButton] = useState('Male');

    const addDropdownPair = () => {
        setDropdownPairs([...dropdownPairs, {}]);
    };
    const removeDropdownPair = (index) => {
        setDropdownPairs(dropdownPairs.filter((_, i) => i !== index));
    };

  return (
    <section className="flex flex-col pb-12 bg-white fullHeight">
        <header className="flex justify-between px-6 py-7 w-full bg-white border border-solid border-stone-50 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <div className="flex gap-5">
                <button className="flex px-5 items-center gap-2 bg-black text-white rounded-lg">
                    <span>+ AI Chatbot</span>
                </button>
            </div>
            <div className="flex gap-5 max-md:flex-wrap max-md:max-w-full">
                <select id="Language"
                className="px-1 bg-white rounded-md border-1 border-solid border-zinc-500"
                style={{width: '20vh',outline: 'none', color:'black'}}
                onChange={(event) => i18n.changeLanguage(event.target.value)}>
                    <option value="" selected disabled >{t('Language')}</option>
                    <option value="en">{t('English')}</option>
                    <option value="zh">{t('Chinese')}</option>
                </select>
                <select id="Currency" className="px-1 bg-white rounded-md border-1 border-solid border-zinc-500" style={{width: '20vh',outline: 'none', color:'black'}}>
                    <option value="" selected disabled>{t('Currency')}</option>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                    <option value="EUR">EUR</option>
                </select>

                <AccountCircleOutlinedIcon fontSize='large' 
                onClick={()=>setIsIconClicked(!isIconClicked)}
                style={isIconClicked ? { textDecoration: 'underline', color: 'blue' }: {}}/>

                <button className="flex mt-2 gap-2 justify-center px-5 rounded-md text-black" type="button" 
                onClick={()=>setIsButtonClicked(!isButtonClicked)}
                style={isButtonClicked ? { textDecoration: 'underline', color: 'blue', border: 'none' } : { border: 'none' }}>
                    {t('Welcome')}
                </button>
                <div className="flex gap-2 text-3xl font-bold text-black">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e893a466a5127afac788e7257ebec62963300ee85e5a0d660b172777b5d3967a?apiKey=e35f36ff56764292afe21d9cb1dc1589&"
                        alt="Logo"
                        className="shrink-0 aspect-square w-[39px]"
                    />
                <div className="flex-auto my-auto">
                    FlightSearch
                </div>
                </div>
            </div>
        </header>
        <main className="grid grid-cols-2 mt-5 ml-20 mr-20 gap-5">
        <h1 className="pt-2 pb-0.5 text-3xl font-semibold text-black md:max-w-full md:text-4xl col-span-2 text-left">{t('Edit profile')}</h1>
        <div className="flex flex-col max-w-full">
          <label htmlFor="firstName" className="text-l font-semibold text-zinc-900">{t('First Name')}</label>
          <input id="firstName" className="justify-center items-start px-5 py-1 mt-3 text-l font-medium whitespace-nowrap bg-white rounded-md border-2 border-solid border-zinc-500 text-zinc-500 md:px-5 md:max-w-full" type="text" placeholder="Mehrab" />
        </div>
        <div className="flex flex-col max-w-full">
          <label htmlFor="lastName" className="text-l font-semibold text-zinc-900 md:max-w-full">{t('Last Name')}</label>
          <input id="lastName" className="justify-center items-start px-5 py-1 mt-3 text-l font-medium whitespace-nowrap bg-white rounded-md border-2 border-solid border-zinc-500 text-zinc-500 md:px-5 md:max-w-full" type="text" placeholder="Bozorgi" />
        </div>

      <label htmlFor="gender" className="font-semibold col-span-2 leading-[77%] text-l md:max-w-full">{t('Gender')}</label>
      
      <div className="grid grid-cols-3 justify-items-center mt-2 text-l md:max-w-full col-span-2">
        <button 
          className={`justify-center px-10 py-1 whitespace-nowrap bg-white rounded-lg border-2 border-solid ${selectedButton === 'Male' ? 'border-black text-black' : 'border-gray-300 border-opacity-60 text-gray-300'}`}
          type="button"
          onClick={() => setSelectedButton('Male')}
          >
          {t('Male')}
        </button>
        <button 
          className={`justify-center px-10 py-1 whitespace-nowrap bg-white rounded-lg border-2 border-solid ${selectedButton === 'Female' ? 'border-black text-black' : 'border-gray-300 border-opacity-60 text-gray-300'}`} 
          type="button" 
          onClick={() => setSelectedButton('Female')}
          >
          {t('Female')}
        </button>
        <button 
          className={`justify-center px-10 py-1 whitespace-nowrap bg-white rounded-lg border-2 border-solid ${selectedButton === 'Prefer not to say' ? 'border-black text-black' : 'border-gray-300 border-opacity-60 text-gray-300'}`} 
          type="button" 
          onClick={() => setSelectedButton('Prefer not to say')}
          >
          {t('Prefer not to say')}
        </button>
      </div>
      <div className="flex flex-col max-w-full">
        <label htmlFor="contactNumber" className="text-l font-semibold md:max-w-full">{t('Contact Number')}</label>
        <input id="contactNumber" className="justify-center items-start px-5 py-1 mt-3 text-l font-medium whitespace-nowrap bg-white rounded-md border-2 border-solid border-zinc-500 text-zinc-500 md:px-5 md:max-w-full" type="text" placeholder="58077.79" />
      </div>
      <div className="flex flex-col max-w-full">
        <label htmlFor="email" className="font-semibold text-l md:max-w-full">{t('Email')}</label>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address *"
            className="justify-center px-5 py-1 mt-3 text-l font-medium bg-white rounded-md border-2 border-solid border-zinc-500 w-70"
        />
      </div>
      <label htmlFor="passport" className="text-l font-semibold col-span-2 text-zinc-900">{t('Passport & Visa Type')}</label>
      {dropdownPairs.map((_, index) => (
          <div key={index} className="grid grid-cols-2 col-span-2 w-full">
              <div className="flex flex-col w-full">
                  <Dropdown id="CountryVisa" options={['China','Canada','India']} placeholder="Country Name" />
              </div>
              <div>
                <div className="flex items-center gap-5">
                  <Dropdown id="VisaType" options={['Study Permit', 'Work Permit']} placeholder="Visa Type" />
                  <AddCircleIcon
                  onClick={addDropdownPair} />
                  {dropdownPairs.length > 1 && <RemoveCircleIcon onClick={() => removeDropdownPair(index)} />}
                </div>
              </div>
          </div>
      ))}
      <button className="justify-self-center md:justify-self-start" type="button">
        <div className="px-12 py-2 bg-white rounded-md border-2 border-blue-600 border-solid text-blue-600 md:px-5">
          {t('Cancel')}
        </div>
      </button>
      <button className="justify-self-center md:justify-self-end" type="submit">
        <div className="px-12 py-2 bg-blue-600 rounded-md text-white md:px-5">
          {t('Save')}
        </div>
      </button>
        </main>
    </section>
  );
}

export default UserProfileForm;