import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="header_homeRefs">
        <Image
          width={20}
          height={20}
          className="header_logo"
          src={"/public/logo.jpg"}
          alt="logo doceira innocêncio"
        />
        <h3>{new Date().toDateString()}</h3>
      </div>
      <div className="header_modulos">
        <Link href="#" className="selected">
          Buscar Encomenda
        </Link>
        <Link href="#">Registrar Encomenda</Link>
        <Link href="#">Clientes</Link>
      </div>
    </header>
  );
}
