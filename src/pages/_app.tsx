import "../styles/global.css";
import type { AppProps } from "next/app";
import { SectionProvider } from "../contexts/SectionsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SectionProvider>
      <Component {...pageProps} />
    </SectionProvider>
  );
}
