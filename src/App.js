import './App.css';
import React, { useState, useEffect } from "react";

const App = () => {

  const GET_DESTINATARIOS_URL = "https://evergreen20221026160756.azurewebsites.net/api/Destinatarios";
  const GET_REMITENTES_URL = "https://evergreen20221026160756.azurewebsites.net/api/Remitentes";
  const POST_WHATSAPP_MSG = "https://messages-sandbox.nexmo.com/v1/messages";

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


  const sendWhatsappMessage = async () => {

    const destinatarioNumero = destinatariosData[mensajeForm.idDestinatario].numero;

    const response = await fetch(POST_WHATSAPP_MSG, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZmU3MGIxMjY6dUJReGRrck5IdldUMVk5Vg=='
      },
      body: JSON.stringify({
        message_type: "text", 
        text: `${mensajeForm.asunto}: ${mensajeForm.cuerpo}`,
        to: "573003575071",
        from: "14157386102",
        channel: "whatsapp"
      })
    });

    console.log(response.status)
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
    <div className="destinatariosDisponiblesContainer">

      <h1>EVERGREEN MENSAJERIA</h1>

      <div>
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

      <div>
        <h2>Remitentes disponibles:</h2>
        {destinatariosData?.length > 0 ? (
        <div>
          <ul>
          {destinatariosData.map((dest) => (
            <li>
              <h3>{`Remitente ${dest.id}`}</h3>
              <p>{dest.nombre}</p>
              <p>{dest.numero}</p>
              <p>{dest.correo}</p>
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
      

      <div>
        <h1>Detallar mensaje :</h1>
      </div>

      <div className='message_form'>

        <label>Id Destinatario:</label>
        <input 
          placeholder='destinatario...'
          value={mensajeForm.destinatario}
          onChange={(e) => setDestinatario(e.target.value)}
        />

        <label>Asunto:</label>
        <input 
          placeholder='asunto...'
          value={mensajeForm.asunto}
          onChange={(e) => setAsunto(e.target.value)}
        />

        <label>Mensaje:</label>
        <input 
          placeholder='mensaje...'
          value={mensajeForm.cuerpo}
          onChange={(e) => setCuerpo(e.target.value)}
        />

        <label>Id Remitente:</label>
        <input 
          placeholder='Id remitente...'
          value={mensajeForm.idRemitente}
          onChange={(e) => setIdRemitente(e.target.value)}
        />

        <button
          type="button"
          onClick={(e) => {
            setEstado(1)
            sendWhatsappMessage()
          }}
        >
          Enviar
        </button>

      </div>

    </div>
  );
}

export default App;
