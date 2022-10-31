import './App.css';
import React, { useState, useEffect } from "react";

const App = () => {

  const GET_DESTINATARIOS_URL = "https://evergreen20221026160756.azurewebsites.net/api/Destinatarios";
  const GET_REMITENTES_URL = "https://evergreen20221026160756.azurewebsites.net/api/Remitentes";
  const LAMBDA_API = "https://05ywckdu9a.execute-api.us-east-1.amazonaws.com/dev";

  const [mensajeForm, setMensajeForm] = useState({  
    idDestinatario: 0,
    asunto: "",
    cuerpo: "",
    fechaMensaje: "",
    estado: "",
    idRemitente: 0
  });

  const setDestinatario = e => {
    setMensajeForm(existingValues => ({
      ...existingValues,
      idDestinatario: e,
    }))
  }

  const setAsunto = e => {
    setMensajeForm(existingValues => ({
      ...existingValues,
      asunto: e,
    }))
  }

  const setCuerpo = e => {
    setMensajeForm(existingValues => ({
      ...existingValues,
      cuerpo: e,
    }))
  }

  const setFechaMensaje = e => {
    setMensajeForm(existingValues => ({
      ...existingValues,
      fechaMensaje: e,
    }))
  }

  const setEstado = e => {
    setMensajeForm(existingValues => ({
      ...existingValues,
      estado: e,
    }))
  }

  const setIdRemitente = e => {
    setMensajeForm(existingValues => ({
      ...existingValues,
      idRemitente: e,
    }))
  }


  const sendDataToAWSLambda = async () => {

    const idRemitenteInt = parseInt(mensajeForm.idRemitente, 10);
    const idDestinatarioInt = (parseInt(mensajeForm.idDestinatario, 10) - 1);
    const numeroDestinatario = destinatariosData[idDestinatarioInt].numero;

    const body_lambda = JSON.stringify({
      asunto: mensajeForm.asunto, 
      cuerpo: mensajeForm.cuerpo,
      idremitente: idRemitenteInt,
      numeroDestinatario: numeroDestinatario
    });

    console.log(`Body to be sent to Lambda = ${body_lambda}`)

    const response = await fetch(LAMBDA_API, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: body_lambda
    });

    const data = await response.json();

    console.log(data.status)
    console.log(data)
  };



  const [destinatariosData, setDestinatariosData] = useState([]);
  const [remitentesData, setRemitentesData] = useState([]);

  useEffect(() => {
    searchDestinatarios();
    searchRemitentes();
    setFechaMensaje("2022-03-08T00:00:00");
  }, []);

  const searchDestinatarios = async () => {
    const response = await fetch(GET_DESTINATARIOS_URL);
    const data = await response.json();

    setDestinatariosData(data);
  };

  const searchRemitentes = async () => {
    const response = await fetch(GET_REMITENTES_URL);
    const data = await response.json();

    setRemitentesData(data);
  }

  return (
    <div className="mensajeria_app">

      <h1>EVERGREEN MENSAJERIA</h1>

      <div className='disponibles_container'>
        <div className="destinatarios_disponibles_container disp_container">
          <h2>Destinatarios disponibles:</h2>
          {destinatariosData?.length > 0 ? (
          <div>
            <ul>
            {destinatariosData.map((dest) => (
              <li>
                <h3>{`Destinatario ${dest.id}`}</h3>
                <p>{dest.nombre}</p>
                <p>{dest.numero}</p>
                <p>{dest.correo}</p>
              </li>
            ))}
            </ul>
          </div>
          ) : (
            <div>
              <h3>No hay destinatarios disponibles</h3>
            </div>
          )}
        </div>

        <div className="remitentes_disponibles_container disp_container">
          <h2>Remitentes disponibles:</h2>
          {remitentesData?.length > 0 ? (
          <div>
            <ul>
            {remitentesData.map((rem) => (
              <li>
                <h3>{`Remitente ${rem.id}`}</h3>
                <p>{rem.nombre}</p>
                <p>{rem.numero}</p>
                <p>{rem.correo}</p>
              </li>
            ))}
            </ul>
          </div>
          ) : (
            <div>
              <h3>No hay remitentes disponibles</h3>
            </div>
          )}
        </div>
      </div>
      

      <div className="detallar_container">
        <h1>Detallar mensaje :</h1>
      
        <div className='message_form'>

          <label className='message_form_label'>Id Destinatario:</label>
          <input 
            placeholder='destinatario...'
            value={mensajeForm.idDestinatario}
            onChange={(e) => setDestinatario(e.target.value)}
          />

          <label className='message_form_label'>Asunto:</label>
          <input 
            placeholder='asunto...'
            value={mensajeForm.asunto}
            onChange={(e) => setAsunto(e.target.value)}
          />

          <label className='message_form_label'>Mensaje:</label>
          <input 
            placeholder='mensaje...'
            value={mensajeForm.cuerpo}
            onChange={(e) => setCuerpo(e.target.value)}
          />

          <label className='message_form_label'>Id Remitente:</label>
          <input 
            placeholder='remitente...'
            value={mensajeForm.idRemitente}
            onChange={(e) => setIdRemitente(e.target.value)}
          />
        </div>

        <button
          className='btn'
          type="button"
          onClick={(e) => {
            setEstado(1)
            sendDataToAWSLambda()
          }}
        >
          Enviar
        </button>

      </div>
    </div>
  );
}

export default App;
