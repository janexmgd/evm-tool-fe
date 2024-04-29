import React, { Fragment, useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import {
  Button,
  Select,
  TextareaAutosize,
  MenuItem,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { isAddress } from 'ethers';
import { toast, Slide } from 'react-toastify';
import axios from 'axios';
const EvmBalance = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [listAddress, setListAddress] = useState('');
  const [network, setNetwork] = useState('base');
  const [loading, setLoading] = useState(false); // Tambahkan state loading
  const apiURL = 'https://evm-tool-api.vercel.app';
  const checkBalance = async (pNetwork, address) => {
    try {
      const url = `${apiURL}/wallet/balance/${pNetwork}?address=${address}`;
      const { data } = await axios.get(url);
      return data.data;
    } catch (error) {
      throw error.message;
    }
  };
  const parserList = () => {
    const arr = listAddress.split('\n');
    return arr.length;
  };

  const checkValidator = () => {
    const listAddressArr = listAddress.split('\n');
    try {
      listAddressArr.forEach((e, i) => {
        if (e == '' || e == null) {
          console.log('sss');
          throw new Error(`No address detected ${Date.now()}`);
        }
        if (!isAddress(e)) {
          throw new Error(
            `line number ${i + 1} is not a valid Address ${Date.now()}`
          );
        }
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError(false);
      setLoading(true);

      // return;
      checkValidator();
      const arrData = [];
      const listAddressArr = listAddress.split('\n');
      setLoading(true);
      toast.loading('Loading fetch data', {
        position: 'top-right',
        autoClose: 100000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      });
      for (let i = 0; i < listAddressArr.length; i++) {
        const data = await checkBalance(network, listAddressArr[i]);
        arrData.push({
          address: data.address,
          network: data.network,
          eth: data.eth,
        });
      }
      toast.dismiss();
      toast.success('Data loaded successfully', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      });
      setData(arrData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const notify = () => {
    toast.error(error, {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Slide,
    });
  };
  const handleReset = () => {
    try {
      setError(null);
      setListAddress('');
      setData(null);
      toast.success('Success reset', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
        transition: Slide,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (error && !loading) {
      notify();
    }
  }, [error]);

  return (
    <Fragment>
      <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
        <Navbar />
        <div className='container-fluid d-flex justify-content-center align-items-center'>
          <div className='container w-75 mt-1 d-flex align-items-center flex-column'>
            <h2 className='mt-1'>Check Balance</h2>
            <>
              {listAddress ? (
                data ? (
                  <p>Success get {data.length} data</p>
                ) : (
                  <p>detected {parserList()} line number</p>
                )
              ) : (
                <p>
                  Just insert your address and select your network, and it will
                  show the ETH balance
                </p>
              )}
              {data === null ? (
                <form
                  className='d-flex flex-column w-100 align-items-center mt-2'
                  onSubmit={handleSubmit}
                >
                  <div className='d-flex mb-3'>
                    <div
                      className='d-flex align-items-center justify-content-center'
                      style={{ marginRight: '10px' }}
                    >
                      Select Network
                    </div>
                    <Select
                      value={network}
                      onChange={(e) => setNetwork(e.target.value)}
                      maxRows={2}
                      style={{ width: '200px' }}
                    >
                      <MenuItem value='base'>Base Mainnet</MenuItem>
                    </Select>
                  </div>
                  <TextareaAutosize
                    className='w-50 p-3'
                    value={listAddress}
                    minRows={6}
                    maxRows={4}
                    placeholder='Enter Wallet address'
                    onChange={(e) => {
                      setListAddress(e.target.value);
                    }}
                  />
                  {error ? (
                    <div className='d-flex w-50 justify-content-center align-items-center mt-2'>
                      <Button
                        className='w-25 col-4 me-2'
                        variant='contained'
                        type='submit'
                        disabled={loading}
                      >
                        Run Again
                      </Button>
                      <Button
                        className='w-25 col-4 ms-2'
                        variant='contained'
                        disabled={loading}
                        onClick={handleReset}
                      >
                        Reset
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className='w-25 mt-2'
                      variant='contained'
                      type='submit'
                      disabled={loading}
                    >
                      Run
                    </Button>
                  )}
                </form>
              ) : (
                <>
                  <TableContainer
                    component={Paper}
                    variant='outlined'
                    className='w-75'
                  >
                    <Table
                      aria-label='data-table'
                      variant='outlined'
                      stickyHeader
                    >
                      <TableHead>
                        <TableCell sx={{ backgroundColor: '#65676b' }}>
                          Address
                        </TableCell>
                        <TableCell
                          align='left'
                          sx={{ backgroundColor: '#65676b' }}
                        >
                          Network
                        </TableCell>
                        <TableCell
                          align='left'
                          sx={{ backgroundColor: '#65676b' }}
                        >
                          Balance
                        </TableCell>
                      </TableHead>
                      <TableBody>
                        {data.map((e, i) => (
                          <TableRow
                            key={i}
                            sx={{
                              backgroundColor: i % 2 === 0 ? 'grey' : '#c5d1e3',
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              {e.address}
                            </TableCell>
                            <TableCell align='left'>{e.network}</TableCell>
                            <TableCell align='left'>{e.eth}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button
                    className='w-25 col-4 mt-3'
                    variant='contained'
                    disabled={loading}
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </>
              )}
            </>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default EvmBalance;
