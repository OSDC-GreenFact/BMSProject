import InformationPage from "./components/views/InformaionPage/InformationPage";
import MainImage from "./components/views/MainImage/MainImage";
function App() {
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
