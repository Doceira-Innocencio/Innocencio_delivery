import { SectionProvider } from "../contexts/SectionContext";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <SectionProvider>
      <Component {...pageProps} />;
    </SectionProvider>
  );
}

export default MyApp;
