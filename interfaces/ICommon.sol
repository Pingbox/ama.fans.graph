// SPDX-License-Identifier: GNU AGPLv3
//https://choosealicense.com/licenses/

pragma solidity ^0.8.0;

interface ICommon  {
   

       
    struct Storage{
        bool initialized;
        mapping(address => uint256)  balances;
    }

    receive() payable external;
}