import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Layout from '@/components/Layout'
import "../styles/root.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return(
    <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </SessionProvider>
  )
}
