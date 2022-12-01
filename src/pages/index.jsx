import { useState } from "react";
import Header from "../components/Header";
import Unidade from "../components/Unidade";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="content">
        <Unidade />
      </div>
    </main>
  );
}
