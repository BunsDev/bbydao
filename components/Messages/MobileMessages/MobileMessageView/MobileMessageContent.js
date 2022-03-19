import React from "react"
import MessageViewCard from "components/Messages/MessageView/MessageViewCard"
import { useMessageStore } from "stores/useMessageStore"
import * as api from "query"
import { useQuery } from "react-query"

const MobileMessageContent = () => {
  const { threadChannel } = useMessageStore()
  const { data: messages } = useQuery(
    ["thread messages", threadChannel],
    () => api.getThreadMessages({ channel: threadChannel }),
    {
      enabled: !!threadChannel,
      // retry: false,
      // retryOnMount: false,
      // refetchOnWindowFocus: false,
      // staleTime: Infinity,
    }
  )

  if (!messages?.length) {
    return (
      <div className="bg-slate-50 px-3 pb-44 dark:bg-slate-800">
        No Messages
      </div>
    )
  }

  return (
    <div className="bg-slate-50 px-3 pb-32 pt-4 dark:bg-slate-800">
      {messages?.map(message => (
        <MessageViewCard key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MobileMessageContent