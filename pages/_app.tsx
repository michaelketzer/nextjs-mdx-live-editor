import '../styles/globals.css';

import { AppProps } from 'next/app';
import { ReactElement } from 'react';

const MyApp = ({ Component: AppComponent, pageProps }: AppProps): ReactElement => <AppComponent {...pageProps} />;

export default MyApp;
