import { useWeb3Contract } from "react-moralis"
import { contractAddresses, abi } from "../constants/" //when we have thhe index file we just need to specify the folder.
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis() //takes it from the header, moralis, returns the hex. ouyll out the chain id from moralis, and rename it ChainIDHex
    const chainId = parseInt(chainIdHex) //convert it from hex to normal number.
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [EntranceFee, setEntranceFee] = useState("0") //entrance fee will print out the entrance fee(get), setEntranceFee will be the function we call to set the entranceFee. 0 is starign value

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRafffle",
        params: {},
        msgValue: EntranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUI() {
                const entranceFeeFromCall = await getEntranceFee()
                setEntranceFee(entranceFeeFromCall)
                console.log(`the enterance fee is ${EntranceFee}`)
            }
            updateUI()
        }
    }, [isWeb3Enabled])
    return (
        <div>
            Hi from LotteryEntrance!
            {raffleAddress ? (
                <div>Enterance Fee: {ethers.utils.formatUnits(EntranceFee, "ether")} ETH</div>
            ) : (
                <div></div>
            )}
        </div>
    )
}
