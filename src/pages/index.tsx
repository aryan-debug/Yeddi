import Header from "@/components/Header"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  
  return (
    <>
    </>
  )
}
