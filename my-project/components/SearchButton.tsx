
'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { experimental_useFormStatus } from "react-dom"

export const SearchButton = () => {
    const {pending}=experimental_useFormStatus()
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
  
        {pending&& "Searching"}
        {!pending&&  <MagnifyingGlassIcon className="h-5 w-5 text-white" />}
    </button>
  )
}
