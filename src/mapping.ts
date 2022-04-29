import { BigInt } from "@graphprotocol/graph-ts"
import { log } from '@graphprotocol/graph-ts'

const platofrmId =  "0x39bea80e7720932f5ef0db947964fa325382ba8fe519ff0586e972a55eca12c3"

import {
  AmaFansCore,
  AmountReceived,
  Blocked,
  UnBlock,
  Whitelisted, 
  UnWhitelisted,
  ResponseMarked,
  Follow,
  UnFollow,
  Paused,
  ResponseCreated,
  MessageCreated,
  MessageValueClaimed,
  PostCreated,
  PostTipCreated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TipCreated,
  TipValueClaimed,
  Unpaused,
  Withdraw,
  Transfer
} from "../generated/AmaFansCore/AmaFansCore"



import { AmountReceivedEntity, ResponseCreatedEntity, MessageCreatedEntity, MessageValueClaimedEntity,
  TipCreatedEntity, TipValueClaimedEntity, AmaUserEntity, BlockedEntity, UnBlockedEntity,
  FollowEntity, UnFollowEntity, WhitelistedEntity, UnWhitelistedEntity, WithdrawEntity,
    ResponseMarkedEntity, PlatformIdentity, TransferEntity, PostEntity, PostTipEntity} from "../generated/schema"

export function handleAmountReceived(event: AmountReceived): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let entity = new AmountReceivedEntity(id)
  entity.sender = event.params.sender.toHexString()
  entity.value = event.params.value
  entity.createdAt = event.block.timestamp
  entity.txHash =  event.transaction.hash.toHex()

  entity.save()  

}


function insertUser(userAddress: string, timestamp: BigInt): AmaUserEntity{
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalUsers) {
    platform.totalUsers = BigInt.fromI32(0)  
  }
  platform.totalUsers = platform.totalUsers.plus(BigInt.fromI32(1))
  platform.save()





  log.debug('New user created {}', [userAddress])
    let user = new AmaUserEntity(userAddress)
    user.address = userAddress
    user.createdAt = timestamp

    user.postsCreated = BigInt.fromI32(0)
    user.messagesCreated = BigInt.fromI32(0)
    user.tipsCreated = BigInt.fromI32(0)
    user.postTipsCreated = BigInt.fromI32(0)
    
    user.blockUserCreated = BigInt.fromI32(0)
    user.followers = BigInt.fromI32(0)
    user.whitelistUserCreated =  BigInt.fromI32(0)
    user.responsesCreated = BigInt.fromI32(0)
    user.goodResponseCreated = BigInt.fromI32(0)
    user.badResponseCreated = BigInt.fromI32(0)
  
    user.messagesReceived = BigInt.fromI32(0)
    user.responsesReceived = BigInt.fromI32(0)
    user.blockUserReceived = BigInt.fromI32(0)
    user.following = BigInt.fromI32(0)
    user.whitelistUserReceived = BigInt.fromI32(0)
    user.goodResponseReceived = BigInt.fromI32(0)
    user.badResponseReceived = BigInt.fromI32(0)
    
    //Value Spent by user
    user.valueSpentOnTips = BigInt.fromI32(0)
    user.valueSpentOnPostTips = BigInt.fromI32(0)
    user.valueSpentOnMessages = BigInt.fromI32(0)


    //Value Received by user
    user.valueReceivedOnResponses = BigInt.fromI32(0)
    user.valueReceivedOnTips = BigInt.fromI32(0)
    user.valueReceivedOnPostTips = BigInt.fromI32(0)

    //Number of uints claimed back by user
    user.messagesClaimedBack = BigInt.fromI32(0)
    user.tipsClaimedBack = BigInt.fromI32(0)
  
    //Value claimed back by user
    user.messagesValueClaimedBack = BigInt.fromI32(0)
    user.tipsValueClaimedBack = BigInt.fromI32(0)
  
    user.twitterId = BigInt.fromI32(0)
    user.twitterUsername = ""

    user.earningsWithdrawn = BigInt.fromI32(0)
    user.profileTipsSent = BigInt.fromI32(0)
    user.profileTipsValueSent = BigInt.fromI32(0)
    user.profileTipsReceived = BigInt.fromI32(0)
    user.profileTipsValueReceived = BigInt.fromI32(0)

    return user
  }



  export function handleResponseMarked(event: ResponseMarked): void {
    let _responseType = new ResponseMarkedEntity(event.params.messageId.toHexString())
    _responseType.messageId = event.params.messageId
    _responseType.owner = event.params.owner.toHexString() 
    _responseType.answerer = event.params.answerer.toHexString() 
    _responseType.createdAt = event.block.timestamp
    _responseType.txHash =  event.transaction.hash.toHex()
    _responseType.responseType =  event.params.responseType

    _responseType.save()


    let owner = AmaUserEntity.load(event.params.owner.toHexString())
    if(owner == null){
      owner = insertUser(event.params.owner.toHexString(), event.block.timestamp)
    }
    let answerer = AmaUserEntity.load(event.params.answerer.toHexString())
    if(answerer == null){
      answerer = insertUser(event.params.answerer.toHexString(), event.block.timestamp)
    }

    
    if (event.params.responseType == BigInt.fromI32(1)){
      //Good response Marked
      if (owner.goodResponseCreated !== null){
        owner.goodResponseCreated = owner.goodResponseCreated.abs().plus(BigInt.fromI32(1))
          }else{
        owner.goodResponseCreated = BigInt.fromI32(1)
        }
      owner.save()

      if (answerer.goodResponseReceived !== null){
        answerer.goodResponseReceived = answerer.goodResponseReceived.abs().plus(BigInt.fromI32(1))        
        }else{
          answerer.goodResponseReceived = BigInt.fromI32(1)
        }
      answerer.save()
  
    }

    if (event.params.responseType == BigInt.fromI32(2)){
      if (owner.badResponseCreated !== null){
        owner.badResponseCreated = owner.badResponseCreated.abs().plus(BigInt.fromI32(1))
          }else{
        owner.badResponseCreated = BigInt.fromI32(1)
        }
      owner.save()

      if (answerer.badResponseReceived !== null){
        answerer.badResponseReceived = answerer.badResponseReceived.abs().plus(BigInt.fromI32(1))        
        }else{
          answerer.badResponseReceived = BigInt.fromI32(1)
        }
      answerer.save()
    }

    let message = MessageCreatedEntity.load(event.params.messageId.toHexString())
    if (message){
      message.responseType = event.params.responseType
      message.save()
    }
  
  }




