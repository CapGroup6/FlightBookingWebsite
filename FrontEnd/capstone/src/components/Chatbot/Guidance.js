// src/components/Chatbot/Guidance.js
import React from 'react';

const Guidance = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-blue-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-800">✈️ FlightSearch</h1>
      </div>
      <div className="grid grid-cols-3 gap-8 w-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Examples</h2>
          <p className="bg-white p-4 rounded-lg shadow-md mb-4 text-blue-800">"I want to visit Shanghai, when the flights are the cheapest?"</p>
          <p className="bg-white p-4 rounded-lg shadow-md mb-4 text-blue-800">"I have a two-week vacation in July and my budget on flight is 2000, any recommendations for the destination?"</p>
          <p className="bg-white p-4 rounded-lg shadow-md text-blue-800">"I'm in Vancouver and plan to go to Hong Kong at the end of July and return in early September. I want to find low-cost flights with a layover in Japan."</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Capabilities</h2>
          <p className="bg-white p-4 rounded-lg shadow-md mb-4 text-blue-800">Remembers what user said earlier in the conversation.</p>
          <p className="bg-white p-4 rounded-lg shadow-md mb-4 text-blue-800">Allows user to provide follow-up corrections.</p>
          <p className="bg-white p-4 rounded-lg shadow-md text-blue-800">Trained to decline inappropriate requests.</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Limitations</h2>
          <p className="bg-white p-4 rounded-lg shadow-md mb-4 text-blue-800">May occasionally generate incorrect information.</p>
          <p className="bg-white p-4 rounded-lg shadow-md mb-4 text-blue-800">May occasionally produce harmful instructions or biased content.</p>
          <p className="bg-white p-4 rounded-lg shadow-md text-blue-800">May provide less inspiring advice on other areas besides information related to tickets and flights.</p>
        </div>
      </div>
    </div>
  );
};

export default Guidance;
