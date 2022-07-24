/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";

export default function InputValidator({
  classname,
  type,
  placeholder,
  onChange,
  name,
  errorMessage,
  pattern,
  required,
  value,
  id,
}) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <>
      <div>
        <label htmlFor="control" />
        <input
          name={name}
          id={id}
          value={value}
          className={classname}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          errormessage={errorMessage}
          pattern={pattern}
          required={required}
          onBlur={handleFocus}
          focused={focused.toString()}
        />
        <span>{errorMessage}</span>
      </div>
      <style jsx>
        {`
          span {
            display: none;
            margin-top: 0.5rem;
            font-size: 12px;
            padding: 3px;
            color: red;
          }
        `}
      </style>
    </>
  );
}
