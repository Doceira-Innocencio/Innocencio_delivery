import BuscaEncomenda from "../components/BuscaEncomenda";
import Header from "../components/Elements/Header";
import Unidade from "../components/Unidade";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="content">
        {/* <Unidade /> */}
        <BuscaEncomenda />
      </div>
    </main>
  );
}
