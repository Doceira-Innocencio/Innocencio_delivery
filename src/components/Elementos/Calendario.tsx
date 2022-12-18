import { useContext } from "react";
import { Calendar } from "react-calendar";
import { RegistroEncomendaContext } from "../../contexts/RegistroEncomendaContext";

interface CalendarioProps {
  open: boolean;
}

export default function Calendario({ open }: CalendarioProps) {
  const { registroEncomendaProps, setRegistroEncomendaProps } = useContext(
    RegistroEncomendaContext
  );

  return (
    <div className={`calendarioContainer ${!open && "blur"}`}>
      <Calendar
        locale="pt-br"
        onClickDay={(date) => {
          setRegistroEncomendaProps({
            ...registroEncomendaProps,
            encomenda: {
              ...registroEncomendaProps.encomenda,
              dEntrega: date,
            },
            cadastroContext: {
              ...registroEncomendaProps.cadastroContext,
              dateSelected: date
                .toLocaleDateString("en-GB")
                .split("/")
                .reverse()
                .join(""),
            },
          });

          document.getElementById("dEntrega").value =
            Intl.DateTimeFormat("pt-br").format(date);

          document.getElementById("dEntregaSem").value = Intl.DateTimeFormat(
            "pt-br",
            {
              weekday: "long",
            }
          ).format(date);
        }}
        tileClassName={({ date, view }) => {
          if (view === "month" && date.getDay() === 1) {
            return "fechado";
          } else {
            if (
              registroEncomendaProps.cadastroContext.listDatasEncomendas?.includes(
                date.toDateString()
              )
            ) {
              return "spot";
            }
            return null;
          }
        }}
      />
    </div>
  );
}
