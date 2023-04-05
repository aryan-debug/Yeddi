import Link from 'next/link'
import styles from "../components/styles/404.module.css"
import { Inter } from 'next/font/google'


const inter = Inter({subsets: ["latin"]});

export default function FourOFour() {
  return (
    <div className = {`${styles.container} ${inter.className}`}>
        <h1>404 - Page Not Found</h1>
        <Link href="/">Home</Link>
    </div>
  )
}