import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="header_homeRefs">
        <img
          className="header_logo"
          src="/img/logo.jpg"
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
