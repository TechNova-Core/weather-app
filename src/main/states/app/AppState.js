import AppReducer from './AppReducer.js';
import {createContext, useCallback, useContext, useReducer, useState} from "react";
import { useLocation } from 'react-router-dom';
import {SessionContext} from "../../../shared/system-controls/session/SessionProvider";
// import { Commands } from 'src/shared/resources/Commands';
// import { SessionContext } from 'shared/system-controls/session/SessionProvider';

export const AppContext = createContext();

const OLD_BROWSERS = { firefox: 55, chrome: 80 };
const isMobileDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator?.userAgent);


//----------------------------
const getBrowserInfo = (navigator) => {
  try {
    var ua = navigator.userAgent;
    var tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return { browser: M[0], version: M[1] };
  }
  catch (err) {
    return { browser: 'chrome', version: '50' }
  }
};

//----------------------------
const AppState = ({ children }) => {
  const initialState = { };
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { asyncServiceCall, sessionActive } = useContext(SessionContext);
  const [windowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [{ browser, version },] = useState(getBrowserInfo(navigator));
  const isOldBrowser = Object.keys(OLD_BROWSERS).some(c => c.toUpperCase() === browser?.toUpperCase() && +version <= OLD_BROWSERS[c]);
  const location = useLocation();

   const isIphoneOS = navigator?.userAgent.toLowerCase().includes('iphone');

  const isUserFromAndroidApp = location.search.includes('app=1')

  //-------------------------------------------
  const getConstants = useCallback(async () => {
    try {
      dispatch({ type: 'LOADING' });
      let res = await asyncServiceCall('...', {});
      dispatch({ type: 'LOADED' });
      dispatch({ type: 'SET_STATE_DATA', payload: { Constants: res } });
    }
    catch (err) {
      console.log(err);
      dispatch({ type: 'LOAD_FAILED', payload: Object.assign({}, { text: err.response?.data?.message || (err + ""), type: 'danger' }) });
    }
  }, [asyncServiceCall]);


  //-----------------------------------------------------------------
  // useEffect(() => {
  //   const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
  //
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);



  return (
    <AppContext.Provider
      value={{
        isMobile: windowDimensions?.width < 768,
        isIphoneOS,
        isUserFromAndroidApp,
        isTablet: windowDimensions?.width >= 768 && windowDimensions?.width < 1024,
        isWideTablet: windowDimensions?.width >= 980 && windowDimensions?.width < 1024,
        isMobileTablet: windowDimensions?.width < 1024,
        windowDimensions,
        sessionActive,
        state,
        isOldBrowser: isOldBrowser,
        // isOldBrowser: true, //test
        ...state,
        dispatch,
        getConstants,
        isMobileDevice: isMobileDevice || ["http://localhost", "http://192.168"].some(c => window.location.href.startsWith(c)),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppState;
