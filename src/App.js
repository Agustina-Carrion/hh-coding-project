import Header from "./components/Header";
import MapWithPOI from "./components/MapWithPOI";


const App = () => {
  return (
    <>
    <div style={{ width: "100%", height: "100%" }}>
    
    <Header />
    <div className="container mx-auto pt-4 flex flex-row">
      <div className="grow h-14" >
        <h1>Living In Hamburg</h1>
      </div>
        <div class="grow h-14">
      <MapWithPOI />
        </div>
    </div>
  </div>
    </>
  );
};

export default App;