export function handleBlocked(event: Blocked): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let blocked = new BlockedEntity(id)
  blocked.sender = event.params.blocker.toHexString()
  blocked.receiver = event.params.blocked.toHexString()
  blocked.createdAt = event.block.timestamp
  blocked.txHash =  event.transaction.hash.toHex()

  blocked.save()
  let sender = AmaUserEntity.load(event.params.blocker.toHexString())
  if(sender == null){
    sender = insertUser(event.params.blocker.toHexString(), event.block.timestamp)
  }

    if (sender.blockUserCreated !== null){
      sender.blockUserCreated = sender.blockUserCreated.abs().plus(BigInt.fromI32(1))
            
      }else{
        sender.blockUserCreated = BigInt.fromI32(1)
      }
    sender.save()

  let receiver = AmaUserEntity.load(event.params.blocked.toHexString())
  if(!receiver){
    receiver = insertUser(event.params.blocked.toHexString(), event.block.timestamp)

  } 
  if (receiver.blockUserReceived){
    receiver.blockUserReceived = receiver.blockUserReceived.plus(BigInt.fromI32(1))
          
    }else{
      receiver.blockUserReceived = BigInt.fromI32(1)
    }
    
  receiver.save()

}

export function handleUnBlock(event: UnBlock): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let unblocked = new UnBlockedEntity(id)
  unblocked.sender = event.params.unblocker.toHexString()
  unblocked.receiver = event.params.unblocked.toHexString()
  unblocked.createdAt = event.block.timestamp
  unblocked.txHash =  event.transaction.hash.toHex()

  unblocked.save()
  let sender = AmaUserEntity.load(event.params.unblocker.toHexString())

  if(sender){
    sender.blockUserCreated = sender.blockUserCreated.abs().minus(BigInt.fromI32(1))
    sender.save()
  }

  let receiver = AmaUserEntity.load(event.params.unblocked.toHexString())

  if (receiver){
    receiver.blockUserReceived  = receiver.blockUserReceived.minus(BigInt.fromI32(1))
    receiver.save()
    }
}




