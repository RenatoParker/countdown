import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {

  startClock() {
    setTimeout(() => {
      this.setState({
        seconds: this.state.seconds + 1
      })
      
      this.startClock()
    }, this.state.seconds * 1000)
  }
  componentDidMount() {
    this.startClock()
  }
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}