import * as React from "react";
import logoMap from '../components/Common/logoMap';

const AirlineOption = ({ imageSrc, name }) => (
  <div className="flex gap-2 items-center pr-5 mt-3 text-sm leading-4 whitespace-nowrap text-sky-950">
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae0468d37a20fd573420f80c054c1e39feffc85fc5ba4ba0890c74d141ca14a8?apiKey=e35f36ff56764292afe21d9cb1dc1589&" className="shrink-0 self-stretch aspect-[1.04] w-[25px]" alt="" />
    <img loading="lazy" src={imageSrc} className="shrink-0 self-stretch my-auto aspect-square w-[18px]" alt={`${name} logo`} />
    <div className="flex-auto self-stretch my-auto">{name}</div>
  </div>
);

const TimeSlider = ({ label, value }) => (
  <div className="flex flex-col pt-2 pb-0.5 mt-5 w-full">
    <div className="flex flex-col w-full">
      <div className="flex gap-5 text-xs leading-5">
        <div className="text-gray-500">{label}</div>
        <div className="flex-auto text-slate-400">{value}</div>
      </div>
      <div className="flex gap-0 items-start mt-2.5">
        <div className="shrink-0 w-2.5 rounded-full border border-black border-solid bg-white bg-opacity-90 h-[9px] stroke-[1px]" />
        <div className="shrink-0 self-stretch my-auto max-w-full h-px bg-black w-[272px]" />
        <div className="shrink-0 w-2.5 rounded-full border border-black border-solid bg-white bg-opacity-90 h-[9px] stroke-[1px]" />
      </div>
    </div>
    <div className="flex gap-5 justify-between w-full text-xs leading-5 whitespace-nowrap text-slate-400">
      <div>00:00</div>
      <div>24:00</div>
    </div>
  </div>
);

function MyComponent() {
    const airlineOptions = Object.entries(logoMap).map(([name, imageSrc]) => ({ name, imageSrc }));

  return (
    <section className="flex flex-col max-w-[333px]">
      <header className="justify-center items-start px-9 py-3.5 w-full text-sm leading-5 text-center text-gray-500 whitespace-nowrap bg-sky-200">
        Preference
      </header>
      <main>
        <div className="flex gap-5 justify-between py-3 pr-14 mt-5 w-full text-sm leading-5 rounded-sm border border-gray-300 border-solid text-sky-950">     
          <div>All Airlines</div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6711331a7a01d381e3668778eb46261c46c102739c5a1f11369941d95f312479?apiKey=e35f36ff56764292afe21d9cb1dc1589&" className="shrink-0 w-4 aspect-square" alt="Expand icon" />
        </div>
        {airlineOptions.map(({ name, imageSrc }) => (
            <div key={name} className="airline-option">
              <img src={imageSrc} alt={name} title={name} className="airline-logo" />
              <div>{name}</div>
            </div>
          ))}
        <div className="flex gap-5 justify-between py-3 pr-14 mt-5 w-full text-sm leading-5 rounded-sm border border-gray-300 border-solid text-sky-950">
          <div>Stopover Cities</div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6711331a7a01d381e3668778eb46261c46c102739c5a1f11369941d95f312479?apiKey=e35f36ff56764292afe21d9cb1dc1589&" className="shrink-0 w-4 aspect-square" alt="Expand icon" />
        </div>
        <div className="flex gap-5 justify-between py-3 pr-14 mt-5 w-full text-sm leading-5 whitespace-nowrap rounded-sm border border-gray-300 border-solid text-sky-950">
          <div>Airports</div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6711331a7a01d381e3668778eb46261c46c102739c5a1f11369941d95f312479?apiKey=e35f36ff56764292afe21d9cb1dc1589&" className="shrink-0 w-4 aspect-square" alt="Expand icon" />
        </div>
        <h2 className="mt-5 w-full text-sm leading-5 text-black">Times</h2>
        <TimeSlider label="Departure time" value="00:00-24:00" />
        <TimeSlider label="Arrival time" value="00:00-24:00" />
      </main>
    </section>
  );
}

export default MyComponent;