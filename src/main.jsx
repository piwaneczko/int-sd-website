import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/tailwind.css'

const rootElement = document.getElementById('root')

// Prerendered pages ship with markup already inside #root; hydrate instead of
// re-rendering from scratch. In dev (or any route without prerendered HTML),
// #root starts empty and a plain client render is used instead.
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
