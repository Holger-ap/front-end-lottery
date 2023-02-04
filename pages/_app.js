import "@/styles/globals.css"
import { MoralisProvider } from "react-moralis"

export default function App({ Component, pageProps }) {
    // the moralisProvider wraps around our whole app, so we can use it, the initializeonmount, can be used to use their servers, which we dont wish to do rn.
    return (
        <MoralisProvider initializeOnMount={false}>
            <Component {...pageProps} />
        </MoralisProvider>
    )
}
