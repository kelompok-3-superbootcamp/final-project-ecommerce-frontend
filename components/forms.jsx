import { Show } from "@/utils/Show";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const SearchInput = ({
  value,
  className,
  onChange,
  placeholder,
  name,
}) => {
  return (
    <input
      type="search"
      value={value}
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      id={name}
    />
  );
};

export const CheckboxInput = (props) => {
  let { name } = props;

  return (
    <>
      <div className="input-wrapper">
        <input type="checkbox" name={name} />
        <label htmlFor={name}>{name}</label>
      </div>
    </>
  );
};

export const TextInput = (props) => {
  let { name, onChange, value } = props;

  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input
        required
        type="text"
        id={name}
        name={name}
        value={value[name]}
        onChange={onChange}
        placeholder="Your name.."
      />
    </>
  );
};

export const TextInput2 = (props) => {
  const { name, onChange, value, className, placeholder, required } = props;
  return (
    <>
      <label className="capitalize" htmlFor={name}>
        {name}
      </label>
      <input
        required={required}
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
      />
    </>
  );
};

export const NumberInput = (props) => {
  let { name, onChange, value } = props;

  return (
    <>
      <label htmlFor={name} className="capitalize">{name}</label>
      <input
        required
        type="number"
        id={name}
        name={name}
        value={value[name]}
        onChange={onChange}
        
      />
    </>
  );
};

export const TimeInput = (props) => {
  let { name, onChange, value, disabled } = props;
  const labelName = name.replace(/_/g, " ");

  return (
    <div>
      <label htmlFor={name} className="capitalize">
        {labelName}
      </label>
      <input
        required
        disabled={disabled}
        type="time"
        id={name}
        name={name}
        value={value[name]}
        onChange={onChange}
        placeholder="Your name.."
      />
    </div>
  );
};

export const SelectInput = (props) => {
  let { name, onChange, value, option } = props;
  const labelName = name.replace(/_/g, " ");

  return (
    <div>
      <label htmlFor={name} className="capitalize">
        {labelName}
      </label>
      <select required id={name} name={name} onChange={onChange} value={value}>
        <option value="" defaultChecked disabled>
          Select {name}
        </option>
        {option.map((item, index) => (
          <option value={name === "hari" ? item : item.id} key={index}>
            {name === "hari"
              ? item
              : name === "dosen_id"
                ? `${item.nama} - ${item?.mataKuliah?.nama}`
                : item.nama}
          </option>
        ))}
      </select>
    </div>
  );
};

export const EmailInput = (props) => {
  const { name, onChange, value, className, placeholder, required } = props;
  return (
    <>
      <label className="capitalize" htmlFor={name}>
        {name}
      </label>
      <input
        required={required}
        type="email"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
      />
    </>
  );
};

export const PasswordInput = (props) => {
  const [show, setShow] = useState(false);
  const { name, onChange, value, className, placeholder, required } = props;
  return (
    <>
      <label className="capitalize" htmlFor={name}>
        {name}
      </label>
      <div className="relative">
        <input
          required={required}
          type={show ? "text" : "password"}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={className}
        />
        <div className="absolute right-2 top-2">
          <Show>
            <Show.When isTrue={show}>
              <FaEyeSlash
                className="cursor-pointer"
                onClick={() => setShow(false)}
              />
            </Show.When>
            <Show.Else>
              <FaEye className="cursor-pointer" onClick={() => setShow(true)} />
            </Show.Else>
          </Show>
        </div>
      </div>
    </>
  );
};
