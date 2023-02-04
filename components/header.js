import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div>
            Lottery game
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
