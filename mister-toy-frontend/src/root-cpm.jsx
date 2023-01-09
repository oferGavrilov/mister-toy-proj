import './assets/style/main.css'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from './pages/about';
import { Provider } from 'react-redux';
import { store } from './store/store';


export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout-app">
          {/* <AppHeader /> */}
          <main>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<About />} path="/about" />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )

}

