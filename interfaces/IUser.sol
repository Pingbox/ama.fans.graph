// SPDX-License-Identifier: GNU AGPLv3
//https://choosealicense.com/licenses/

pragma solidity ^0.8.0;



interface IUser  {
   
    event Withdraw(address indexed user, uint256 value);
    event Transfer(address indexed sender, address indexed recipient,uint256 value);
    event Blocked(address indexed blocker , address indexed blocked);
    event UnBlock(address indexed unblocker , address indexed unblocked);
    event Whitelisted(address indexed whitelister , address indexed whitelisted);
    event UnWhitelisted(address indexed unwhitelister , address indexed unwhitelisted);
    event Follow(address indexed followed, address indexed follower);
    event UnFollow(address indexed unfollowed, address indexed unfollower);
    event AmountReceived(address indexed receiver, uint256 value);

    enum AccessState{
        ACTIVE,
        BLOCKED,
        WHITELISTED
    }


    struct User{
        uint256 publicMinimumBid;
        uint256 privateMinimumBid;
        bytes verified;
        mapping(address => uint256) followersList;
        mapping(address => AccessState) accessList;
    }

    struct Storage{
        bool initialized;
        mapping(address => User)  users;
    }


    function getUserMinimumBid(address _sender, address _recipient, uint _messageType) external view returns (uint256);
    function setUserMinimumBid(uint256 minimumBidByUser, uint _messageType) external ;
    function blockUser(address address_) external;
    function unBlockUser(address address_) external;
    function whitelistUser(address address_) external;
    function unWhitelistUser(address address_) external;
    function followUser(address address_) external; 
    function unfollowUser(address address_) external; 
    function checkFollower(address sender_, address recipient_) external view returns (bool);
    function checkBlocked(address blocked_, address blocker_) external view returns (bool);
    function checkWhitelist(address whitelisted_, address whitelister_) external view returns (bool);
    function userBalance() external view  returns (uint256);
    function withdraw(uint256 _amount) external;
    function transfer(uint256 amount_,address recipient_) external;
    receive() payable external;
}