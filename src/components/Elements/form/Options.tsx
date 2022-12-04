import { useContext, useState } from "react";
import { SectionContext } from "../../../contexts/SectionContext";

interface Unidade {
  nome: string;
  value: number;
}

interface OptionsProps {
  name: string;
  options: Unidade[];
}

export default function Options({ name, options }: OptionsProps) {
  const { sectionProps, setSectionProps } = useContext(SectionContext);

  const [optionsChecked, setOptionsChecked] = useState(
    options.map((option) => (option == sectionProps.unidade ? true : false))
  );

  function handleOptionSelect(index: number) {
    setOptionsChecked(options.map((_, i) => (i == index ? true : false)));
    setSectionProps({ ...sectionProps, unidade: options[index] });
  }
  return (
    <div className="form__group">
      {options.map((option, index) => (
        <div key={Math.random()} className="form__radio-group">
          <input
            type="radio"
            className="form__radio-input"
            name={name}
            checked={optionsChecked[index]}
            onChange={() => {
              return;
            }}
          />
          <label
            onClick={() => handleOptionSelect(index)}
            htmlFor="small"
            className="form__radio-label"
          >
            <span className="form__radio-button">{option.nome}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
