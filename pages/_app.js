import SSRProvider from "react-bootstrap/SSRProvider";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import ModalRoot from "../components/Modals/ModalUtils";
import "react-toastify/dist/ReactToastify.css";
// import "react-popper-tooltip/dist/styles.css";
import "../styles/_globals.scss";
import { MongoRoot } from "../components/Mongo/MongoUtils";
import {
    Provider as RollbarProvider,
    ErrorBoundary as RollbarBoundry,
} from "@rollbar/react"; // <-- Provider imports 'rollbar' for us
import { QueryClient, QueryClientProvider } from "react-query";

// same configuration you would create for the Rollbar.js SDK
const rollbarConfig = {
    accessToken: process.env.NEXT_PUBLIC_POST_CLIENT_ITEM_ACCESS_TOKEN,
    environment: "production",
    enabled: process.env.NEXT_PUBLIC_PRODUCTION_MODE,
    autoInstrument: {
        log: false,
    },
    // server: {
    //   root: "http://example.com/",
    //   branch: "main"
    //   },
    //   code_version: "0.13.7",
    //   person: {
    //     id: 117,
    //     email: "chief@unsc.gov",
    //     username: "john-halo"
    //   }
    // }
};
//            {/* Provider instantiates Rollbar client instance handling any uncaught errors or unhandled promises in the browser */}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
    return (
        <RollbarProvider config={rollbarConfig}>
            {/* ErrorBoundary catches all React errors in the tree below and logs them to Rollbar */}
            <RollbarBoundry>
                {/* // all other app providers and components - Rollbar will just work */}
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
            </RollbarBoundry>
        </RollbarProvider>
    );
}

export default MyApp;