export function handleWhitelisted(event: Whitelisted): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let whitelisted = new WhitelistedEntity(id)
  whitelisted.sender = event.params.whitelister.toHexString()
  whitelisted.receiver = event.params.whitelister.toHexString()
  whitelisted.createdAt = event.block.timestamp
  whitelisted.txHash =  event.transaction.hash.toHex()

  whitelisted.save()
  let sender = AmaUserEntity.load(event.params.whitelister.toHexString())
  if(sender == null){
    sender = insertUser(event.params.whitelister.toHexString(), event.block.timestamp)
  }

    if (sender.whitelistUserCreated !== null){
      sender.whitelistUserCreated = sender.whitelistUserCreated.abs().plus(BigInt.fromI32(1))
            
      }else{
        sender.whitelistUserCreated = BigInt.fromI32(1)
      }
    sender.save()

  let receiver = AmaUserEntity.load(event.params.whitelisted.toHexString())
  if(!receiver){
    receiver = insertUser(event.params.whitelisted.toHexString(), event.block.timestamp)

  } 
  if (receiver.whitelistUserReceived){
    receiver.whitelistUserReceived = receiver.whitelistUserReceived.plus(BigInt.fromI32(1))
          
    }else{
      receiver.whitelistUserReceived = BigInt.fromI32(1)
    }
    
  receiver.save()

}

export function handleUnWhitelisted(event: UnWhitelisted): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let unWhitelisted = new UnWhitelistedEntity(id)
  unWhitelisted.sender = event.params.unwhitelister.toHexString()
  unWhitelisted.receiver = event.params.unwhitelisted.toHexString()
  unWhitelisted.createdAt = event.block.timestamp
  unWhitelisted.txHash =  event.transaction.hash.toHex()

  unWhitelisted.save()
  let sender = AmaUserEntity.load(event.params.unwhitelister.toHexString())

  if(sender){
    sender.whitelistUserCreated = sender.whitelistUserCreated.abs().minus(BigInt.fromI32(1))
    sender.save()
  }

  let receiver = AmaUserEntity.load(event.params.unwhitelisted.toHexString())

  if (receiver){
    receiver.whitelistUserReceived = receiver.whitelistUserReceived.minus(BigInt.fromI32(1))
    receiver.save()
    }
}



export function handleFollow(event: Follow): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let follow = new FollowEntity(id)
  follow.followed = event.params.followed.toHexString()
  follow.follower = event.params.follower.toHexString()
  follow.createdAt = event.block.timestamp
  follow.txHash =  event.transaction.hash.toHex()

  follow.save()

  // The person who is actually started following so his follwoing count shall be incremented
  let userStartedFollowing = AmaUserEntity.load(event.params.follower.toHexString())
  if(userStartedFollowing == null){
    userStartedFollowing = insertUser(event.params.follower.toHexString(), event.block.timestamp)
  }

  if (userStartedFollowing.following!== null){
      userStartedFollowing.following = userStartedFollowing.following.abs().plus(BigInt.fromI32(1))
      }else{
      userStartedFollowing.following = BigInt.fromI32(1)
    }
    userStartedFollowing.save()


  // The person who is being followed so his follower count shall be incremented
  let userBeingFollowed = AmaUserEntity.load(event.params.followed.toHexString())
  if(!userBeingFollowed){
    userBeingFollowed = insertUser(event.params.followed.toHexString(), event.block.timestamp)

  } 
  if (userBeingFollowed.followers){
    userBeingFollowed.followers = userBeingFollowed.followers.plus(BigInt.fromI32(1))
          
    }else{
      userBeingFollowed.followers = BigInt.fromI32(1)
    }
    
    userBeingFollowed.save()

}

export function handleUnFollow(event: UnFollow): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let unFollow = new UnFollowEntity(id)
  unFollow.unFollower = event.params.unfollower.toHexString()
  unFollow.unFollowed = event.params.unfollowed.toHexString()
  unFollow.createdAt = event.block.timestamp
  unFollow.txHash =  event.transaction.hash.toHex()

  unFollow.save()
  let userWhoUnfollowed = AmaUserEntity.load(event.params.unfollowed.toHexString())

  if(userWhoUnfollowed){
    userWhoUnfollowed.following = userWhoUnfollowed.following.abs().minus(BigInt.fromI32(1))
    userWhoUnfollowed.save()
  }

  let userWhoLostFollower = AmaUserEntity.load(event.params.unfollower.toHexString())

  if (userWhoLostFollower){
    userWhoLostFollower.followers = userWhoLostFollower.followers.minus(BigInt.fromI32(1))
    userWhoLostFollower.save()
    }
}


