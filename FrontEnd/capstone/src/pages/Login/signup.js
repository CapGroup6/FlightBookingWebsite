import * as React from "react";
import Link from 'next/link';

function Signup() {
  return (
    <div className="pl-14 bg-white max-md:pl-5">
      <section className="flex gap-40">
        <div className="flex flex-col w-[60%]">
          <header className="flex flex-col mt-14 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-2 self-start text-3xl font-bold text-black">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e893a466a5127afac788e7257ebec62963300ee85e5a0d660b172777b5d3967a?apiKey=e35f36ff56764292afe21d9cb1dc1589&"
                className="shrink-0 aspect-square w-[39px]"
                alt="FlightBooking Logo"
              />
              <div className="flex-auto">
                Flight<span className="">Booking</span>
              </div>
            </div>
          </header>
          <main className="flex flex-col self-end mt-10vh text-xs font-medium tracking-normal leading-3 w-[462px]">
            <div className="justify-center self-start ml-10 text-xl leading-8 text-black text-opacity-90 max-md:ml-2.5">
              Sign up to Flight Booking
            </div>
            <form className="flex flex-col justify-center mt-12 text-black text-opacity-60 max-md:mt-10 max-md:max-w-full">
              <label htmlFor="email" className="sr-only">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address *"
                className="box-border flex relative flex-col shrink-0 pl-2.5 py-4 mt-5 rounded border border-solid border-stone-300 w-73"
                required
              />
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password *"
                className="box-border flex relative flex-col shrink-0 pl-2.5 py-4 mt-5 rounded border border-solid border-stone-300 w-73"
                required
              />
              <button type="submit" className="flex justify-center items-center px-16 mt-36 text-base tracking-wide leading-7 text-white uppercase bg-blue-600 rounded shadow max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <span className="flex flex-col justify-center py-2 max-w-full w-[105px] max-md:px-5">
                  <Link href="./signupSuccess">
                  Sign up
                  </Link>
                </span>
              </button>
              <button type="button" className="flex justify-center items-center px-16 mt-5 text-base tracking-wide leading-7 text-white uppercase bg-black rounded shadow max-md:px-5 max-md:max-w-full">
                <span className="flex flex-col justify-center py-2 max-w-full w-[158px] max-md:px-5">
                  <Link href="./login">
                    BACK to login
                  </Link>
                  </span>
              </button>
            </form>
          </main>
        </div>
        <aside className="flex flex-col ml-5 w-[32%]">
          <div className="relative flex-col font-bold tracking-normal text-white whitespace-nowrap min-h-screen max-md:px-5 max-md:pt-10 max-md:mt-10 max-md:max-w-full">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/710b9f1f8bcde4a4ab6d9453fa42fba5b35dd8f9330c420836b790cbf6c7e94a?apiKey=e35f36ff56764292afe21d9cb1dc1589&" className="object-cover absolute inset-0 size-full" alt="FlightBooking Background" />
            <div className="absolute z-10 bottom-1 right-5">
              Flight Booking
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default Signup;