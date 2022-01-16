import React from "react"
import Dao from "components/Dao"
import SafeServiceClient from "@gnosis.pm/safe-service-client"
import { useConnect } from "wagmi"

const DaoPage = ({ data }) => {
  const [{ data: connectData, error, loading }, connect] = useConnect()

  return <Dao data={data} />
}

export default DaoPage

DaoPage.getInitialProps = async ({ query }) => {
  const safeService = new SafeServiceClient(
    "https://safe-transaction.gnosis.io"
  )

  const safeInfo = await safeService.getSafeInfo(query.address)
  const usd = await safeService.getUsdBalances(query.address)
  const allTxs = await safeService.getMultisigTransactions(query.address)
  const pendingTxs = await safeService.getPendingTransactions(query.address)
  const collectibles = await safeService.getCollectibles(query.address)
  const incomingTxs = await safeService.getIncomingTransactions(query.address)

  return {
    data: { safeInfo, usd, allTxs, pendingTxs, collectibles, incomingTxs },
  }
}