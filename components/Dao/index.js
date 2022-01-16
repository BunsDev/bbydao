import React from "react"
import Head from "next/head"
import TransactionForm from "./TransactionForm"
import SidePanel from "./SidePanel"
import Graph from "./Graph"
import TokensNfts from "./TokensNfts"
import TxHistory from "./TxHistory"
import ProposalHistory from "./ProposalHistory"

const Dao = ({ data }) => {
  // console.log(data.collectibles[0].imageUri)

  return (
    <>
      <Head>
        <title>{`babydao | ${data.safeInfo.address.substring(0, 6)}...`}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col md:flex-row w-full h-screen mt-10">
        {/* at least one collectible to side panel */}
        {/* */}
        <SidePanel
          nftImage={data.collectibles[0].imageUri}
          safeInfo={data.safeInfo}
        />
        <div className="flex flex-col flex-start rounded md:rounded-xl shadow md:w-5/12 bg-gray-100 dark:bg-gray-800 px-4 md:px-10 p-3 mr-1">
          <Graph safeAddress={data.safeInfo.address} />
          <TokensNfts tokens={data.usd} collectibles={data.collectibles} />
          <TransactionForm safeAddress={data?.safeInfo.address} />
        </div>
        <div className="flex flex-col flex-start rounded md:rounded-xl shadow md:w-5/12 bg-gray-100 dark:bg-gray-800 px-4 md:px-10 p-3 ml-1">
          <TxHistory
            allTxs={data.allTxs}
            incomingTxs={data.incomingTxs}
            pendingTxs={data.pendingTxs}
          />
          <ProposalHistory />
        </div>
      </div>
    </>
  )
}

export default Dao