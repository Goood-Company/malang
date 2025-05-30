import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import TestPage from "./pages/TestPage";
import { BookDetailPage } from "./pages/BookDetailPage";
import TestColor from "./pages/TestColor";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/bookdetail/:bookId" element={<BookDetailPage />} />
        <Route path="/test-color" element={<TestColor />} />
      </Routes>
    </BrowserRouter>
  );
};
