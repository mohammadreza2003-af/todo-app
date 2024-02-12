import "./App.css";

import Main from "./components/Main";
import { GContext } from "./contexts/globalContext";
function App() {
  return (
    <GContext>
      <div className="w-full overflow-hidden font-Josefin">
        <div className="w-full sm:bg-heroBackDeskLight dark:sm:bg-heroBackDeskDark dark:bg-heroBackMobDark bg-heroBackMobLight bg-contain bg-no-repeat bg-top dark:bg-dark bg-white  min-h-[100vh] flex justify-center items-center">
          <div className="w-full sm:max-w-[700px] max-w-[400px]">
            <Main />
          </div>
        </div>
      </div>
    </GContext>
  );
}

export default App;
