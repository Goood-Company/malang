import { BrowserRouter, Route, Routes } from "react-router";
import TestPage from "./pages/TestPage";
import { BookDetailPage } from "./pages/BookDetailPage";
import TestColor from "./pages/TestColor";
import SettingPage from "./pages/SettingPage";
import BookPage from "./pages/BookPage";
import StudyPage from "./pages/StudyPage";
import { Layout } from "./components/Layout";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<BookPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Route>
        <Route path="/bookdetail/:bookId" element={<BookDetailPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/test-color" element={<TestColor />} />
      </Routes>
    </BrowserRouter>
  );
};
