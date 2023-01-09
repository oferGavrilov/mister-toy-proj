import './assets/style/main.css'

import { About } from "./pages/about-us";
import { Home } from './pages/home-page';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Route, Router, Routes } from 'react-router-dom';

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          {/* <AppHeader /> */}
          <main>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<About />} path="/about" />

            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )

}