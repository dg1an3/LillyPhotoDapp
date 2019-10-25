import web3 from './Web3'

//Your contract address
const address = '0xc78e0e767c2d1bdba65412f95c245b254e49cfc0';

//Your contract ABI
const abi =
    [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "x",
                    "type": "string"
                }
            ],
            "name": "setHash",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getHash",
            "outputs": [
                {
                    "name": "x",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]

export default new web3.eth.Contract(abi, address);
