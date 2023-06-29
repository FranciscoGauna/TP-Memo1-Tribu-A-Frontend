import Layout from "@/components/layout"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

console.log(process.env.NEXT_PUBLIC_PROJECTS_URL)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
