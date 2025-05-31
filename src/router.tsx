import { BrowserRouter, Route, Routes } from "react-router";
import TestPage from "./pages/test";
import { BookDetailPage } from "./pages/book-detail";
import TestColor from "./pages/test-color";
import SettingPage from "./pages/setting";
import BookPage from "./pages/book";
import StudyPage1 from "./pages/study-1";
import StudyPage2 from "./pages/study-2";
import Layout from "./components/layout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<BookPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/bookdetail/:bookId" element={<BookDetailPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/test-color" element={<TestColor />} />
        </Route>
        <Route path="/study-1" element={<StudyPage1 />} />
        <Route path="/study-2" element={<StudyPage2 />} />
      </Routes>
    </BrowserRouter>
  );
}
