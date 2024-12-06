

import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react';
import { useMainContract } from "./hooks/useMainContract";
function App() {
  const {
    contract_address,
    id,
    counter,
  } = useMainContract();
  return (
    <>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          <div className='Hint'>{id}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter ?? "Loading..."}</div>
        </div>
      </div>
    </>
  )
}

export default App
