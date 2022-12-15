import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModeContext } from "./context/ModeContext";
import ScrollToTop, { ScrollTop } from "./utils/globalFuns";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import AddNewSong from "./pages/AddNewSong";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VideoPage from "./pages/VideoPage";
import Article from "./pages/Article";
import Lyrics from "./pages/Lyrics";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import EditSong from "./pages/EditSong";
import Contact from "./pages/Contact";
import SearchResult from "./pages/SearchResult";

const App = () => {
  const { theme } = useContext(ModeContext);
  return (
    <div className={`${theme === "light" ? "" : "dark"}`}>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Article />} />
          <Route path="/lyrics/:id" element={<Lyrics />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/add-new-song" element={<AddNewSong />} />
          <Route path="/edit-lyrics/:id" element={<EditSong />} />
          <Route path="/videos" element={<VideoPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search-result" element={<SearchResult />} />
        </Routes>
        <Footer />
        <ScrollTop />
      </BrowserRouter>
    </div>
  );
};
export default App;
