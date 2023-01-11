import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from './pages/about';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppHeader } from './cmps/app-header';
import { ToyIndex } from './pages/toy-index';
import { ToyDetails } from './pages/toy-details';
import { UserMsg} from'./cmps/user-msg'
import { ToyEdit } from './pages/toy-edit';
import { Dashboard } from './pages/dashboard';

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout-app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<About />} path="/about" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/details/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit/" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
            </Routes>
            <UserMsg />
          </main>
        </section>
      </Router>
    </Provider>
  )

}

