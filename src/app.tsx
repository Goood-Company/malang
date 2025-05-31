import StyledToaster from "./components/ui/toaster";
import Router from "./router";

const App: React.FC = () => {
  return (
    <>
      <Router />
      <StyledToaster />
    </>
  );
};

export default App;
