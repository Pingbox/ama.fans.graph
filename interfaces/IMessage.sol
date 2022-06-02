// SPDX-License-Identifier: GNU AGPLv3
//https://choosealicense.com/licenses/

pragma solidity ^0.8.0;



interface IMessage  {
   
    event MessageCreated(address indexed recipient, bytes32 indexed messageId, address indexed createdBy, bytes data);
    event MessageValueClaimed(bytes32 indexed messageId, address indexed createdBy, uint256 value);
    event TipCreated(bytes32 indexed messageId, bytes32 indexed tipId, address indexed createdBy, uint256 value);
    event TipValueClaimed(bytes32 indexed messageId,  bytes32 indexed tipId, address indexed createdBy, uint256 value);
    event ResponseCreated(bytes32 indexed messageId,
                    address indexed owner,
                    address indexed creator, 
                    string answerLink,
                    uint256 responseValue,
                    uint256 value);

    event ResponseMarked(bytes32 indexed messageId, 
                        address indexed owner,
                        address indexed answerer,
                        uint responseType);

    event AmountReceived(address indexed receiver, uint256 value);

    enum State{ACTIVE, 
        CLAIMED,
        DELETED,
        ANSWERED}

    enum MessageType{
        PUBLIC,
        PRIVATE
    }

    enum ResponseType{
        DEFAULT,
        GOOD,
        BAD
    }


    struct Message{
        string messageLink;
        string answerLink;
        uint256 initialValue;
        uint256 totalValue; //Including the tips
        address createdBy;
        address answeredBy;
        bytes32[] tipIds;
        uint256 createdTime;
        uint256 expiryTime;
        State state;
        uint256 responseValue;
        ResponseType responseType;
        uint messageType;

    }

    struct Tip{
        address createdBy;
        uint256 value;
        uint256 createdTime;
        bytes32 messageId;
        bool claimed;
    }


    struct Storage{
        bool initialized;
        uint256  publicMinimumBid;
        uint256  privateMinimumBid;
        uint256  feeNumerator; /* The amount of fee charged by last post on the messages being published */
        uint256  minTimeLock;
        uint256  recipientUpFront;
        string  baseURI;
        mapping(bytes32 => Message)  messages;
        mapping(bytes32 => Tip)  tips;
        bytes32[]  publicMessageIds; // messages received by the user
        bytes32[]  privateMessageIds; //Private messages received by the user
        bytes32[]  tipIds; //Array of all the IDs of all Tips created till now
    }


    function getMinimumBid(uint _messageType) external view returns (uint256);
    function setMinimumBid(uint256 _minimumBid, uint _messageType) external ;
    function setRecipientUpFront(uint256 _recipientUpFront) external;
    function setMessageBaseURI(string memory _baseURI) external; 
    function initMessage(uint256 minimumBid_, uint256 feeNumerator_, string memory baseURI_) external;
    function createMessage(address recipient_, uint256 timelock_, uint messageType_, string memory messageHash_) payable external returns (bytes32 messageId);
    function createResponse(bytes32 messageId_, string memory answerHash_) payable external;
    function createTip(bytes32 messageId_) payable external;
    function claimBackMessageValue(bytes32 messageId_) external; 
    function claimBackTipValue(bytes32 tipId_) external;
    function getMessage(bytes32 messageId_) external view  returns(string memory, string memory, uint256, uint256, address, address, uint256, uint256, uint, uint, uint256); 
    function gePublicMessageIds(uint256 skip_, uint256 limit_) external view returns (bytes32[] memory, uint256);
    function getPrivateMessageIds(uint256 skip_, uint256 limit_) external view returns (bytes32[] memory, uint256);
    function getTipIdsOfMessage(bytes32 messageId_, uint256 skip_,  uint256 limit_)  external view returns (bytes32[] memory, uint256);
    function getTipIds(uint256 skip_, uint256 limit_) external view returns (bytes32[] memory, uint256);
    receive() payable external;
}