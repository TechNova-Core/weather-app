import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { i18nInit } from './shared/i18n/i18nHooks';
import { Suspense, lazy } from 'react';
import { Loader } from './shared/controls/Loader';
import './index.css';

const AppLazy = lazy(() => import('./AppMain.js'))
const AppMain = (props) => <Suspense fallback={<Loader loading />}><AppLazy {...props} /></Suspense>


function App() {
  //-----------------------------
  useEffect(() => {
    i18nInit("fa");
  }, []);

  return <BrowserRouter><AppMain /></BrowserRouter>
}
export default App;
