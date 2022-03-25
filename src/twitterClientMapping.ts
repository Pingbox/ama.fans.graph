import { BigInt } from "@graphprotocol/graph-ts"
import {
  DomainRegistered,
  RequestErrored,
  RequestFulfilled
} from "../generated/AmaChainlinkTwitterClient/AmaChainLinkTwitterClient"



import { AmaUserEntity, DomainRegisteredEntity, RequestErroredEntity, RequestFulfilledEntity} from "../generated/schema"

export function handleDomainRegistered(event: DomainRegistered): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type


  let registry = new DomainRegisteredEntity(event.params.useraddress.toHexString())

  registry.useraddress = event.params.useraddress.toHexString() 
  registry.nodeHash = event.params.nodehash
  registry.twitterId = event.params.twitterId
  registry.twitterUsername = event.params.twitterUsername
  registry.label = event.params.label
  registry.createdAt = event.block.timestamp
  registry.save()


  let user = AmaUserEntity.load(event.params.useraddress.toHexString())
  if (user) {
    user.twitterId  = event.params.twitterId
    user.twitterUsername  = event.params.twitterUsername
    user.save()
  }
}


export function handleRequestErrored(event: RequestErrored): void {
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let requestError = new RequestErroredEntity(id)
    requestError.useraddress = event.params.useraddress.toHexString()
    requestError.data = event.params.data
    
    requestError.save()
}

export function  handleRequestFulfilled(event: RequestFulfilled): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let requestFulfilled = new RequestFulfilledEntity(id)
  requestFulfilled.useraddress = event.params.useraddress.toHexString()
  requestFulfilled.data = event.params.data  
  requestFulfilled.save()

}
