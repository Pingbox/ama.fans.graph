
import { log } from '@graphprotocol/graph-ts'
import {insertUser} from './mappingUser'
import {BigInt, ethereum } from '@graphprotocol/graph-ts'

import {
    AmountReceived,
    SessionCreated,
    SessionLinkUpdated,
    SessionTopUp,
    SessionEndTimeUpdated, 
    RewardDistributedOnAma,
    SessionEndedBeforeTime,
    SessionRewardLeftClaimed

} from "../generated/SessionFacet/SessionFacet"


import { AmountReceivedEntity, SessionCreatedEntity, SessionLinkUpdatedEntity, SessionTopUpEntity,
    SessionEndTimeUpdateEntity, RewardDistributedOnAmaEntity, SessionEndedBeforeTimeEntity,
    SessionRewardLeftClaimedEntity, AmaUserEntity} from "../generated/schema"

/*
event SessionCreated(bytes32 indexed sessionId, address indexed owner, uint256 startTime,uint256 endTime,uint256 rewardPerAMA,uint256 rewardPool,string link);

event SessionLinkUpdated(bytes32 indexed sessionId, string link);

event SessionTopUp(bytes32 indexed sessionId, uint256 newRewardPool,uint256 additionalFund);

event SessionEndTimeUpdated(bytes32 indexed sessionId, uint256 newEndTime, uint256 additionalTime);

event RewardDistributedOnAma(bytes32 indexed sessionId,bytes32 indexed messageId,uint256 rewardPerAMA,uint256 rewardsLeft);

event SessionEndedBeforeTime(bytes32 indexed sessionId, uint256 oldEndTime, uint256 newTime);

event SessionRewardLeftClaimed(bytes32 indexed sessionId, uint256 rewardLeft);

event AmountReceived(address indexed receiver, uint256 value);

*/

export function handleAmountReceived(event: AmountReceived): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let entity = new AmountReceivedEntity(id)
    entity.receiver = event.params.receiver.toHexString()
    entity.value = event.params.value
    entity.createdAt = event.block.timestamp
    entity.txHash =  event.transaction.hash.toHex()
    entity.facet =  "session"
    entity.save()
}



export function handleSessionCreated(event: SessionCreated): void {

    let ownerId = event.params.owner.toHexString()
    let owner = AmaUserEntity.load(ownerId)

    if (!owner) {
        log.info('Sender couldnt be found {}', [ownerId])
        owner = insertUser(ownerId, event.block.timestamp)
    }

    if (!owner.sessionsCreated){
        owner.sessionsCreated = BigInt.fromI32(0)
    }

    if (!owner.valueSpentOnSessions){
        owner.valueSpentOnSessions = BigInt.fromI32(0)
    }

    owner.sessionsCreated  =  owner.sessionsCreated.plus(BigInt.fromI32(1))
    owner.valueSpentOnSessions  = owner.valueSpentOnPosts.plus(event.params.rewardPool)
    owner.save()

    let session = new SessionCreatedEntity(event.params.sessionId.toHexString())

    session.sessionId = event.params.sessionId
    session.owner = event.params.owner.toHexString()
    session.startTime = event.params.startTime
    session.endTime = event.params.endTime
    session.createdAt = event.block.timestamp
    session.rewardPerAMA = event.params.rewardPerAMA
    session.rewardPool = event.params.rewardPool
    session.link = event.params.link
    session.createdAt = event.block.timestamp
    session.txHash =  event.transaction.hash.toHex()
    session.gasPrice =  event.transaction.gasPrice
    session.gasLimit =  event.transaction.gasLimit
    session.save()
    
  }
  
  

