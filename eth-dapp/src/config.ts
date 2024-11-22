import {createConfig, http} from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const config = createConfig({
    chains: [mainnet, base],
    connectors: [
        injected(),
        // walletConnect({ projectId }),
        metaMask(),
        safe(),
      ],
      transports: {
        [mainnet.id]: http(),
        [base.id]: http(),
      },
})

export default config;