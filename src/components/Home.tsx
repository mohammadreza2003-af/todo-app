import Main from "./Main";

const Home = () => {
  return (
    <div className="w-full overflow-hidden font-Josefin">
      <div className="w-full sm:bg-heroBackDeskLight dark:sm:bg-heroBackDeskDark dark:bg-heroBackMobDark bg-heroBackMobLight bg-contain bg-no-repeat bg-top dark:bg-dark bg-white  min-h-[100vh] flex justify-center items-center">
        <div className="w-full sm:max-w-[700px] max-w-[400px]">
          <Main />
        </div>
      </div>
    </div>
  );
};

export default Home;
