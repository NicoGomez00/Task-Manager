import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import TasksPage from "./pages/TasksPage";
import HomePage from "./pages/HomePage";
import TaskFormPage from "./pages/TaskFormPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import { createTheme , ThemeProvider } from '@mui/material'


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#161111',
    },
    secondary: {
      main: '#545454',
    },
    background: {
      default: '#4c4c4c',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
})

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <Container maxWidth='xl' sx={{backgroundColor:'white' , margin:'20vh auto' , padding:3}}>
      <AuthProvider>
        <TaskProvider>
          <Router>
            <main className="container mx-auto px-10">
            <Navbar/>
            <Routes>

              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />

            </Routes>
            </main>
          </Router>
        </TaskProvider>
      </AuthProvider>
      </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