export function handleResponseCreated(event: ResponseCreated): void {
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalResponseCreated) {
    platform.totalResponseCreated = BigInt.fromI32(0)  
  }
  if (!platform.totalValueReceivedOnResponses) {
    platform.totalValueReceivedOnResponses = BigInt.fromI32(0)  
  }


  platform.totalValueReceivedOnResponses = platform.totalValueReceivedOnResponses.plus(event.params.value)
  platform.totalResponseCreated = platform.totalResponseCreated.plus(BigInt.fromI32(1))
  platform.save()




  log.debug('QuestionAnswered: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])

  let response = new ResponseCreatedEntity(event.params.messageId.toHexString())
  response.messageId = event.params.messageId

  response.owner = event.params.owner.toHexString() 
  response.creator = event.params.creator.toHexString()
  response.tokenId = event.params.tokenId
  response.answerLink = event.params.answerLink
  response.value = event.params.value
  response.createdAt = event.block.timestamp
  response.txHash =  event.transaction.hash.toHex()

  response.save()

  //Updating QuestionCreatedEntity
  let message = MessageCreatedEntity.load(event.params.messageId.toHexString())
  if (message){

    message.answered = true
    message.answerLink = event.params.answerLink
    message.save()
  }

  //Update creator on question Answered
  let owner = AmaUserEntity.load(event.params.owner.toHexString())
  if (owner){
    if (!owner.responsesReceived) {
      owner.responsesReceived = BigInt.fromI32(0)  
    }
    owner.responsesReceived = owner.responsesReceived.plus(BigInt.fromI32(1))
    owner.save()

  }

  //Update answerer on question Answered
  let creator = AmaUserEntity.load(event.params.creator.toHexString())
  if (creator){
      if (!creator.responsesCreated) {
        creator.responsesCreated = BigInt.fromI32(0)  
      }

      if (!creator.valueReceivedOnResponses) {
        creator.valueReceivedOnResponses = BigInt.fromI32(0)  
      }

      creator.responsesCreated = creator.responsesCreated.plus(BigInt.fromI32(1))
      creator.valueReceivedOnResponses = creator.valueReceivedOnResponses.plus(event.params.value)
      creator.save()
    }
}

export function handleMessageCreated(event: MessageCreated): void {
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalValueSpentOnMessages) {
    platform.totalValueSpentOnMessages = BigInt.fromI32(0)  
  }
  if (!platform.totalMessagesSent) {
    platform.totalMessagesSent = BigInt.fromI32(0)  
  }


  platform.totalValueSpentOnMessages = platform.totalValueSpentOnMessages.plus(event.params.value)
  platform.totalMessagesSent = platform.totalMessagesSent.plus(BigInt.fromI32(1))
  platform.save()



  log.debug('QuestionCreated: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])


  let senderId = event.params.createdBy.toHexString()
  let recipientId = event.params.recipient.toHexString()

  let sender = AmaUserEntity.load(senderId)
  let recipient = AmaUserEntity.load(recipientId)



  if (!sender) {
    log.info('Sender couldnt be found {}', [senderId])
    sender = insertUser(senderId, event.block.timestamp)
  }

  if (!sender.messagesCreated){
    sender.messagesCreated = BigInt.fromI32(0)

  }

  if (!sender.valueSpentOnMessages){
    sender.valueSpentOnMessages = BigInt.fromI32(0)

  }

  
  sender.messagesCreated  =  sender.messagesCreated.plus(BigInt.fromI32(1))
  sender.valueSpentOnMessages  = sender.valueSpentOnMessages.plus(event.params.value)
  sender.save()


  if (!recipient) {
    log.info('Recipient couldnt be found {}', [recipientId])
    recipient = insertUser(recipientId, event.block.timestamp)
    
  }

  if (!recipient.messagesReceived){
    recipient.messagesReceived = BigInt.fromI32(0)

  }



  recipient.messagesReceived  =  recipient.messagesReceived.plus(BigInt.fromI32(1))
  recipient.save()




  let newMessage = new MessageCreatedEntity(event.params.messageId.toHexString())

  newMessage.recipient = event.params.recipient.toHexString()
  newMessage.messageId = event.params.messageId
  newMessage.createdBy = event.params.createdBy.toHexString()
  newMessage.value = event.params.value
  newMessage.expiryTime = event.params.expiryTime
  newMessage.link = event.params.link
  newMessage.answered = false
  newMessage.claimed = false
  newMessage.responseType = BigInt.fromI32(0)
  newMessage.messageType = event.params.messageType
  newMessage.createdAt = event.block.timestamp
  newMessage.tips = BigInt.fromI32(0)
  newMessage.tipsTotalValue = BigInt.fromI32(0)
  newMessage.txHash =  event.transaction.hash.toHex()

  newMessage.save()
}

