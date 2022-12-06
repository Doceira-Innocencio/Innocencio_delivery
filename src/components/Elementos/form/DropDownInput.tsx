import { useState } from "react";
import { ArrowDown } from "phosphor-react";

interface DropDownInput {
  id?: string;
  opcoes: string[];
  placeholder: string;
}

export default function DropDownInput({
  id,
  opcoes,
  placeholder,
}: DropDownInput) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [onCloseTimeout, setOnCloseTimeout] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };
  return (
    <div className="dropDownContainer">
      <input
        id={id}
        placeholder=" "
        type="text"
        className="dropDownHeader"
        onChange={(e) => {
          setSelectedOption(e.target.value);
        }}
        value={selectedOption}
        autoComplete="off"
        onClick={toggling}
      />
      {isOpen && (
        <div className="dropDownListContainer">
          <ul className="dropDownList">
            {opcoes.map((opcao) => (
              <li
                className="listItem"
                onClick={onOptionClicked(opcao)}
                key={Math.random()}
              >
                {opcao}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
