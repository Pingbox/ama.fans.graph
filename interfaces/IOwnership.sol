// SPDX-License-Identifier: GNU AGPLv3
//https://choosealicense.com/licenses/

pragma solidity ^0.8.0;

interface IOwnership  {
   
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);

    struct RoleData {
        mapping(address => bool) members;
        bytes32 adminRole;
    }

    struct Storage {
        address contractOwner;        
        bytes32 adminRole;
        mapping(bytes32 => RoleData)  roles;

    }

    function transferOwnership(address _newOwner) external;
    function owner() external view returns (address owner_);
    function hasRole(bytes32 role, address account) external view returns (bool);
    function getRoleAdmin(bytes32 role) external view returns (bytes32);
    function grantRole(bytes32 role, address account) external ;
    function revokeRole(bytes32 role, address account) external ;
    function renounceRole(bytes32 role, address account) external ;
}