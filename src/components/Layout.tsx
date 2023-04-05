import Header from "./Header"
import { ReactNode } from "react"

// https://stackoverflow.com/a/64722878

interface MyProps {
    children?: ReactNode;
 }

export default function Layout({ children }: MyProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
