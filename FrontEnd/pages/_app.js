import '../styles/globals.css'
import { PersistGate } from 'redux-persist/integration/react';
import store from "@/store/store";
import {persistor} from "@/store/store";
import Head from "next/head";
import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from "react-redux";

function MyApp({ Component, pageProps }) {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <Script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                    crossOrigin="anonymous"
                />
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}

export default MyApp

