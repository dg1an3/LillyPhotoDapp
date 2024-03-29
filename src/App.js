import React, { Component } from 'react';
import './App.css';
import web3 from './Web3';
import bs58 from 'bs58';
import ipfs from './Ipfs';
import storehash from './Storehash';
import { Button } from 'reactstrap';

class App extends Component {
  state = {
    ipfsHash: null,
    buffer: '',
    ethAddress: '',
    transactionHash: '',
    txReceipt: ''
  };

  //Take file input from user
  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };

  //Convert the file to buffer to store on IPFS 
  convertToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS        
    const buffer = await Buffer.from(reader.result);
    //set this buffer-using es6 syntax        
    this.setState({ buffer });
  };

  //ES6 async function
  onClick = async () => {
    try {
      this.setState({ blockNumber: "waiting.." });
      this.setState({ gasUsed: "waiting..." });
      await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt) => {
        console.log(err, txReceipt);
        this.setState({ txReceipt });
      });
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();

    //bring in user's metamask account address     
    const accounts = await web3.eth.getAccounts();

    //obtain contract address from storehash.js      
    const ethAddress = await storehash.options.address;
    this.setState({ ethAddress });
    //save document to IPFS,return its hash#, and set hash# to state      
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash        
      this.setState({ ipfsHash: ipfsHash[0].hash });
      // call Ethereum contract method "sendHash" and .send IPFS hash to ethereum contract        
      //return the transaction hash from the ethereum contract      
      const decoded = bs58.decode(this.state.ipfsHash)
      const bytesFromBase58 = "0x" + decoded.slice(2).toString('hex')
      const encodedParam = web3.eth.abi.encodeParameter('bytes32', bytesFromBase58);
      storehash.methods.submit(encodedParam).send({
        from: accounts[0]
      }, (error, transactionHash) => {
        console.log(transactionHash);
        this.setState({ transactionHash });
      });
    })
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Lilly Picture Contest!</h1>
        </header>

        <hr />
        <grid>
          <h3> Choose file to send to IPFS </h3>
          <form onSubmit={this.onSubmit}>
            <input type="file" onChange={this.captureFile} />
            <Button bsStyle="primary" type="submit">      Send it             </Button>
          </form>
          <hr />
          <Button onClick={this.onClick}> Get Transaction Receipt </Button>
          <hr />
          <table bordered responsive>
            <thead>
              <tr>
                <th>Tx Receipt Category</th>
                <th> </th>
                <th>Values</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IPFS Hash stored on Ethereum</td>
                <td> : </td>
                <td>{this.state.ipfsHash}</td>
              </tr>
              <tr>
                <td>Ethereum Contract Address</td>
                <td> : </td>
                <td>{this.state.ethAddress}</td>
              </tr>
              <tr>
                <td>Tx # </td>
                <td> : </td>
                <td>{this.state.transactionHash}</td>
              </tr>
            </tbody>
          </table>
        </grid>
      </div>);
  }
}

export default App;
