// use yarn dev to open project in browser
import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import styles from "@/styles/Home.module.css"
//import Header from "@/components/Manuel-Header" // import from header.jsx in components folder.
//import ManuelHeader from "@/components/Manuel-Header"
import Header from "../components/header"
import LotteryEntrance from "@/components/LotteryEntrance"
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title> Smart contract Lottery</title>
                <meta name="description" content="our smart contract lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <LotteryEntrance />
        </div>
    )
}
