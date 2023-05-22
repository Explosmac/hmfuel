"use client"

import { user } from "@prisma/client"
import axios from "axios"
import { useSession } from "next-auth/react"
import { createContext, useContext } from "react"
import useSWR from "swr"

const GlobalContext = createContext<any>(null)

type GlobalProviderProps = {
  children: React.ReactNode
}

export type GlobalType = {
  user: user
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { status } = useSession()
  const { data: user } = useSWR<user>(
    status == "authenticated" ? `api/user` : null,
    (url) => axios.get(url).then((res) => res.data),
    { dedupingInterval: 30000 }
  )
  return (
    <GlobalContext.Provider
      value={{
        user
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

const useGlobal = () => useContext<GlobalType>(GlobalContext)

export { GlobalProvider, GlobalContext, useGlobal }
