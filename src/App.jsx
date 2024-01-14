import Footer from "./component/Footer";
import Hero from "./component/Hero";
import Navbar from "./component/Navbar";
import TaskBoard from "./component/TaskBoard/TaskBoard";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <Hero />
        <TaskBoard />
      </div>
      <Footer />
    </>
  );
}
