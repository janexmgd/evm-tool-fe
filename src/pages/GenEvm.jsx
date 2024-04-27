import { TextField, Button, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { Wallet } from 'ethers';
const GenEvm = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [totalWallet, setTotalWallet] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const createWallet = (count) => {
    try {
      let i = 1;
      let wallets = [];
      let totalWallets = 0;

      while (i <= count) {
        const { address, privateKey } = Wallet.createRandom();
        const wallet = {
          address,
          privateKey: privateKey.substring(2),
        };
        wallets.push(wallet);
        totalWallets = wallets.length;
        setTotalWallet(totalWallets);
        console.log(totalWallet);
        i++;
      }

      setTotalWallet(totalWallets);
      return wallets;
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (count == 0) {
        alert('no 0 value please onichan');
        return;
      }
      const dataWallet = createWallet(count, e);
      setData(dataWallet);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setCount(0);
    }
  };
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }
  const copyToClipboard = () => {
    const text = data.map((e) => `${e.address} ${e.privateKey}`).join('\n');
    copyTextToClipboard(text)
      .then(() => {
        alert('success copied text');
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Fragment>
      <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
        <Navbar />
        <div className='container-fluid d-flex justify-content-center align-items-center'>
          <div className='container w-75 mt-1 d-flex align-items-center flex-column'>
            <h2 className='mt-1 mb-5'>Evm Generator</h2>
            {data === null ? (
              totalWallet > 0 ? (
                <div className='d-flex flex-row w-100'>
                  Lagi loading dulu bos {totalWallet} wallet dibuat
                </div>
              ) : (
                <form className='d-flex flex-row w-100' onSubmit={handleSubmit}>
                  <TextField
                    className='w-100'
                    type='number'
                    label='Enter Wallet Count'
                    variant='outlined'
                    onChange={(e) => {
                      setCount(e.target.value);
                    }}
                    InputProps={{
                      inputProps: {
                        min: 0,
                        max: 100,
                      },
                    }}
                  />

                  <Button
                    className='w-15'
                    variant='contained'
                    type='submit'
                    disabled={loading}
                  >
                    Generate
                  </Button>
                </form>
              )
            ) : (
              <div className='d-flex flex-column w-100 align-items-center justify-content-center'>
                <div>Result</div>
                <div className='mb-5'>Format Address Private key</div>
                <div className='d-flex flex-row w-100'>
                  <Button
                    className='w-100'
                    variant='contained'
                    onClick={() => {
                      copyToClipboard();
                    }}
                  >
                    Copy result
                  </Button>
                  <Button
                    className='w-100'
                    variant='contained'
                    onClick={() => {
                      setCount(0);
                      setData(null);
                      setTotalWallet(0);
                    }}
                  >
                    Reset
                  </Button>
                </div>
                <TextField
                  name='asu'
                  multiline
                  fullWidth
                  variant='outlined'
                  value={data
                    .map((e) => `${e.address} ${e.privateKey}`)
                    .join('\n')}
                />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};
export default GenEvm;
