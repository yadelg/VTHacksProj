import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Layout from './routes/Layout.tsx'


createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<App />} />



      
    </Route>
  </Routes>
</BrowserRouter>
)

