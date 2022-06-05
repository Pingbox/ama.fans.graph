
import { log } from '@graphprotocol/graph-ts'
import {insertUser} from './mappingUser'
import {BigInt, ethereum } from '@graphprotocol/graph-ts'

import {
    AmountReceived,
    SessionCreated,
    SessionLinkUpdated,
    SessionTopUp,
    SessionEndTimeUpdated, 
    SessionEndedBeforeTime,
    SessionRewardLeftClaimed

} from "../generated/SessionFacet/SessionFacet"


import { AmountReceivedEntity, SessionCreatedEntity, SessionLinkUpdatedEntity, SessionTopUpEntity,
    SessionEndTimeUpdateEntity, SessionEndedBeforeTimeEntity,
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

    session.sessionId = event.params.sessionId.toHexString()
    session.owner = event.params.owner.toHexString()
    session.startTime = event.params.startTime
    session.endTime = event.params.endTime
    session.createdAt = event.block.timestamp
    session.rewardPerAMA = event.params.rewardPerAMA
    session.rewardPool = event.params.rewardPool
    session.rewardPoolLeft = event.params.rewardPool
    session.link = event.params.link
    session.createdAt = event.block.timestamp
    session.txHash =  event.transaction.hash.toHex()
    session.gasPrice =  event.transaction.gasPrice
    session.gasLimit =  event.transaction.gasLimit
    
    session.save()
    
  }
  
  

export function handleSessionLinkUpdated(event: SessionLinkUpdated): void {
    let session = SessionCreatedEntity.load(event.params.sessionId.toHexString())
    if(session){
        session.link  = event.params.link
        session.save()
    }
    
    let sessionLinkUpdate = new SessionLinkUpdatedEntity(event.params.sessionId.toHexString())
    sessionLinkUpdate.txHash =  event.transaction.hash.toHex()
    sessionLinkUpdate.gasPrice =  event.transaction.gasPrice
    sessionLinkUpdate.gasLimit =  event.transaction.gasLimit
    sessionLinkUpdate.createdAt = event.block.timestamp
    sessionLinkUpdate.sessionId = event.params.sessionId.toHexString()
    sessionLinkUpdate.link = event.params.link
    sessionLinkUpdate.save()
}


export function handleSessionTopUp(event: SessionTopUp): void {
    let session = SessionCreatedEntity.load(event.params.sessionId.toHexString())
    if(session){
        session.rewardPool  = event.params.newRewardPool
        session.rewardPoolLeft = session.rewardPoolLeft.plus(event.params.additionalFund)
        session.save()

    }
    
    let sessionTopup = new SessionTopUpEntity(event.params.sessionId.toHexString())
    sessionTopup.txHash =  event.transaction.hash.toHex()
    sessionTopup.gasPrice =  event.transaction.gasPrice
    sessionTopup.gasLimit =  event.transaction.gasLimit
    sessionTopup.createdAt = event.block.timestamp
    sessionTopup.sessionId = event.params.sessionId.toHexString()
    sessionTopup.newRewardPool = event.params.newRewardPool
    sessionTopup.additionalFund = event.params.additionalFund
    sessionTopup.save()

}



export function handleSessionEndTimeUpdated(event: SessionEndTimeUpdated): void {
    let session = SessionCreatedEntity.load(event.params.sessionId.toHexString())
    if(session){
        session.oldEndTime = session.endTime
        session.endTime  = event.params.newEndTime
        session.save()
    }
    
    let sessionUpdated = new SessionEndTimeUpdateEntity(event.params.sessionId.toHexString())
    sessionUpdated.txHash =  event.transaction.hash.toHex()
    sessionUpdated.gasPrice =  event.transaction.gasPrice
    sessionUpdated.gasLimit =  event.transaction.gasLimit
    sessionUpdated.createdAt = event.block.timestamp
    sessionUpdated.sessionId = event.params.sessionId.toHexString()
    sessionUpdated.newEndTime = event.params.newEndTime
    sessionUpdated.additionalTime = event.params.additionalTime
    sessionUpdated.save()
}



export function handleSessionEndedBeforeTime(event: SessionEndedBeforeTime): void {
    let session = SessionCreatedEntity.load(event.params.sessionId.toHexString())
    if(session){
        session.oldEndTime = session.endTime
        session.endTime  = event.block.timestamp
        session.save()
    }

    let sessionUpdatedObject = new SessionEndedBeforeTimeEntity(event.params.sessionId.toHexString())
    sessionUpdatedObject.txHash =  event.transaction.hash.toHex()
    sessionUpdatedObject.gasPrice =  event.transaction.gasPrice
    sessionUpdatedObject.gasLimit =  event.transaction.gasLimit
    sessionUpdatedObject.createdAt = event.block.timestamp
    sessionUpdatedObject.sessionId = event.params.sessionId.toHexString()
    sessionUpdatedObject.oldEndTime = event.params.oldEndTime
    sessionUpdatedObject.oldEndTime = event.params.oldEndTime
    sessionUpdatedObject.save()

}


export function handleSessionRewardLeftClaimed(event: SessionRewardLeftClaimed): void {
    let session = SessionCreatedEntity.load(event.params.sessionId.toHexString())
    if(session){
        session.valueRefunded  = event.params.rewardLeft
        session.save()

    }
    let sessionRewardLeft = new SessionRewardLeftClaimedEntity(event.params.sessionId.toHexString())
    sessionRewardLeft.txHash =  event.transaction.hash.toHex()
    sessionRewardLeft.gasPrice =  event.transaction.gasPrice
    sessionRewardLeft.gasLimit =  event.transaction.gasLimit
    sessionRewardLeft.createdAt = event.block.timestamp
    sessionRewardLeft.sessionId = event.params.sessionId.toHexString()
    sessionRewardLeft.rewardLeft = event.params.rewardLeft
    sessionRewardLeft.save()
}


