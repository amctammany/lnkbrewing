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
    value?: number;
    label?: string;
    options: Record<number, string>;
    //options: Option[];
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
      options: ops,
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
    const options: Option[] = useMemo(
      () => Object.entries(ops).map(([k, v]) => [v, parseInt(k)]),
      [ops]
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
          ([opt]) => opt.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
      );
      setQuery(value);
      setActiveOption(0);
      if (onChange) onChange(e);
    };
    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.code === "Enter") {
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
    const onOptionClick: MouseEventHandler<HTMLLIElement> = (e) => {
      const id = parseInt(e.currentTarget.dataset.id || "");
      const label = e.currentTarget.innerText;
      setQuery(label);
      setHidden(id);
    };
    return (
      <>
        <input
          type="hidden"
          name={name}
          value={hidden}
          defaultValue={defaultValue}
          onChange={onChange}
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
            onBlur={onBlur}
            onChange={handleChange}
          />
        </Label>
        <ul
          className={optionListStyles({
            open: query && query.length > 0 ? "open" : "closed",
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
      </>
    );
  }
);
