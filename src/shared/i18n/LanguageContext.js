import React, { useState, useCallback } from 'react';
// import {i18nInit} from 'components/react-utils/i18n';
// import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import {Constants as AppConstants} from '../../shared/resources/Constants';

//--------------------------------------------------------------------------
export const LanguageContext = React.createContext();
export const LanguageProvider = ({children}) =>  {
	const {t, i18n} = useTranslation();
	const [langIndex, setLangIndex] = useState(AppConstants.LANGUAGE_INDEX);

	return (
		<LanguageContext.Provider value={{
			i18n:t,
			activeLanguage	: AppConstants.LANGUAGES[langIndex],
			setLangIndex	: useCallback((idx) => {
				i18n.changeLanguage(AppConstants.LANGUAGES[idx].lang);
				setLangIndex(idx);
			}, [i18n])
		}}>
			{children}
		</LanguageContext.Provider>
	)
}

// export const LanguageProvider = () =>
	// <Suspense fallback={<Loader loading/>}>
		// <LanguageProviderPanel />
	// </Suspense>
