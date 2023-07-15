import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import ModalRoot from "../components/Modals/ModalUtils";
import "react-toastify/dist/ReactToastify.css";
import "../styles/_globals.scss";
import { MongoRoot } from "../components/Mongo/MongoUtils";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import { useRef, createContext } from 'react'

// import ReactGA from "react-ga";

// ReactGA.initialize("UA-227551059-1");
const queryClient = new QueryClient();
export const AppRefContext = createContext();

function MyApp({ Component, pageProps }) {
    const appRef = useRef();
    return (
        <>
            <Head>
                <link key="favicon" rel="icon" href="/favicon.ico" />
                <title key="title">Flippy - Flashcard App</title>
                {/* google metadata */}
                <meta
                    name="description"
                    content="Flippy is a cute flashcard app"
                    key="description"
                />
                <meta name="robots" content="index" key="robots" />
                {/* facebook */}
                <meta property="og:type" content="website" key="og:type" />
                <meta
                    property="og:title"
                    content="Flippy - Flashcard App"
                    key="og:title"
                />
                <meta
                    property="og:description"
                    content="Flippy is a cute flashcard app"
                    key="og:description"
                />
                <meta property="og:url" content="https://flippy.cards/" />
                <meta
                    property="og:image"
                    content="https://ucarecdn.com/23bcd3ee-07fe-4333-bb7a-f306d9b67efc/-/preview/-/quality/smart/"
                    key="og:image"
                />
                {/* twitter */}
                <meta
                    name="twitter:card"
                    content="summary_large_image"
                    key="twitter:card"
                />
                <meta
                    name="twitter:url"
                    content="https://flippy.cards/"
                    key="twitter:url"
                />
                <meta
                    name="twitter:title"
                    content="Flippy - Flashcard App"
                    key="twitter:title"
                />
                <meta
                    name="twitter:description"
                    content="Flippy is a cute flashcard app"
                    key="twitter:description"
                />
                <meta
                    name="twitter:image"
                    content="https://ucarecdn.com/74d88f63-44ee-41b5-9073-3a0bed158756/-/preview/-/quality/smart/"
                    key="twitter:image"
                />
            </Head>
            <Script
                crossorigin="anonymous"
                src="https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.at"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-227551059-1', 'auto');
          ga('send', 'pageview');
        `}
            </Script>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <MongoRoot>
                        <div
                            id="app-wrapper"
                            className="text-base text-blue-800 bg-blue-200"
                        >
                            <div
                                id="app"
                                className="absolute inset-0 z-10 flex flex-col w-full h-full p-0 m-0 overflow-auto"
                                ref={appRef}
                            >
                                <AppRefContext.Provider value={appRef}>
                                    <Component {...pageProps} />
                                </AppRefContext.Provider>

                            </div>
                            <ModalRoot />
                        </div>
                    </MongoRoot>
                    <ToastContainer />
                </RecoilRoot>
            </QueryClientProvider>
            <Script
                async
                defer
                strategy="afterInteractive"
                data-domains="flippy.cards"
                data-website-id="994c1e46-afd7-47cf-b148-a26406bc2cf2"
                src="https://umami.bmschoi.dev/umami.js"
            />
        </>
    );
}

export default MyApp;
