export default function FichaEncomenda() {
  return (
    <div id="ficha" className="fichaContainer">
      <div className="fichaHeader">
        <div className="claim">
          <img src="/img/ficha/ficha_logo.jpg" alt="" />
          <h1>Doceira Innocêncio</h1>
        </div>
        <div className="endereco">
          <div>
            <h1>Av.Deputado Emílio Carlos, 2075</h1>
            <h1>Limão</h1>
          </div>
          <div className="contato">
            <h1>Fone:(11) 3936-1783</h1>
            <h1>(11) 9 6687-9396</h1>
          </div>
        </div>
      </div>
      <div className="fichaCliente">
        <div>
          <h1>Nome do Cliente</h1>
          <input type="text" value="CELSO LORENSATTO DA SILVA FILHO" />
        </div>
        <div>
          <h1>Telefone</h1>
          <input type="text" value="(11) 9 5499-2796" />
        </div>
      </div>
      <div className="fichaEncomendaData">
        <div>
          <h1>Dia Mês</h1>
          <input type="text" value="10/11/2022" />
        </div>
        <div>
          <h1>Dia Semana</h1>
          <input type="text" value="Quarta-feira" />
        </div>
        <div>
          <h1>Horario</h1>
          <input type="text" value="15:00" />
        </div>
      </div>
      <div className="fichaEncomendaBolo">
        <div>
          <h1>Peso</h1>
          <input type="text" value="2kg" />
        </div>
        <div>
          <h1>Formato</h1>
          <input type="text" value="Quadrado" />
        </div>
        <div>
          <h1>Cor</h1>
          <input type="text" value="Amarelo" />
        </div>
        <div>
          <h1>Lateral</h1>
          <input type="text" value="Choc. coco ralado" />
        </div>
        <div>
          <h1>Idade</h1>
          <input type="text" value="17" />
        </div>
      </div>
      <div className="fichaEncomendaPedidos">
        <table>
          <tr>
            <th>Codigo</th>
            <th>Descrição</th>
            <th>Qtd</th>
            <th>Unitario</th>
            <th>Valor</th>
          </tr>
          <tr>
            <td>
              <input type="text" value="16" />
            </td>
            <td>
              <input disabled type="text" value="17" />
            </td>
            <td>
              <input type="text" value="2" />
            </td>
            <td>
              <input disabled type="text" value="79,00" />
            </td>
            <td>
              <input disabled type="text" value="159,00" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" value="179,00" />
            </td>
            <td>
              <input disabled type="text" value="TAXA DE ENTREGA" />
            </td>
            <td>
              <input type="text" value="10,00" />
            </td>
            <td>
              <input disabled type="text" value="1,00" />
            </td>
            <td>
              <input disabled type="text" value="10,00" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="0" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
          </tr>
          <tr>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="0" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
          </tr>
          <tr>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="0" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
          </tr>
          <tr>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="0" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
          </tr>
          <tr>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="0" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
          </tr>
          <tr>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="0" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
          </tr>
          <tr>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="" />
            </td>
            <td>
              <input disabled type="text" value="0" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
            <td>
              <input disabled type="text" value="-" />
            </td>
          </tr>
        </table>
      </div>
      <div className="fichaValores">
        <div className="blankSpace"></div>
        <div className="valores">
          <table>
            <tr>
              <th>Total</th>
              <td>174,00</td>
            </tr>
            <tr>
              <th>Sinal</th>
              <td>50,00</td>
            </tr>
            <tr>
              <th>Resta</th>
              <td>124,00</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="fichaObservacao">
        <textarea name="" id="" />
      </div>
      <div className="fichaEndereco_1">
        <div>
          <h1>Endereço</h1>
          <input disabled type="text" value="RUA DOS ESPADARTES" />
          <p></p>
        </div>
        <div>
          <h1>NUMERO</h1>
          <input disabled type="text" value="182" />
        </div>
        <div>
          <h1>CEP</h1>
          <input disabled type="text" value="04474-070" />
        </div>
      </div>
      <div className="fichaEndereco_2">
        <div>
          <h1>Bairro</h1>
          <input disabled type="text" value="Santa Terezinha" />
        </div>
        <div>
          <h1>Complemento</h1>
          <input disabled type="text" value="Casa ao lado de uma viela" />
        </div>
      </div>
      <div className="fichaDados">
        <div>
          <h1>Encomendado Em:</h1>
          <input disabled type="text" value="06/12/2022" />
        </div>
        <div>
          <h1>Balconista</h1>
          <input disabled type="text" value="Thais" />
        </div>
        <div>
          <h1>Pedido</h1>
          <input disabled type="text" value="779" />
        </div>
      </div>
    </div>
  );
}
