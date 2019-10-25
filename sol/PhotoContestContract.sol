pragma solidity ^0.5.11;
contract PhotoContestContract {
    bytes32 _name;
    address _owner;
    bytes32[] _ipfsPhotoHashes;
    address payable[] _submissionAddresses;
    constructor(bytes32 name) public {
        _owner = msg.sender;
        _name = name;
    }
    function submit(bytes32 photoHash) public {
        _submissionAddresses.push(msg.sender);
        _ipfsPhotoHashes.push(photoHash);
    }
    function getSubmissions() public view returns (bytes32[] memory) {
        return _ipfsPhotoHashes;
    }
    function selectWinner(bytes32 photoHash) public {
        require(msg.sender == _owner, "You are not the owner.");
        for (uint n = 0; n < _ipfsPhotoHashes.length; n++) {
            if (_ipfsPhotoHashes[n] == photoHash) {
                address payable winner = _submissionAddresses[n];
                winner.transfer(address(this).balance);
            }
        }
    }
}