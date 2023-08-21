import InformationPage from "./components/views/InformaionPage/InformationPage";
import MainImage from "./components/views/MainImage/MainImage";
import { socket } from "./components/utils/socket";
import React, { useState, useEffect } from "react";

function App() {
  const [isSocketConnected, setIsSocketConnected] = useState(socket.connected);
  const [socketData, setSocketData] = useState([]);
  const startMessage = () => {
    socket.connect();
    socket.emit("Start-Message", "start seing...");
  };
  useEffect(() => {
    function onConnect() {
      setIsSocketConnected(true);
    }

    function onDisconnect() {
      setIsSocketConnected(false);
    }

    function onReturnMessage(data) {
      console.log(data);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("Return-Message", onReturnMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("Return-Message", onReturnMessage);
    };
  }, []);

  const mockData = [
    {
      title: "Temperature",
      information: "give info about cabin Temperature.",
      id: 1,
    },
    {
      title: "Battery Usage",
      information: "give info about Battery Usage.",
      id: 2,
    },
    {
      title: "Summary",
      information: "give info summary.",
      id: 3,
    },
  ];
  return (
    <div
      style={{ backgroundColor: "#1D1D1D", height: "100vh", width: "100vw" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          color: "white",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "MontserratExtraBold",
            fontSize: 40,
            marginLeft: "5vw",
          }}
        >
          <div>Electronic</div>
          <div>Vehicle</div>
        </div>
        <div>
          <MainImage />
          <button onClick={startMessage}>Connect</button>
        </div>
        <div
          style={{
            fontFamily: "MontserratExtraBold",
            marginRight: "5vw",
            width: "15vw",
          }}
        >
          {mockData.map((data, index) => {
            return (
              <InformationPage
                key={index}
                id={data.id}
                title={data.title}
                information={data.information}
              ></InformationPage>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
