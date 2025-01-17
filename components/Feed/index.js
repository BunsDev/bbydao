import React from "react"
import Head from "next/head"
import * as api from "query"
import { useQuery } from "react-query"
import { useAccount } from "wagmi"
import { useUiStore } from "stores/useUiStore"
import FriendRequest from "./FriendRequest"

const Feed = () => {
  const [
    { data: accountData, error: accountError, loading: accountLoading },
    disconnect,
  ] = useAccount()
  const setNotificationCount = useUiStore(state => state.setNotificationCount)

  const { data } = useQuery(["notifications"], () =>
    api.userNotifications({ target: accountData.address })
  )

  if (data) {
    console.log("data", data)
    setNotificationCount(data?.notificationCount)
  }

  return (
    <>
      <Head>
        <title>{"bbyDAO | feed"}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-full w-full flex-col pt-4">
        {data?.parsedNotifs?.FRIEND_REQUESTS?.length ? (
          data.parsedNotifs.FRIEND_REQUESTS.map(notif => (
            <FriendRequest
              key={notif.id}
              id={notif.id}
              relationshipRef={notif.ref}
              body={notif.body}
              seen={notif.seen}
            />
          ))
        ) : (
          <h1>no notifications</h1>
        )}
      </div>
    </>
  )
}

export default Feed
