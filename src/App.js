import Header from "./components/Header";
import { ModeToggle } from "./components/ModeToggle";
import SoundMatchGame from "./components/SoundMatchGame";
import { Route } from "wouter";

const App = () => {
  return (
    <div className="bg-purple-300 dark:bg-black w-screen h-full">
      <div className="flex justify-between p-5">
        <Header />
        {/* <i className="fa-solid fa-burger"></i> */}
        <ModeToggle />
      </div>
      <Route path="/projects">
        <SoundMatchGame />
      </Route>
      <Route path="/">
        <h1 className="text-purple-900 dark:text-white font-bold text-4xl">
          Living in Hamburg
        </h1>
        <h2 className="text-red-900 dark:text-red-500">Hamburg</h2>
      </Route>
    </div>
  );
};

export default App;
