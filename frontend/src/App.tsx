import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { PortfolioPage } from './pages/PortfolioPage'

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App