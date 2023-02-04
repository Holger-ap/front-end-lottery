import { useMoralis } from "react-moralis"
import { useEffect } from "react" //core hook, so u keep being connected even if u reload the page.

export default function ManuelHeader() {
    //makes export default, so we can export it to other places like our index.js

    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis() //hook a way to keep track of our app state.Hooks allow function components to have acces to state and other react featurs. so if we for example are connected to a wallet, the look of the website is different if we're not
    //account check if there is an account connected to the site.
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])
    return (
        <div>
            {account ? (
                <div>
                    connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected") //injected just means we're connected to the injected wallet metamask.
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    connect{" "}
                </button>
            )}
        </div>
    )
    // this does the following: if there is an account connected: it will say connected to (the address connected) and then we slice the length of the adddress so it looks prettier. If not account is connected we just show them the connect button.
    //[isWeb3Enabled]) //when web3 is enabled it becomes true, renders when something in that array changes, so when isWeb3Enabled gets updated it will re render.
}
