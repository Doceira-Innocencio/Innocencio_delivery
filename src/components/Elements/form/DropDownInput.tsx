import { useState } from "react";
import { ArrowDown } from "phosphor-react";

interface DropDownInput {
  opcoes: string[];
  placeholder: string;
}

export default function DropDownInput({ opcoes, placeholder }: DropDownInput) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [onCloseTimeout, setOnCloseTimeout] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };
  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="dropDownContainer"
    >
      <div className="dropDownHeader" onClick={toggling}>
        {selectedOption ? (
          <span className="dropDownHeader--option">{selectedOption}</span>
        ) : (
          <span className="dropDownHeader--placeholder">{placeholder}</span>
        )}

        <ArrowDown />
      </div>
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
