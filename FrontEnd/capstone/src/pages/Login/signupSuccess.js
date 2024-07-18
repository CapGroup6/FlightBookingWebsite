import * as React from "react";
import { useState } from 'react'; 
import Link from 'next/link';

/*
 * Author: Jiawei Zhou
 * Final Edit Date: 2024/07/03
*/

function SignupSuccess() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      if (email && password) {
        openModal();
      } else {
        alert('Please enter email and password');
      }
    };
  
    return (
      <div className="pl-14 bg-white">
          <section className="flex gap-5 h-screen">
            <aside className="flex flex-col w-[80%]">
              <header className="flex flex-col mt-14">
                <Link href="/">
                <div className="flex gap-3 text-3xl font-bold">
                  <img
                    src="/images/airplane.png"
                    alt="Logo"
                  />
                  <h1 >
                    FlightSearch
                  </h1>
                </div>
                </Link>
              </header>
              <div className="flex-grow flex items-center">
                <form className="flex flex-col justify-content: space-between mx-auto my-auto">
                <div>
                  <h2 className="text-xl">Congratulations!</h2>
                  <h2 className="text-xl mt-2">You have successfully signed up for FlightSearch</h2>
                  <p className="mt-2">Please click the button below to continue to login.</p>
                  {/* <PreferencePopup isOpen={modalIsOpen} onRequestClose={closeModal} /> */}
                </div>
                <div className="flex flex-col">
                    <button
                        type="button"
                        className="py-2 mt-40 text-base uppercase bg-black rounded text-white w-full"
                    >
                        <Link href="./login">
                            Back to Login
                        </Link>
                    </button>
                </div>
                </form>
              </div>
            </aside>
            
            <aside className="w-[60%] max-md:ml-0 max-md:w-full">
              <div className="flex justify-end items-end h-full w-full p-4" style={{backgroundImage: 'url("/images/loginback.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: "100%"
            }}>
              <h1 className="text-white text-2xl font-bold">FlightSearch</h1>
              </div>
            </aside>
          </section>
        </div>
    );
}

export default SignupSuccess;