export function handleQuestionValueClaimed(event: MessageValueClaimed): void {
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalValueClaimedBackOnMessages) {
    platform.totalValueClaimedBackOnMessages = BigInt.fromI32(0)  
  }
  if (!platform.totalMessagesClaimedBack) {
    platform.totalMessagesClaimedBack = BigInt.fromI32(0)  
  }


  platform.totalValueClaimedBackOnMessages = platform.totalValueClaimedBackOnMessages.plus(event.params.value)
  platform.totalMessagesClaimedBack = platform.totalMessagesClaimedBack.plus(BigInt.fromI32(1))
  platform.save()





  log.debug('QuestionValueClaimed: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])

  let question = new MessageValueClaimedEntity(event.params.messageId.toHexString())
  question.messageId = event.params.messageId
  question.createdBy = event.params.createdBy.toHexString() 
  question.value = event.params.value
  question.createdAt = event.block.timestamp
  question.txHash =  event.transaction.hash.toHex()

  question.save()

  //Changing claimed  in QuestionCreatedEntity
  let message = MessageCreatedEntity.load(event.params.messageId.toHexString())
  if (message){
    message.claimed = true
    message.save()
  }

  let user = AmaUserEntity.load(event.params.createdBy.toHexString())
  if (user){
    if (!user.messagesClaimedBack) {
      user.messagesClaimedBack = BigInt.fromI32(0)  
    }
    if (!user.messagesValueClaimedBack) {
      user.messagesValueClaimedBack = BigInt.fromI32(0)  
    }


    user.messagesClaimedBack = user.messagesClaimedBack.plus(BigInt.fromI32(1))
    user.messagesValueClaimedBack = user.messagesValueClaimedBack.plus(event.params.value)
    user.save()
  }


}


export function handleTipCreated(event: TipCreated): void {
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalTipsMade) {
    platform.totalTipsMade = BigInt.fromI32(0)  
  }
  if (!platform.totalValueSpentOnTips) {
    platform.totalValueSpentOnTips = BigInt.fromI32(0)  
  }


  platform.totalValueSpentOnTips = platform.totalValueSpentOnTips.plus(event.params.value)
  platform.totalTipsMade = platform.totalTipsMade.plus(BigInt.fromI32(1))
  platform.save()





  log.debug('TipCreated: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])
  let senderId = event.params.createdBy.toHexString()

  let sender = AmaUserEntity.load(senderId)

  if (!sender) {
    sender = insertUser(senderId, event.block.timestamp)


  }

  if (!sender.tipsCreated){
    sender.tipsCreated = BigInt.fromI32(0)
  }

  if (!sender.valueSpentOnTips){
    sender.valueSpentOnTips = BigInt.fromI32(0)

  }

  
  sender.tipsCreated  =  sender.tipsCreated.plus(BigInt.fromI32(1))
  sender.valueSpentOnTips  = sender.valueSpentOnTips.plus(event.params.value)
  sender.save()


  let tip  = new TipCreatedEntity(event.params.tipId.toHex())
  tip.messageId = event.params.messageId
  tip.tipId = event.params.tipId
  tip.createdBy = event.params.createdBy.toHexString()
  tip.value = event.params.value
  tip.claimed = false
  tip.createdAt = event.block.timestamp
  tip.txHash =  event.transaction.hash.toHex()

  tip.save()
  
  let question = MessageCreatedEntity.load(event.params.messageId.toHexString())
  if (question) {
    question.tips  =  question.tips.plus(BigInt.fromI32(1))
    question.tipsTotalValue = question.tipsTotalValue.plus(event.params.value)
    question.save()

    let user = AmaUserEntity.load(question.createdBy)
    if(user){
      if (!user.valueReceivedOnTips) {
        user.valueReceivedOnTips = BigInt.fromI32(0)  
      }
  

      user.valueReceivedOnTips = user.valueReceivedOnTips.plus(event.params.value)
      user.save()

    }
    
  }

}



