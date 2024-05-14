import AppState, { AppContext } from './main/states/app/AppState';
import { Component, lazy, Suspense, useContext, useEffect, useRef } from 'react';
import {Route, Routes} from 'react-router-dom';
import { Loader } from './shared/controls/Loader';
import { LanguageProvider } from './shared/i18n/LanguageContext';
import { Constants as AppConstants } from 'shared/resources/Constants';
import AuthRoute from './shared/system-controls/route/AuthRoute';
// import SessionProvider, { SessionContext } from './shared/system-controls/session/SessionProvider';
import SessionProvider from './shared/system-controls/session/SessionProvider';


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            if (AppConstants.DEVELOPMENT_MODE) return <></>;
            window.location = "/";
        }

        return this.props.children;
    }
}

const TestLazy = lazy(() => import('./main/views/TestView'))
const TestView = () => <Suspense fallback={<Loader loading />}><TestLazy /></Suspense>

const SystemDesignLazy = lazy(() => import('../src/main/panels/SystemDesign'))
const SystemDesignView = () => <Suspense fallback={<Loader loading />}><SystemDesignLazy /></Suspense>


//--------------------------------------------------------------------------
const Main = () => {
    // const { i18n } = useContext(LanguageContext);
    const btnTrigger = useRef();
    // const { sessionActive, sessionData } = useContext(SessionContext);
    const appContext = useContext(AppContext);
    let { isMobileDevice } = appContext || {};
    // const isOwner = sessionData?.profile?.accountType === 'ACCOUNT_TYPE_OWNER';
    const locationAddress = window.location.href;
    const isLocalHost = ["http://localhost", "http://192.168"].some(c => locationAddress?.startsWith(c));
    isMobileDevice = isMobileDevice || isLocalHost;
    // const [loaded, setLoaded] = useState();
    isMobileDevice = (isMobileDevice || isLocalHost);

    //-----------------------------------------------------------------
    useEffect(() => {
        // console.log(isMobileDevice(navigator?.userAgent));
        if (locationAddress.startsWith("http://") && isMobileDevice && !isLocalHost
        ) {
            setTimeout(() => btnTrigger.current?.click(), 1000);
        }
    }, [locationAddress, isMobileDevice, isLocalHost]);

    //-----------------------------------------------------------------
    useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 500);
    }, []);


    // if (!loaded ||) {
    //     return <>
    //     </>
    // }


    return (<>
        <Routes>
            <Route exact path='/' element={<TestView />} />
            <Route exact path='/test'>
                <Route exact path='1' element={<TestView />} />
                <Route exact path='2' element={<AuthRoute isAuthenticated={true} />}>
                    <Route index element={<TestView />} />
                </Route>
            </Route>
            <Route exact path='/system-design' element={<SystemDesignView/>}></Route>
        </Routes>
    </>)
}


const AppMain = (props) => <ErrorBoundary><LanguageProvider><SessionProvider sessionName="WEATHERAPP"><AppState><Main {...props} /></AppState></SessionProvider></LanguageProvider></ErrorBoundary>

export default AppMain;
