import * as React from "react";
import { useState } from 'react'; 
import Link from 'next/link';
import PreferencePopup from './preferencePopup'; 

function Login() {

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
          <aside className="flex flex-col w-[40%]">
            <header className="flex flex-col mt-14">
              <div className="flex gap-3 text-3xl font-bold">
                <img
                  src="/images/airplane.png"
                  alt="Logo"
                />
                <h1 >
                  FlightSearch
                </h1>
              </div>
            </header>
            <div className="flex-grow flex items-center">
              <form className="max-w-xs mx-auto my-auto">
                <h2 className="text-xl">Sign in</h2>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address *"
                  className="p-2.5 mt-5 rounded border border-solid border-stone-300 w-full"
                  required
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password *"
                  className="p-2.5 mt-5 rounded border border-solid border-stone-300 w-full"
                  required
                />             
                <button
                    type="submit"
                    onClick = {
                      handleLogin}
                    className="flex gap-2 justify-center py-2 mt-8 text-base uppercase bg-black rounded text-white w-full" style={{backgroundColor: "#B0DDFE"}}
                  > 
                    Login
                      <img
                        src="/images/ArrowForward.png"
                        alt="forward arrow"
                        className=" my-auto"
                      />
                </button>
                {/* <PreferencePopup isOpen={modalIsOpen} onRequestClose={closeModal} /> */}
                <button
                  type="button"
                  className="py-2 mt-4 text-base uppercase bg-black rounded text-white w-full"
                >
                    <Link href="./signup">
                      Create New Account
                    </Link>
                </button>
              </form>
            </div>
          </aside>
          
          <aside className="w-[60%] max-md:ml-0 max-md:w-full">
            <div className="flex justify-center items-center" style={{backgroundImage: 'url("/images/loginback.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: "100%"
          }}>
            <img
              src="/images/login.png"
              alt="Flight Search"
              className="object-cover"
            />
            </div>
          </aside>
        </section>
      </div>
  );
}

export default Login;