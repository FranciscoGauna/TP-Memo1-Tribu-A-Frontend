import Layout from "@/components/layout"
import { RecursosProvider } from "@/context/recursos/recursoProvider"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecursosProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </RecursosProvider>
  )
}
