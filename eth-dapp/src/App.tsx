import { useConnect, useDisconnect, useEnsAvatar, WagmiProvider } from "wagmi"
import config from "./config"
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import { useAccount, useEnsName } from 'wagmi'

function App() {
  const Client = new QueryClient()
  return (
    <>
    <WagmiProvider config={config}>
      <QueryClientProvider client={Client}>
      <ConnectWallet />

      </QueryClientProvider>

    </WagmiProvider>
    </>
  )
}

export default App


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
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
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

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}