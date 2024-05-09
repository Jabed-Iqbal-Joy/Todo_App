import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import InboxPage from "./pages/InboxPage";
import TodayPage from "./pages/TodayPage";
import AnytimePage from "./pages/AnytimePage";
import UpcomingPage from "./pages/UpcomingPage";
import SomedayPage from "./pages/SomedayPage";
import LogbookPage from "./pages/LogbookPage";
import TrashPage from "./pages/TrashPage";
import { TasksProvider } from "./context/TaskContext";
import HomePage from "./pages/HomePage";
import { storage } from "./Utils/Storage";
import PrivateRoutes from "./Utils/PrivateRoutes";
import Authenticate from "./Utils/Authenticate";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import Demopage from "./pages/Demopage";

export default function App() {
  return (
    <TasksProvider>
      <Routes>
        <Route element={<Authenticate />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<SigninPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="app">
            <Route path="inbox" element={<InboxPage />} />
            <Route path="today" element={<TodayPage />} />
            <Route path="anytime" element={<AnytimePage />} />
            <Route path="upcoming" element={<UpcomingPage />} />
            <Route path="someday" element={<SomedayPage />} />
            <Route path="logbook" element={<LogbookPage />} />
            <Route path="trash" element={<TrashPage />} />
          </Route>
        </Route>
        <Route path="/demo" element={<Demopage />} />
      </Routes>
    </TasksProvider>
  );
}
