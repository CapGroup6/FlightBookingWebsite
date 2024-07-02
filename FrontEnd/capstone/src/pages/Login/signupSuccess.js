import * as React from "react";
import Link from 'next/link';

function SignupSuccess() {
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
                                Flight Booking
                            </div>
                        </div>
                    </header>
                    <main className="flex flex-col self-end mt-10vh font-medium tracking-normal leading-3 w-[668px]">
                        <div style={{fontSize: '2rem'}} className="justify-center self-start leading-8 text-black text-opacity-90">
                        Congratulations! <br/><br/>
                        Your account has been successfully created.
                        </div>
                        <div className="mt-7 text-2xl leading-5 max-md:max-w-full">
                        Please click the button below to continue to login.
                        </div>
                        <button
                        className="flex justify-center items-center px-16 mt-40 text-base tracking-wide leading-7 text-white uppercase bg-black rounded shadow max-md:px-5 max-md:max-w-full"
                        tabIndex="0"
                        >
                        <div className="flex flex-col justify-center py-3 max-w-full w-[158px] max-md:px-5">
                        <span className="justify-center">
                            <Link href="./login">
                            BACK to login
                            </Link>
                        </span>
                        </div>
                        </button>
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

export default SignupSuccess;