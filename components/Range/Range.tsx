export type RangeProps = {
  label?: string;
  min?: number;
  max?: number;
  value: [number?, number?];
};

export function Range({ label, min: _min, max: _max, value }: RangeProps) {
  const min = _min ?? 0;
  const max = _max ?? 100;
  const v0 = value[0] ?? min;
  const v1 = value[1] ?? min;
  const range = max - min;
  const left = (100 * (v0 - min)) / range;
  const width = (100 * (v1 - v0)) / range;
  return (
    <div className="mb-8">
      <h4 className="uppercase text-lg underline">{label}</h4>
      <div className="block relative w-full h-5 bg-paper m-1 box-border">
        <div className="box-border absolute top-1/2 left-0 right-0 h-[1px] w-full bg-black before:h-4 before:w-[1px] before:top-0 before:left-3 before:bg-black before:absolute after:h-4 after:w-[1px] after:bg-black after:absolute after:top-0 after:right-3"></div>
        <div className="w-[100%] h-5 block m-auto relative">
          <span className="block absolute top-full left-[14px] text-center -translate-x-1/2">
            {min}
          </span>
          <span className="block absolute left-auto top-full right-[15px] text-center translate-x-1/2">
            {max}
          </span>
          <div
            style={{ width: `${width}%`, left: `${left}%` }}
            className="absolute top-0 bottom-0 block h-full bg-purple-300 border-l-2 border-black border-r-2"
          >
            <div className="absolute flex w-full my-2 h-full">
              <div className="absolute block top-full left-0 w-full ">
                <span className="absolute -left-1 text-sm">{value[0]}</span>
                <span className="absolute -right-1 text-sm">{value[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}