export function handleTipValueClaimed(event: TipValueClaimed): void {
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalTipsClaimedBack) {
    platform.totalTipsClaimedBack = BigInt.fromI32(0)  
  }
  if (!platform.totalValueClaimedBackOnTips) {
    platform.totalValueClaimedBackOnTips = BigInt.fromI32(0)  
  }


  platform.totalValueClaimedBackOnTips = platform.totalValueClaimedBackOnTips.plus(event.params.value)
  platform.totalTipsClaimedBack = platform.totalTipsClaimedBack.plus(BigInt.fromI32(1))
  platform.save()





  log.debug('TipValueClaimed: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])
  let tip  = new TipValueClaimedEntity(event.params.tipId.toHex())
  tip.messageId = event.params.messageId
  tip.tipId = event.params.tipId
  tip.createdBy = event.params.createdBy.toHexString()
  tip.value = event.params.value
  tip.createdAt = event.block.timestamp
  tip.txHash =  event.transaction.hash.toHex()

  tip.save()


  //Marking tip as claimed in TipCreatedEntity
  let tipCreated  = TipCreatedEntity.load(event.params.tipId.toHex())
  if (tipCreated) {
    tipCreated.claimed = true
    tipCreated.save()
  }


  //Changing userEntity as claimed in TipCreatedEntity
  let user = AmaUserEntity.load(event.params.createdBy.toHexString())
  if (user){
    if (!user.tipsClaimedBack) {
      user.tipsClaimedBack = BigInt.fromI32(0)  
    }

    if (!user.tipsValueClaimedBack) {
      user.tipsValueClaimedBack = BigInt.fromI32(0)  
    }

    user.tipsClaimedBack = user.tipsClaimedBack.plus(BigInt.fromI32(1))
    user.tipsValueClaimedBack = user.tipsValueClaimedBack.plus(event.params.value)
    user.save()
  }

}

export function handleUnpaused(event: Unpaused): void {}

export function handleWithdraw(event: Withdraw): void {
  let id = event.transaction.hash.toHex()
  let withdrawEvent = new WithdrawEntity(id)
  withdrawEvent.user = event.params.user.toHexString()
  withdrawEvent.value = event.params.value
  withdrawEvent.createdAt = event.block.timestamp
  withdrawEvent.txHash =  event.transaction.hash.toHex()

  withdrawEvent.save()
  let user = AmaUserEntity.load(event.params.user.toHexString())
  if(user == null){
    user = insertUser(event.params.user.toHexString(), event.block.timestamp)
  }

    if (user.earningsWithdrawn !== null){
      user.earningsWithdrawn = user.earningsWithdrawn.abs().plus(BigInt.fromI32(1))
            
      }else{
        user.earningsWithdrawn = BigInt.fromI32(1)
      }
    user.save()
}

export function handleTransfer(event: Transfer): void {
  let id = event.transaction.hash.toHex() 
  let transfer = new TransferEntity(id)
  transfer.sender = event.params.sender.toHexString()
  transfer.recipient = event.params.recipient.toHexString()
  transfer.value = event.params.value
  transfer.createdAt = event.block.timestamp
  transfer.txHash =  event.transaction.hash.toHex()
  transfer.save()

  let sender = AmaUserEntity.load(event.params.sender.toHexString())
  let recipient = AmaUserEntity.load(event.params.recipient.toHexString())

  if (!sender) {
    sender = insertUser(event.params.sender.toHexString(), event.block.timestamp)
  }

  if (!recipient) {
    recipient = insertUser(event.params.recipient.toHexString(), event.block.timestamp)
  }
  
  if (sender.profileTipsSent !== null){
    sender.profileTipsSent = sender.profileTipsSent.abs().plus(BigInt.fromI32(1))
      }else{
    sender.profileTipsSent = BigInt.fromI32(1)
    }

  if (sender.profileTipsValueSent !== null){
      sender.profileTipsValueSent = sender.profileTipsValueSent.abs().plus(event.params.value)
        }else{
      sender.profileTipsValueSent =event.params.value
      }
  sender.save()
  

  if (recipient.profileTipsReceived !== null){
    recipient.profileTipsReceived = recipient.profileTipsReceived.abs().plus(BigInt.fromI32(1))
      }else{
    recipient.profileTipsReceived = BigInt.fromI32(1)
    }

  if (sender.profileTipsValueReceived !== null){
      sender.profileTipsValueReceived = sender.profileTipsValueReceived.abs().plus(event.params.value)
        }else{
      sender.profileTipsValueReceived =event.params.value
  }

  recipient.save()

}


