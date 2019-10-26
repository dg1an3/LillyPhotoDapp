import web3 from './Web3'

//Your contract address
const address = '0x6aace8759002e62da4050a652472921b77299368';

//Your contract ABI
const abi =
    [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "photoHash",
                    "type": "bytes32"
                }
            ],
            "name": "selectWinner",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "photoHash",
                    "type": "bytes32"
                }
            ],
            "name": "submit",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getSubmissions",
            "outputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "",
                    "type": "bytes32[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]

export default new web3.eth.Contract(abi, address);
