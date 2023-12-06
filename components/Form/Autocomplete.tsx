"use client";
import {
  ChangeEventHandler,
  ComponentProps,
  KeyboardEventHandler,
  MouseEventHandler,
  forwardRef,
  useMemo,
  useState,
} from "react";
import { TextField } from "./TextField";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
export type Option<T = string, ID = number> = [T, ID];
export type AutocompleteProps = VariantProps<typeof autocompleteStyles> &
  ComponentProps<"input"> & {
    value?: number | null;
    label?: string;
    options: Record<number, string>;
    handleChange?: (id: number) => void;
    //options: Option[];
  };
const optionStyles = cva(["px-4 py-2 hover:bg-slate-300 hover:text-white"], {
  variants: {
    selected: {
      active: ["bg-slate-400", "text-white"],
      default: ["text-black"],
    },
  },
  defaultVariants: {
    selected: "default",
  },
});
const optionListStyles = cva(
  [
    "absolute right-0 left-0 py-0 mt-0 max-h-64 overflow-y-scroll bg-white shadow-lg z-20 p-2 border border-blue-200",
  ],
  {
    variants: {
      open: {
        open: [""],
        closed: ["hidden"],
      },
    },
    defaultVariants: {
      open: "closed",
    },
  }
);
const autocompleteStyles = cva("input overflow-hidden", {
  variants: {
    variant: {
      default: ["block"],
    },
    size: {
      default: ["w-full"],
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  function Autocomplete(
    {
      name,
      label,
      options: ops,
      disabled,
      defaultValue,
      value,
      onChange,
      handleChange,
      onBlur,
      variant,
      size,
    }: AutocompleteProps,
    ref
  ) {
    const options: Option[] = useMemo(
      () => Object.entries(ops).map(([k, v]) => [v, parseInt(k)]),
      [ops]
    );
    const [query, setQuery] = useState(
      value !== undefined ? options.find((op) => op[1] === value)?.[0] : ""
    );
    const [displayOptions, setDisplayOptions] = useState(false);
    const [hidden, setHidden] = useState(value || defaultValue);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [activeOption, setActiveOption] = useState(-1);
    const handleChangeListener: ChangeEventHandler<HTMLInputElement> = (e) => {
      const value = e.target.value;
      setDisplayOptions(value.length > 0);
      setFilteredOptions(
        options.filter(
          ([opt]) => opt.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
      );
      setQuery(value);
      setActiveOption(0);
      if (onChange) onChange(e);
    };
    const changeValue = (val: number) => {
      setHidden(val);
      if (handleChange) handleChange(val);
    };
    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.code === "Enter") {
        setQuery(filteredOptions[activeOption][0]);
        //ref()?.current.value = options[activeOption][0];
        changeValue(filteredOptions[activeOption][1]);
        setDisplayOptions(false);
        e.preventDefault();
      } else if (e.code === "ArrowDown") {
        setActiveOption((o) => (o >= filteredOptions.length - 1 ? 0 : o + 1));
      } else if (e.code === "ArrowUp") {
        setActiveOption((o) => (o <= 0 ? filteredOptions.length - 1 : o - 1));
      }
    };
    const onOptionClick: MouseEventHandler<HTMLLIElement> = (e) => {
      const id = parseInt(e.currentTarget.dataset.id || "");
      const label = e.currentTarget.innerText;
      setQuery(label);
      setDisplayOptions(false);
      changeValue(id);
    };
    return (
      <div className="relative ">
        <input
          type="hidden"
          name={name}
          value={hidden}
          onChange={onChange}
          ref={ref}
        />
        <Label className="relative m-0" label={label || name}>
          <input
            type="text"
            disabled={disabled}
            className={autocompleteStyles({ size, variant })}
            //className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            value={query?.toString()}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onChange={handleChangeListener}
          />
          <ul
            className={optionListStyles({
              open: displayOptions ? "open" : "closed",
            })}
          >
            {filteredOptions.map((opt, index) => (
              <li
                key={opt[1]}
                data-id={opt[1]}
                className={optionStyles({
                  selected: index === activeOption ? "active" : "default",
                })}
                onClick={onOptionClick}
              >
                {opt[0]}
              </li>
            ))}
          </ul>
        </Label>
      </div>
    );
  }
);
