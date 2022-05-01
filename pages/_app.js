import SSRProvider from "react-bootstrap/SSRProvider";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import ModalRoot from "../components/Modals/ModalUtils";
import "react-toastify/dist/ReactToastify.css";
import "../styles/_globals.scss";
import { MongoRoot } from "../components/Mongo/MongoUtils";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
// import ReactGA from "react-ga";

// ReactGA.initialize("UA-227551059-1");
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
    return (
        // <RollbarProvider config={rollbarConfig}>
        //     {/* ErrorBoundary catches all React errors in the tree below and logs them to Rollbar */}
        //     <RollbarBoundry>
        // {/* // all other app providers and components - Rollbar will just work */}
        <>
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
                    <SSRProvider>
                        <MongoRoot>
                            <ModalRoot />
                            <div id="app">
                                <Component {...pageProps} />
                            </div>
                        </MongoRoot>
                        <ToastContainer />
                    </SSRProvider>
                </RecoilRoot>
            </QueryClientProvider>
            <Script
                async
                defer
                data-domains="flippy.cards"
                data-website-id="994c1e46-afd7-47cf-b148-a26406bc2cf2"
                src="https://umami.bmschoi.dev/umami.js"
            />
        </>
        //     </RollbarBoundry>
        // </RollbarProvider>
    );
}

export default MyApp;
