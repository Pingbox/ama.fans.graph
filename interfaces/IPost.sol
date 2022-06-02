// SPDX-License-Identifier: GNU AGPLv3
//https://choosealicense.com/licenses/

pragma solidity ^0.8.0;



interface IPost  {
   
    event AmountReceived(address indexed receiver, uint256 value);
    event PostCreated(bytes32 indexed postId, 
                    address indexed createdBy,
                    uint256 value,
                    string link);

    event PostTipCreated(bytes32 indexed postId, 
                        bytes32 indexed postTipId, 
                        address indexed createdBy, 
                        uint256 value);


     struct Post{
        string postLink;
        uint256 initialValue;
        uint256 tipsTotalValue; //Including the tips
        address createdBy;
        bytes32[] postTipIds;
        uint256 createdTime;
        uint256 tokenId;
    }

    struct PostTip{
        address createdBy;
        uint256 value;
        uint256 createdTime;
        bytes32 postId;
    }


    struct Storage{
        bool initialized;
        uint256  postMinimumBid;
        string baseURI;
        mapping(bytes32 => Post)  posts;
        mapping(bytes32 => PostTip)  postTips;
        bytes32[]  postIds; //Array of IDs of all the posts created till now
        bytes32[]  postTipIds; ////Array of IDs all the postTips created till now
    }


    //Raises an error if minimumBid is not met
    function setPostMinimumBid(uint256 _postMinimumBid) external ;
    function uri(string memory contentHash_) external view  returns (string memory) ;
    function setPostBaseURI(string memory _baseURI) external ; 
    function initPost(uint256 postMinimumBid_, string memory baseURI_) external ;
    function createPost(string memory postHash_) external payable returns (bytes32) ;
    function createPostTip(bytes32 postId_) external payable ;
    function getPost(bytes32 postId_) external view
        returns(uint256 intialValue, uint256 tipsTotalValue, address createdBy, uint256 createdTime);
    function getPostTip(bytes32 postTipId_) 
        external
        view
        returns (address createdBy, uint256 value, uint256 createdTime, bytes32 postId);
    function getPostIds(uint256 skip_, uint256 limit_)
            external
            view
            returns (bytes32[] memory, uint256);
    function getPostTipIds(
                uint256 skip_, 
                uint256 limit_) 
            external 
            view
            returns (bytes32[] memory, uint256);

    function getTipIdsOnPost(bytes32 postId_,
                            uint256 skip_, 
                            uint256 limit_)
            external
            view
            returns (bytes32[] memory, uint256);
    receive() external payable;
}