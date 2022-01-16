import React from "react"
import PendingTxs from "./PendingTxs"
import AllTxs from "./AllTxs"

const TxHistory = ({ allTxs, incomingTxs, pendingTxs }) => {
  console.log("TxHistory allTxs", allTxs)
  console.log("TxHistory incomingTxs", incomingTxs)
  console.log("TxHistory pendingTxs", pendingTxs)
  return (
    <div className="flex flex-col mx-auto rounded shadow-xl w-full md:rounded-xl px-8 pt-6 pb-8 mb-3 bg-gray-100 dark:bg-gray-900">
      <PendingTxs pendingTxs={pendingTxs} />
      <AllTxs allTxs={allTxs} />
    </div>
  )
}

export default TxHistory