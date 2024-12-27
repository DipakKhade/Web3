
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config'
import { useAccount, useEnsName } from 'wagmi'
import {  useDisconnect, useEnsAvatar } from 'wagmi'
import * as React from 'react'
import { Connector, useConnect } from 'wagmi'
import { TotalBalance } from './TotalBalance'
import { AllowUSDT } from './AllowUSDT'

function App() {
  const queryClient = new QueryClient()
  return (
   <>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        hi there
        <ConnectWallet />
        <Profile/>
        <TotalBalance/>
        <AllowUSDT/>
      </QueryClientProvider>
    </WagmiProvider>
   </>
  )
}


function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}



export function Profile() {
  const { address } = useAccount()
  const { data, error, status } = useEnsName({ address })
  if (status === 'pending') return <div>Loading ENS name</div>
  if (status === 'error')
    return <div>Error fetching ENS name: {error.message}</div>
  return <div>ENS name: {data}</div>
}



export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ))
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <button disabled={!ready} onClick={onClick}>
      {connector.name}
    </button>
  )
}



export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}


export default App
