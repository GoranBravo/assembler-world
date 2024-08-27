import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/NavBar";
import DailyTask from "@/components/DailyTask";

export default function Index() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <DailyTask/>
      </main>
    </div>
  );
}
