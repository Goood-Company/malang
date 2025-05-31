import { BrowserRouter, Route, Routes } from "react-router";
import TestPage from "./pages/test";
import { BookDetailPage } from "./pages/book-detail";
import TestColor from "./pages/test-color";
import SettingPage from "./pages/setting";
import BookPage from "./pages/book";
import StudyPage from "./pages/study-1";
import Layout from "./components/layout";

export default function Router() {
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
}
