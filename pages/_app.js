import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
import store from "@/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let persistor = persistStore(store);

const theme = createTheme();

const inter = Inter({ weight: "300", subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <main className={inter.className}>
      <Head>
        <title>Nails Republic</title>
        <meta
          name="description"
          content="The one stop online shop for all of your manicure and pedicure needs."
        />
        <link rel="icon" href="/nails_republic_icon.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PayPalScriptProvider deferLoading={true}>
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />

                <Component {...pageProps} />
              </PayPalScriptProvider>
            </PersistGate>
          </Provider>
        </SessionProvider>
      </ThemeProvider>
    </main>
  );
}
