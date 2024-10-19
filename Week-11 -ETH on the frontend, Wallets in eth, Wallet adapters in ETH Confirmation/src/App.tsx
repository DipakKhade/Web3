import { useEnsName, WagmiProvider } from "wagmi";
import { config } from "./wagmiConfig";
import { useAccount } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <EthBalance />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;

function EthBalance() {
  const { address } = useAccount();
  const { data, error, isLoading } = useEnsName({ address });

  if (error) <div>Error is occured</div>;

  if (isLoading) <div>Loading ...</div>;

  console.log(data);

  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
