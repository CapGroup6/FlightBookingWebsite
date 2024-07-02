import * as React from "react";
import Link from 'next/link';

function Login() {
  return (
    <form className="pl-14 bg-white max-md:pl-5 fullHeight">
      <section className="flex gap-5 max-md:flex-col max-md:gap-0">
        <aside className="flex flex-col w-[35%] max-md:ml-0 max-md:w-full">
          <header className="flex flex-col mt-14 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-2 text-3xl font-bold text-black max-md:flex-wrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e893a466a5127afac788e7257ebec62963300ee85e5a0d660b172777b5d3967a?apiKey=e35f36ff56764292afe21d9cb1dc1589&"
                alt="Logo"
                className="shrink-0 aspect-square w-[39px]"
              />
              <h1 className="flex-auto">
                Flight<span className="">Booking</span>
              </h1>
            </div>
          </header>
          <article className="flex flex-col items-start pl-20 mt-44 text-base font-medium tracking-normal leading-6 text-black text-opacity-60 max-md:pl-5 max-md:mt-10 max-md:max-w-full">
            <h2 className="justify-center text-xl leading-8 text-black text-opacity-90">Sign in</h2>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address *"
              className="box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300 w-72"
              required
            />
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password *"
              className="box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300 w-72"
              required
            />
            <div className="flex flex-col justify-center mt-4"></div>
            <div className="flex flex-col justify-center mt-6"></div>
            
            <button
                type="submit"
                className="flex justify-center mt-4 text-base tracking-wide leading-7 uppercase whitespace-nowrap bg-blue-600 rounded shadow text-white text-opacity-90 max-md:px-5 w-88"
              >
                <span className="flex gap-2 justify-center px-36 mt-2 mb-1 text-base tracking-wide leading-7 uppercase rounded shadow text-white text-opacity-90 max-md:px-5 w-88">
                Login
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ab0078c1548ce39de48ada5bd6cfdf81102c3a39f99cafc86282e592e3b282b?apiKey=e35f36ff56764292afe21d9cb1dc1589&"
                    alt=""
                    className="shrink-0 self-center my-auto aspect-[0.82] w-[18px]"
                  />
                </span>
              </button>

            <button
              type="button"
              className="flex flex-col justify-center px-16 mt-4 text-base tracking-wide leading-7 uppercase bg-black rounded shadow text-white text-opacity-90 max-md:px-5"
            >
              <span className="flex flex-col justify-center px-6 py-2 max-md:px-5 max-md:mx-1">
                <Link href="./signup">
                  Create New Account
                </Link>
              </span>
            </button>
          </article>
        </aside>
        <aside className="flex flex-col ml-5 w-[65%] max-md:ml-0 max-md:w-full">
          <div className="flex grow justify-center items-center px-16 py-20 w-full bg-gray-50 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <figure className="flex overflow-hidden relative flex-col pt-2.5 mt-52 max-w-full min-h-[412px] w-[452px] max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac0d735a533aa0a60de51448d6858e3ae1aa1cc98732398b7114235182702be2?apiKey=e35f36ff56764292afe21d9cb1dc1589&"
                alt="Flight Booking"
                className="object-cover absolute inset-0 size-full"
              />
              <figcaption className="relative shrink-0 h-[402px] max-md:max-w-full"></figcaption>
            </figure>
          </div>
        </aside>
      </section>
    </form>
  );
}

export default Login;