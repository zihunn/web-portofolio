import { lazy, Suspense } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import ProjectDetail from './pages/ProjectDetail.jsx'

// Home carries three.js, so a direct visit to a project page doesn't download it
const Home = lazy(() => import('./pages/Home.jsx'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={null}><Home /></Suspense>} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
