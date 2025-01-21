import { useEngine } from './hooks/useEngine.hook';
import { Character } from './components/Character';
import { Caret } from './components/Caret';

const App = () => {
  const { words, typed, totalTyped } = useEngine();
  const typedCharacters = typed.split('');

  return (
    <div className="flex flex-col items-center max-w-screen-lg mx-auto">
      <div className="my-10">
        <h1 className="text-6xl text-shadow font-black tracking-widest select-none text-white">
          {'</typer>'}
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
              {words}
            </pre>
            <pre className="absolute text-2xl tracking-wide leading-8 text-white">
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
    </div>
  );
};

export default App;
