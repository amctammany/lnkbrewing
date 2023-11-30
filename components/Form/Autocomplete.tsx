"use client";
import {
  ChangeEventHandler,
  ComponentProps,
  KeyboardEventHandler,
  forwardRef,
  useState,
} from "react";
import { TextField } from "./TextField";
import { Label } from "./Label";
import { VariantProps, cva } from "class-variance-authority";
export type Option<T = string, ID = number> = [T, ID];
export type AutocompleteProps = VariantProps<typeof autocompleteStyles> &
  ComponentProps<"input"> & {
    value?: any;
    label?: string;
    options: Option[];
  };
const optionStyles = cva([""], {
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
const optionListStyles = cva([""], {
  variants: {
    open: {
      open: ["block"],
      closed: ["hidden"],
    },
  },
  defaultVariants: {
    open: "closed",
  },
});
const autocompleteStyles = cva("input", {
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
      options,
      disabled,
      defaultValue,
      value,
      onChange,
      onBlur,
      variant,
      size,
    }: AutocompleteProps,
    ref
  ) {
    console.log(
      value,
      options,
      value ? options.find((op) => op[1] === value) : ""
    );
    const [query, setQuery] = useState(
      value !== undefined ? options.find((op) => op[1] === value)?.[0] : ""
    );
    const [hidden, setHidden] = useState(value);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [activeOption, setActiveOption] = useState(-1);
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const value = e.target.value;
      setFilteredOptions(
        options.filter(
          ([opt, id]) => opt.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
      );
      setQuery(value);
      setActiveOption(0);
      if (onChange) onChange(e);
    };
    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
      console.log(e.code);
      if (e.code === "Enter") {
        console.log("return");
        setQuery(filteredOptions[activeOption][0]);
        //ref()?.current.value = options[activeOption][0];
        setHidden(filteredOptions[activeOption][1]);
        e.preventDefault();
      } else if (e.code === "ArrowDown") {
        setActiveOption((o) => (o >= filteredOptions.length - 1 ? 0 : o + 1));
      } else if (e.code === "ArrowUp") {
        setActiveOption((o) => (o <= 0 ? filteredOptions.length - 1 : o - 1));
      }
    };
    return (
      <>
        <input
          type="hidden"
          name={name}
          value={hidden}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
        <Label label={label || name}>
          <input
            type="text"
            disabled={disabled}
            className={autocompleteStyles({ size, variant })}
            //className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            value={query?.toString()}
            onKeyDown={onKeyDown}
            onChange={handleChange}
          />
        </Label>
        <ul
          className={optionListStyles({
            open: query && query.length > 0 ? "open" : "closed",
          })}
        >
          {filteredOptions.map((opt: any, index) => (
            <li
              key={opt}
              className={optionStyles({
                selected: index === activeOption ? "active" : "default",
              })}
            >
              {opt}
            </li>
          ))}
        </ul>
      </>
    );
  }
);
