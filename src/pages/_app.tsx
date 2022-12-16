import "../styles/global.css";
import "react-toastify/dist/ReactToastify.min.css";
import type { AppProps } from "next/app";
import { SectionProvider } from "../contexts/SectionsContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { RegistroEncomendaProvider } from "../contexts/RegistroEncomendaContext";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SectionProvider>
        <RegistroEncomendaProvider>
          <Component {...pageProps} />
          <ToastContainer
            style={{
              fontSize: "1.5rem",
            }}
          />
        </RegistroEncomendaProvider>
      </SectionProvider>
    </QueryClientProvider>
  );
}