export function handleSessionLinkUpdated(event: SessionLinkUpdated): void {
    let session = SessionCreatedEntity.load(event.params.sessionId.toString())
    if(session){
        session.link  = event.params.link
    }
    
    let object = new SessionLinkUpdatedEntity(event.params.sessionId.toHexString())
    object.txHash =  event.transaction.hash.toHex()
    object.gasPrice =  event.transaction.gasPrice
    object.gasLimit =  event.transaction.gasLimit
    object.createdAt = event.block.timestamp
    object.sessionId = event.params.sessionId
    object.link = event.params.link
    object.save()

}


export function handleSessionTopUp(event: SessionTopUp): void {
    let session = SessionCreatedEntity.load(event.params.sessionId.toString())
    if(session){
        session.rewardPool  = event.params.newRewardPool
    }
    
    let object = new SessionTopUpEntity(event.params.sessionId.toHexString())
    object.txHash =  event.transaction.hash.toHex()
    object.gasPrice =  event.transaction.gasPrice
    object.gasLimit =  event.transaction.gasLimit
    object.createdAt = event.block.timestamp
    object.sessionId = event.params.sessionId
    object.newRewardPool = event.params.newRewardPool
    object.additionalFund = event.params.additionalFund
    object.save()

}



export function handleSessionEndTimeUpdated(event: SessionEndTimeUpdated): void {
    let session = SessionCreatedEntity.load(event.params.sessionId.toString())
    if(session){
        session.endTime  = event.params.newEndTime
    }
    
    let object = new SessionEndTimeUpdateEntity(event.params.sessionId.toHexString())
    object.txHash =  event.transaction.hash.toHex()
    object.gasPrice =  event.transaction.gasPrice
    object.gasLimit =  event.transaction.gasLimit
    object.createdAt = event.block.timestamp
    object.sessionId = event.params.sessionId
    object.newEndTime = event.params.newEndTime
    object.additionalTime = event.params.additionalTime
    object.save()
}



export function handleRewardDistributedOnAma(event: RewardDistributedOnAma): void {

    let session = SessionCreatedEntity.load(event.params.sessionId.toString())
    if(session){
        session.rewardPoolLeft  = event.params.rewardsLeft
    }
    
    let object = new RewardDistributedOnAmaEntity(event.params.sessionId.toHexString())
    object.txHash =  event.transaction.hash.toHex()
    object.gasPrice =  event.transaction.gasPrice
    object.gasLimit =  event.transaction.gasLimit
    object.createdAt = event.block.timestamp
    object.sessionId = event.params.sessionId
    object.rewardsLeft = event.params.rewardsLeft
    object.rewardPerAMA = event.params.rewardPerAMA
    object.messageId = event.params.messageId
    object.save()
}



export function handleSessionEndedBeforeTime(event: SessionEndedBeforeTime): void {
    let session = SessionCreatedEntity.load(event.params.sessionId.toString())
    if(session){
        session.oldEndTime = session.endTime
        session.endTime  = event.block.timestamp
    }

    let object = new SessionEndedBeforeTimeEntity(event.params.sessionId.toHexString())
    object.txHash =  event.transaction.hash.toHex()
    object.gasPrice =  event.transaction.gasPrice
    object.gasLimit =  event.transaction.gasLimit
    object.createdAt = event.block.timestamp
    object.sessionId = event.params.sessionId
    object.oldEndTime = event.params.oldEndTime
    object.oldEndTime = event.params.oldEndTime
    object.save()

}


export function handleSessionRewardLeftClaimed(event: SessionRewardLeftClaimed): void {
    let session = SessionCreatedEntity.load(event.params.sessionId.toString())
    if(session){
        session.valueRefunnded  = event.params.rewardLeft
    }
    let object = new SessionRewardLeftClaimedEntity(event.params.sessionId.toHexString())
    object.txHash =  event.transaction.hash.toHex()
    object.gasPrice =  event.transaction.gasPrice
    object.gasLimit =  event.transaction.gasLimit
    object.createdAt = event.block.timestamp
    object.sessionId = event.params.sessionId
    object.rewardLeft = event.params.rewardLeft
    object.save()
}


