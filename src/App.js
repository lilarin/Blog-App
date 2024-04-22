import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { BlogContent } from "./containers/BlogPage/BlogPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { AboutPage } from "./containers/AboutPage/AboutPage";
import { ContactsPage } from "./containers/ContactsPage/ContactsPage";

export function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Routes>
            <Route path="/" Component={BlogContent} />
            <Route path="/about" Component={AboutPage} />
            <Route path="/contacts" Component={ContactsPage} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

function NotFound() {
  return <h1>Помилка 404. Сторінку не знайдено</h1>;
}

export default App;
  