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

  const dates = [
    new Date("2022-12-24").toDateString(),
    new Date("2022-12-25").toDateString(),
  ];
  return (
    <div className={`calendarioContainer ${!open && "blur"}`}>
      <Calendar
        locale="pt-br"
        onClickDay={(date) => {
          setRegistroEncomendaProps({
            ...registroEncomendaProps,
            cadastroContext: {
              codigoEncomenda:
                registroEncomendaProps.cadastroContext.codigoEncomenda,
              dateSelected: date
                .toLocaleDateString("en-GB")
                .split("/")
                .reverse()
                .join(""),
            },
          });

          setRegistroEncomendaProps({
            ...registroEncomendaProps,
            encomenda: {
              ...registroEncomendaProps.encomenda,
              dEntrega: date,
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
            if (dates.includes(date.toDateString())) {
              return "spot";
            }
            return null;
          }
        }}
      />
    </div>
  );
}
