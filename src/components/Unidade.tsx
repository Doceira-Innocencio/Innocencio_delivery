import Options from "./Elements/Options";

export default function Unidade() {
  return (
    <div className="unidadeSection">
      <h1>Qual unidade Doceira Innocêncio ?</h1>
      <Options
        name="unidade"
        options={[
          {
            nome: "Andorinha",
            value: 1,
          },
          {
            nome: "Dp. Emílio Carlos",
            value: 2,
          },
        ]}
      />
    </div>
  );
}
