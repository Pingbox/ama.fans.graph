// SPDX-License-Identifier: GNU AGPLv3
//https://choosealicense.com/licenses/

pragma solidity ^0.8.0;

interface ISession  {
   
    event SessionCreated(bytes32 indexed sessionId, 
                    address indexed owner,
                    uint256 startTime,
                    uint256 endTime,
                    uint256 rewardPerAMA,
                    uint256 rewardPool,
                    string link);

    event SessionLinkUpdated(bytes32 indexed sessionId, 
                        string link);

    event SessionTopUp(bytes32 indexed sessionId, 
                            uint256 newRewardPool, 
                            uint256 additionalFund);

    event SessionEndTimeUpdated(bytes32 indexed sessionId, 
                            uint256 newEndTime, 
                            uint256 additionalTime);

    event RewardDistributedOnAma(bytes32 indexed sessionId,
                            bytes32 indexed messageId,
                            uint256 rewardPerAMA,
                            uint256 rewardsLeft);

    event SessionEndedBeforeTime(bytes32 indexed sessionId, 
                            uint256 oldEndTime, 
                            uint256 newTime);


    event SessionRewardLeftClaimed(bytes32 indexed sessionId, 
                            uint256 rewardLeft);

    event AmountReceived(address indexed receiver, uint256 value);


    struct Session{
        address owner;
        uint256 startTime;
        uint256 endTime;
        uint256 rewardPerAMA;
        uint256 rewardPool;
        uint256 rewardLeft;
        uint256 createdTime;
        bool rewardLeftClaimed;
        string sessionLink;
    }

    struct Storage {
        bool initialized;
        string  baseURI;
        uint256  minSessionDuration;
        mapping(bytes32 => Session)  sessions;
        mapping(address => bytes32[])  addreessToSessions; ////Array of IDs all the sessions created till now
    }

    function setSessionBaseURI(string memory baseURI_) external;
    function initSession(uint256 minSessionDuration_, string memory baseURI_) external;
    function sessionRewardPerAma(bytes32 sessionId_) external view returns (uint256) ; 
    function updateSessionLink( bytes32 sessionId_, string memory newHash_) external ;
    function topUpSession(bytes32 sessionId_, uint256 additionalFund_) external;
    function extendSession(bytes32 sessionId_, uint256 additionalTime_) external;
    function endSession(bytes32 sessionId_) external;
    function claimRewardLeft(bytes32 sessionId_) external ;
    function deductRewardOnReply(bytes32 sessionId_, bytes32 messageId_) external;
    function createSession(uint256 startTime_, uint256 endTime_, uint256 rewardPerAMA_, string memory sessionHash_ ) external payable returns (bytes32);
    receive() payable external;
}