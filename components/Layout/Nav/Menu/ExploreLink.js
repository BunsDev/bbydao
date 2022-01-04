import React from "react"
import Link from "next/link"
import { BsGrid } from "react-icons/bs"

const ExploreLink = () => {
  return (
    <li className="w-full">
      <Link href={"/"}>
        <a className="flex flex-row rounded hover:shadow text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-1 py-2 justify-between">
          Explore
          <span className="self-center">
            <BsGrid />
          </span>
        </a>
      </Link>
    </li>
  )
}

export default ExploreLink