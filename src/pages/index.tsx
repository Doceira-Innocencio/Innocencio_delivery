import BuscaEncomenda from "../components/BuscaEncomenda";
import DropDownInput from "../components/Elements/form/DropDownInput";
import Header from "../components/Elements/Header";
import Unidade from "../components/Unidade";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="content">
        {/* <Unidade /> */}
        <BuscaEncomenda />
        {/* <DropDownInput   placeholder="Quem esta atendendo ?"    opcoes={["Wania", "Thais", "Celso", "Marcos"]}     /> */}
      </div>
    </main>
  );
}
