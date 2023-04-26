import Header from "./components/Header";
import { ModeToggle } from "./components/ModeToggle";

const App = () => {
  return (
    <div className="bg-purple-300 dark:bg-black w-screen h-screen">
      <div className="flex justify-between p-5">
        <Header />
        <ModeToggle />
      </div>
      <h1 className="text-purple-900 dark:text-white font-bold text-4xl">
        Living in Hamburg
      </h1>
      <h2 className="text-red-900 dark:text-red-500">Hamburg</h2>
    </div>
  );
};

export default App;
