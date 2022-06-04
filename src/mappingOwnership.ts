import { log } from '@graphprotocol/graph-ts'
import {insertUser} from './mappingUser'
import {BigInt, ethereum } from '@graphprotocol/graph-ts'

import {
    RoleAdminChanged,
    OwnershipTransferred,
    RoleGranted,
    RoleRevoked
} from "../generated/OwnershipFacet/OwnershipFacet"


import { RoleAdminChangedEntity, OwnershipTransferredEntity, 
    RoleGrantedEntity, RoleRevokedEntity} from "../generated/schema"

/*
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);

*/

export function handleRoleAdminChanged(event: RoleAdminChanged): void {
    // RoleAdminChanged(indexed bytes32,indexed bytes32,indexed bytes32)

    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let entity = new RoleAdminChangedEntity(id)


    entity.role = event.params.role.toHexString()
    entity.sender = event.transaction.from.toHexString()
    entity.previousAdminRole = event.params.previousAdminRole.toHexString()
    entity.newAdminRole = event.params.newAdminRole.toHexString()
    entity.createdAt = event.block.timestamp
    entity.txHash =  event.transaction.hash.toHex()
    entity.gasPrice =  event.transaction.gasPrice
    entity.gasLimit =  event.transaction.gasLimit
    entity.save()
    
  }
  
  
  export function handleRoleRevoked(event: RoleRevoked): void {
    // RoleAdminChanged(indexed bytes32,indexed bytes32,indexed bytes32)

    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let entity = new RoleRevokedEntity(id)


    entity.role = event.params.role.toHexString()
    entity.sender = event.transaction.from.toHexString()
    entity.account = event.params.account.toHexString()
    entity.createdAt = event.block.timestamp
    entity.txHash =  event.transaction.hash.toHex()
    entity.gasPrice =  event.transaction.gasPrice
    entity.gasLimit =  event.transaction.gasLimit
    entity.save()
    
  }
  
  
  export function handleOwnershipTransferredEntity(event: OwnershipTransferred): void {
    // RoleAdminChanged(indexed bytes32,indexed bytes32,indexed bytes32)
    //event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let entity = new OwnershipTransferredEntity(id)


    entity.sender = event.transaction.from.toHexString()
    entity.previousOwner = event.params.previousOwner.toHexString()
    entity.newOwner = event.params.newOwner.toHexString()
    entity.createdAt = event.block.timestamp
    entity.txHash =  event.transaction.hash.toHex()
    entity.gasPrice =  event.transaction.gasPrice
    entity.gasLimit =  event.transaction.gasLimit
    entity.save()
    
  }
  
  
  export function handleRoleGranted(event: RoleGranted): void {
    // RoleAdminChanged(indexed bytes32,indexed bytes32,indexed bytes32)

    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let entity = new RoleGrantedEntity(id)


    entity.role = event.params.role.toHexString()
    entity.sender = event.transaction.from.toHexString()
    entity.account = event.params.account.toHexString()
    entity.createdAt = event.block.timestamp
    entity.txHash =  event.transaction.hash.toHex()
    entity.gasPrice =  event.transaction.gasPrice
    entity.gasLimit =  event.transaction.gasLimit
    entity.save()
    
  }
  
  