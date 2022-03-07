import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from '../pages/main'
import GamePage from '../pages/game';

export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact={true} path="/" element={< MainPage />} />
        <Route exact={true} path="/game" element={< GamePage />} />
        {/* Not Found */}
        <Route component={() => <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}