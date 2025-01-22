import { useEngine } from './hooks/useEngine.hook';
import {
  calculateCPM,
  calculateWPM,
  calculateAcc,
  formatTime
} from './utilities/utils.utilities';
import { Character } from './components/Character';
import { Caret } from './components/Caret';
import { Chart } from './components/Chart';

const App = () => {
  const { state, time, corrects, errors, words, typed, history } = useEngine();
  const typedCharacters = typed.split('');

  return (
    <div className="flex flex-col items-center gap-4 mx-auto px-2 py-4 max-w-screen-lg backdrop-blur-xl">
      <div className="py-10 w-full text-center rounded-xl border bg-black/60 border-white/10">
        <h1 className="text-3xl xs:text-5xl sm:text-6xl lg:text-8xl text-shadow font-nexa tracking-widest select-none text-white">
          {'</speed-typer>'}
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
            <div className="text-right text-lg tracking-widest text-white">
              ~javascript
            </div>
          </div>
          <div className="relative w-full min-h-[100px] text-sm sm:text-md md:text-lg lg:text-2xl backdrop-blur-xl bg-black/60">
            <pre className="px-8 py-6 font-roboto tracking-wide leading-8 text-neutral-400">
              {words}
            </pre>
            {(state === 'start' || state === 'run') && (
              <pre className="absolute top-0 px-8 py-6 font-roboto tracking-wide leading-8 text-white">
                {typedCharacters.map((char, index) => (
                  <Character
                    key={`${char}_${index}`}
                    actual={char}
                    expected={words[index]}
                  />
                ))}
                {state === 'run' && (
                  <Caret words={words} length={typed.length} />
                )}
              </pre>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-3 lg:grid-cols-5 gap-4 w-full text-sm tracking-wider text-neutral-400">
        <div className="col-span-1 px-2 py-4 rounded-xl border backdrop-blur-xl bg-black/60 border-white/10">
          <div>words per minute</div>
          <div className="text-4xl font-bold text-white">
            {calculateWPM(typed.length, time)}
          </div>
        </div>
        <div className="col-span-1 px-2 py-4 rounded-xl border backdrop-blur-xl bg-black/60 border-white/10">
          <div>characters per minute</div>
          <div className="text-4xl font-bold text-white">
            {calculateCPM(typed.length, time)}
          </div>
        </div>
        <div className="col-span-1 px-2 py-4 rounded-xl border backdrop-blur-xl bg-black/60 border-white/10">
          <div>accuracy</div>
          <div className="text-4xl font-bold text-white">
            {`${calculateAcc(corrects, errors)} %`}
          </div>
        </div>
        <div className="col-span-1 px-2 py-4 rounded-xl border backdrop-blur-xl bg-black/60 border-white/10">
          <div>time</div>
          <div className="text-4xl font-bold text-white">
            {formatTime(time)}
          </div>
        </div>
        <div className="col-span-1 px-2 py-4 rounded-xl border backdrop-blur-xl bg-black/60 border-white/10">
          <div>mistkes</div>
          <div className="text-4xl font-bold text-white">{errors}</div>
        </div>
      </div>
      <Chart data={history} />
    </div>
  );
};

export default App;
