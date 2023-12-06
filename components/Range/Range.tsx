export type RangeProps = {
  min?: number;
  max?: number;
  value: [number, number];
};

export function Range({ min, max, value }: RangeProps) {
  const range = (max ?? 100) - (min ?? 0);
  const left = (100 * value[0]) / range;
  const width = (100 * (value[1] - value[0])) / range;
  return (
    <div className="block relative w-full h-5 bg-paper m-1 box-border">
      <div className="box-border absolute top-1/2 left-0 right-0 h-1 w-full bg-black before:h-4 before:w-1 before:top-0 before:left-3 before:bg-black before:absolute after:h-4 after:w-1 after:bg-black after:absolute after:top-0 after:right-3"></div>
      <div className="w-[100%] h-5 block m-auto relative">
        <span className="block absolute top-full left-[14px] text-center -translate-x-1/2">
          {min}
        </span>
        <span className="block absolute left-auto top-full right-[15px] text-center translate-x-1/2">
          {max}
        </span>
        <div
          style={{ width: `${width}%`, left: `${left}%` }}
          className="absolute top-0 bottom-0 block h-full bg-purple-300 "
        >
          <div className="absolute flex w-full my-2 h-full">
            <div className="absolute block top-full left-0 w-full ">
              <span className="absolute -left-1">{value[0]}</span>
              <span className="absolute -right-1">{value[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
