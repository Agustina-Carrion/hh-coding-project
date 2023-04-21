import Header from "./components/Header";
import Carousel from "./components/Carousel";

const App = () => {
  return (
    <div className="bg-black w-screen h-screen">
      <Header />
      <h1 className="text-white">Hello</h1>
      <h2 className="text-red-800">Hamburg</h2>
      <Carousel />
    </div>
  );
};

export default App;
