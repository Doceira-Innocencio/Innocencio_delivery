import { useState } from "react";
import Options from "./OptionsComponent";

export default function Unidade() {
  const [valor, setValor] = useState("");
  return (
    <>
      <h1>Qual unidade doceira Innocêncio ?</h1>
      <Options
        name="unidade"
        setValor={setValor}
        options={[
          {
            nome: "AC",
            value: 1,
          },
          {
            nome: "DI",
            value: 2,
          },
        ]}
      />
      <p>{valor}</p>
    </>
  );
}
