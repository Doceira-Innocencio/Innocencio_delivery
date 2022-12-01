import { useState } from "react";

export default function Options({ name, setValor, options }) {
  const [optionsChecked, setOptionsChecked] = useState([
    options.map(() => false),
  ]);

  function handleOptionSelect(index) {
    optionsChecked[index] = true;
    setOptionsChecked(optionsChecked);
    setValor("sim");
  }
  return (
    <div class="form__group">
      {options.map((option, index) => (
        <div class="form__radio-group">
          <input
            type="radio"
            class="form__radio-input"
            name={name}
            checked={optionsChecked[index]}
          />
          <label
            onClick={() => handleOptionSelect(index)}
            for="small"
            class="form__radio-label"
          >
            <span class="form__radio-button"></span>
            {option.nome}
          </label>
        </div>
      ))}
    </div>
  );
}
