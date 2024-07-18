import * as React from "react";
import { useState } from 'react';
import { useRouter } from 'next/router'; 
import Link from 'next/link'; 
import { Phone } from "@mui/icons-material";

/*
 * Author: Jiawei Zhou
 * Final Edit Date: 2024/07/03
*/

function Signup() {
  const [formData, setFormData] = useState({
    username: '', 
    password: '',
    phone: '', 
    email: '',
  });

  const router = useRouter(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Registration successful');
        router.push('/Login/signupSuccess').catch((err) => console.error('Failed to redirect:', err)); 
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
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
              <form className="max-w-xs mx-auto my-auto" onSubmit={handleSubmit}>
                <h2 className="text-xl">Sign up to FlightSearch</h2>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address *"
                  className="p-2.5 mt-5 rounded border border-solid border-stone-300 w-full"
                  required
                  onChange={handleChange}
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password *"
                  className="p-2.5 mt-5 rounded border border-solid border-stone-300 w-full"
                  required
                  onChange={handleChange}
                />             
                <button
                    type="submit"
                    className="flex gap-2 justify-center py-2 mt-8 text-base uppercase bg-black rounded text-white w-full" style={{backgroundColor: "#B0DDFE"}}
                  >      
                    Sign up
                </button>
                
                <button
                  type="button"
                  className="py-2 mt-4 text-base uppercase bg-black rounded text-white w-full"
                >
                    <Link href="./login">
                      Back to Login
                    </Link>
                </button>
              </form>
            </div>
          </aside>
          
          <aside className="flex justify-end items-end w-[60%] max-md:ml-0 max-md:w-full">
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

export default Signup;