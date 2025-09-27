import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Layout from './routes/Layout.tsx'
import UserForm from './routes/UserForm.tsx'
import RecipePage from './routes/RecipePage.tsx'
import './index.css';




createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<App />} />

        <Route path="/form" element={<UserForm />} />

        <Route path="/recipes" element={< RecipePage/>} />
        
      </Route>

      
  </Routes>
</BrowserRouter>
)

