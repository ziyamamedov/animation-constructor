import './styles/reset.css'
import './styles/fonts.css'
import {createGlobalStyle} from 'styled-components'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {EditPage} from 'src/pages/edit/index.tsx'
import {PreviewPage} from 'src/pages/preview/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <EditPage />,
  },
  {
    path: '/preview',
    element: <PreviewPage />,
  },
])

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
  }

  html, body {
    height: 100%;
  }
  #root {
    width: 100%;
    height: 100%;
  }
`

export default App

