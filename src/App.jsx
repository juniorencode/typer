import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {
  const [code, setCode] = useState(`function isPalindrome(str) {
  const cleanedStr = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  return cleanedStr === cleanedStr.split('').reverse().join('');
}
`);

  return (
    <div className="flex flex-col items-center max-w-screen-lg mx-auto">
      <div className="title my-10">
        <h1 className="text-6xl font-black tracking-widest select-none text-white">
          TYPER
        </h1>
      </div>
      <div className="px-2 py-10 w-full">
        <div className="w-full rounded-xl overflow-hidden border border-white/20">
          <div className="flex items-center gap-2 px-4 w-full h-12 bg-black bg-opacity-80">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="relative px-8 py-6 w-full min-h-[300px] backdrop-blur-xl bg-black bg-opacity-60">
            <pre className="absolute text-2xl tracking-wide leading-8 text-neutral-400">
              {code}
            </pre>
            <pre className="absolute text-2xl tracking-wide leading-8 text-white">
              {code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
