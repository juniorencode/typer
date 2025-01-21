import { useEngine } from './hooks/useEngine.hook';
import { Character } from './components/Character';
import { Caret } from './components/Caret';
import { Chart } from './components/Chart';

const App = () => {
  const { words, typed, totalTyped } = useEngine();
  const typedCharacters = typed.split('');

  return (
    <div className="flex flex-col items-center gap-4 mx-auto pt-4 px-2 max-w-screen-lg backdrop-blur-xl">
      <div className="py-10 w-full text-center rounded-xl border bg-black/60 border-white/10">
        <h1 className="text-6xl sm:text-8xl text-shadow font-nexa tracking-widest select-none text-white">
          {'</typer>'}
        </h1>
      </div>
      <div className="w-full">
        <div className="w-full rounded-xl overflow-hidden border border-white/10">
          <div className="flex items-center justify-between px-4 w-full h-12 bg-black bg-opacity-80">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-right text-2xl tracking-widest text-white">
              2m 36s
            </div>
          </div>
          <div className="relative w-full min-h-[100px] backdrop-blur-xl bg-black/60">
            <pre className="px-8 py-6 text-2xl font-roboto tracking-wide leading-8 text-neutral-400">
              {words}
            </pre>
            <pre className="absolute top-0 px-8 py-6 text-2xl font-roboto tracking-wide leading-8 text-white">
              {typedCharacters.map((char, index) => (
                <Character
                  key={`${char}_${index}`}
                  actual={char}
                  expected={words[index]}
                />
              ))}
              <Caret words={words} totalTyped={totalTyped} />
            </pre>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-3 lg:grid-cols-5 gap-4 w-full text-sm tracking-wider text-neutral-400">
        <div className="col-span-1 px-2 py-4 rounded-xl border backdrop-blur-xl bg-black/60 border-white/10">
          <div>words per minute</div>
          <div className="text-4xl font-bold text-white">46</div>
        </div>
        <div className="col-span-1 px-2 py-4 rounded-xl border backdrop-blur-xl bg-black/60 border-white/10">
          <div>characters per minute</div>
          <div className="text-4xl font-bold text-white">230</div>
        </div>
        <div className="col-span-1 px-2 py-4 rounded-xl border backdrop-blur-xl bg-black/60 border-white/10">
          <div>accuracy</div>
          <div className="text-4xl font-bold text-white">98%</div>
        </div>
        <div className="col-span-1 px-2 py-4 rounded-xl border backdrop-blur-xl bg-black/60 border-white/10">
          <div>time</div>
          <div className="text-4xl font-bold text-white">2m 36s</div>
        </div>
        <div className="col-span-1 px-2 py-4 rounded-xl border backdrop-blur-xl bg-black/60 border-white/10">
          <div>mistkes</div>
          <div className="text-4xl font-bold text-white">3</div>
        </div>
      </div>
      <Chart />
    </div>
  );
};

export default App;
