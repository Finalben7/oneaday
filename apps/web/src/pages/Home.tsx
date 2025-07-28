import Header from "../components/Header";
import logo from "../assets/react.svg"

const Home = () => {
  return (
    <div>
      <Header />
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold">Welcome to OneADay</h1>
        <p className="mt-4 text-lg">Your daily accountability companion.</p>
        <img src={logo} alt="Hero" className="mt-8 mx-auto w-1/2 rounded" />
      </section>
    </div>
  );
};

export default Home;
