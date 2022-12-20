export default function printFicha() {
  const head = document.getElementsByTagName("head")[0];
  let mywindow = window.open(
    "",
    "PRINT",
    "height=650,width=900,top=100,left=150"
  );

  mywindow.document.write(`<html>${head.outerHTML}`);
  mywindow.document.write(`<body >`);
  mywindow.document.write(document.getElementById("__next").innerHTML);
  mywindow.document.write("</body></html>");

  mywindow?.document.querySelector(".actionsBar").remove();
  mywindow?.document.querySelector(".listaEncomendas").remove();
  mywindow?.document.querySelector(".Toastify").remove();
  mywindow?.document.querySelector(".mainContainer")?.classList.add("print");

  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();

  return true;
}
