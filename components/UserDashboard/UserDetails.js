import React from "react"
import Link from "next/link"
import { useMutation, useQuery } from "react-query"

import * as api from "../../query"
import { useUiStore } from "stores/useUiStore"
import { useAccount, useConnect } from "wagmi"
import useFriendData from "hooks/useFriendData"

const UserDetails = ({ address, ens }) => {
  const [{ data: connectData, error: connectError }, connect] = useConnect()
  const [{ data, error, loading }, disconnect] = useAccount()
  const [friendData, { friendStatus, setFriendStatus }, friendActionText] =
    useFriendData(address)

  const parsedList = React.useMemo(() => {
    let list = {
      friends: [],
      following: [],
    }

    if (friendData) {
      for (const friend of friendData) {
        if (friend.status === 4) {
          list.following.push(friend)
        } else {
          list.friends.push(friend)
        }
      }
    }

    return list
  }, [friendData])

  const setFriendsModalAddress = useUiStore(
    state => state.setFriendsModalAddress
  )
  const setFriendsModalOpen = useUiStore(state => state.setFriendsModalOpen)

  const { status, mutateAsync } = useMutation(api.reqRelationship)

  const handleRequest = React.useCallback(() => {
    if (!data) {
      return
    }

    const req = {
      initiator: data.address,
      target: address,
      status: 3,
    }

    mutateAsync(req)
    setFriendStatus({ ...friendStatus, isRequested: true })
  }, [address, data, friendStatus])

  const handleOpenFriendsModal = () => {
    setFriendsModalAddress(address)
    setFriendsModalOpen()
  }

  const friendActionSection = React.useMemo(() => {
    if (
      !data ||
      !connectData ||
      friendStatus === null ||
      data.address === address
    ) {
      return null
    }
    return (
      <>
        {connectData.connected && friendStatus.isFriend ? (
          <button
            type="button"
            disabled
            className="mr-3 flex w-max transform flex-row rounded-full bg-gradient-to-r from-[#0DB2AC] via-[#FC8D4D] to-[#FABA32] p-0.5 shadow transition duration-500 ease-in-out hover:-translate-x-0.5 hover:bg-white hover:bg-gradient-to-l dark:hover:bg-slate-700"
          >
            <span className="block rounded-full bg-slate-200 px-6 py-[0.45rem] font-bold text-[#FC8D4D] hover:bg-opacity-50 hover:text-white dark:bg-slate-900 dark:hover:bg-opacity-75">
              frens
            </span>
          </button>
        ) : (
          <button
            className="my-4 w-max rounded-full bg-slate-200 px-4 py-2 shadow hover:bg-white disabled:cursor-not-allowed dark:bg-slate-900 dark:hover:bg-slate-700"
            type="button"
            onClick={handleRequest}
            disabled={friendStatus.isRequested}
          >
            {friendActionText}
          </button>
        )}
      </>
    )
  }, [address, connectData, data, friendStatus, friendActionText])

  return (
    <div className="mt-4 flex flex-col items-center text-center md:items-start md:text-left">
      {ens ? (
        <span className="h-10 w-full bg-gradient-to-r from-[#0DB2AC] via-[#FC8D4D] to-[#FABA32] bg-clip-text text-3xl text-transparent">
          @{ens}
        </span>
      ) : (
        <span className="h-10 w-full bg-gradient-to-r from-[#0DB2AC] via-[#FC8D4D] to-[#FABA32] bg-clip-text text-3xl text-transparent">
          @{`${address.substring(0, 6) + "..."}`}
        </span>
      )}

      {friendActionSection}

      <div className="mt-4 ml-4 mb-4 mr-4 flex flex-col">
        <button className="cursor-pointer" onClick={handleOpenFriendsModal}>
          <h1>
            {parsedList.following?.length}{" "}
            {parsedList.following?.length > 1 ? "follows" : "follow"}
          </h1>
        </button>
        <button className="cursor-pointer" onClick={handleOpenFriendsModal}>
          <h1>
            {parsedList.friends?.length}{" "}
            {parsedList.friends?.length === 1 ? "friend" : "friends"}
          </h1>
        </button>
      </div>
    </div>
  )
}

export default UserDetails