export function handlePostCreated(event: PostCreated): void {

  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalValueSpentOnPosts) {
    platform.totalValueSpentOnPosts = BigInt.fromI32(0)  
  }
  if (!platform.totalPosts) {
    platform.totalPosts = BigInt.fromI32(0)  
  }

  platform.totalValueSpentOnPosts = platform.totalValueSpentOnPosts.plus(event.params.value)
  platform.totalPosts = platform.totalPosts.plus(BigInt.fromI32(1))
  platform.save()

  let senderId = event.params.createdBy.toHexString()
  let sender = AmaUserEntity.load(senderId)

  if (!sender) {
    log.info('Sender couldnt be found {}', [senderId])
    sender = insertUser(senderId, event.block.timestamp)
  }

  if (!sender.postsCreated){
    sender.postsCreated = BigInt.fromI32(0)
  }

  if (!sender.valueSpentOnPosts){
    sender.valueSpentOnPosts = BigInt.fromI32(0)
  }

  sender.postsCreated  =  sender.postsCreated.plus(BigInt.fromI32(1))
  sender.valueSpentOnPosts  = sender.valueSpentOnPosts.plus(event.params.value)
  sender.save()

  let post = new PostEntity(event.params.postId.toHexString())

  post.postId = event.params.postId
  post.createdBy = event.params.createdBy.toHexString()
  post.value = event.params.value
  post.link = event.params.link
  post.createdAt = event.block.timestamp
  post.tips = BigInt.fromI32(0)
  post.tipsTotalValue = BigInt.fromI32(0)
  post.txHash =  event.transaction.hash.toHex()
  post.save()
  
}


export function handlePostTipCreated(event: PostTipCreated): void {
  let platform= PlatformIdentity.load(platofrmId);
  if (!platform) {
    platform = new PlatformIdentity(platofrmId)
  }
  if (!platform.totalPostTips) {
    platform.totalPostTips = BigInt.fromI32(0)  
  }
  if (!platform.totalValueSpentOnPostTips) {
    platform.totalValueSpentOnPostTips = BigInt.fromI32(0)  
  }


  platform.totalValueSpentOnPostTips = platform.totalValueSpentOnPostTips.plus(event.params.value)
  platform.totalPostTips = platform.totalPostTips.plus(BigInt.fromI32(1))
  platform.save()


  let senderId = event.params.createdBy.toHexString()

  let sender = AmaUserEntity.load(senderId)

  if (!sender) {
    sender = insertUser(senderId, event.block.timestamp)


  }

  if (!sender.postTipsCreated){
    sender.postTipsCreated = BigInt.fromI32(0)
  }

  if (!sender.valueSpentOnPostTips){
    sender.valueSpentOnPostTips = BigInt.fromI32(0)

  }

  
  sender.postTipsCreated  =  sender.postTipsCreated.plus(BigInt.fromI32(1))
  sender.valueSpentOnPostTips  = sender.valueSpentOnPostTips.plus(event.params.value)
  sender.save()


  let postTip  = new PostTipEntity(event.params.postTipId.toHex())
  postTip.postId = event.params.postId
  postTip.postTipId = event.params.postTipId
  postTip.createdBy = event.params.createdBy.toHexString()
  postTip.value = event.params.value
  postTip.createdAt = event.block.timestamp
  postTip.txHash =  event.transaction.hash.toHex()
  postTip.save()
  
  let post = PostEntity.load(event.params.postId.toHexString())
  if (post) {
    post.tips  =  post.tips.plus(BigInt.fromI32(1))
    post.tipsTotalValue = post.tipsTotalValue.plus(event.params.value)
    post.save()

    let user = AmaUserEntity.load(post.createdBy)
    if(user){
      if (!user.valueReceivedOnPostTips) {
        user.valueReceivedOnPostTips = BigInt.fromI32(0)  
      }
  

      user.valueReceivedOnPostTips = user.valueReceivedOnPostTips.plus(event.params.value)
      user.save()

    }
    
  }

}








export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}


export function handlePaused(event: Paused): void {}
