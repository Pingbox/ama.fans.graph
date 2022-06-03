import { BigInt } from "@graphprotocol/graph-ts"
import { log } from '@graphprotocol/graph-ts'

const platofrmId =  "0x39bea80e7720932f5ef0db947964fa325382ba8fe519ff0586e972a55eca12c3"

import {
  AmountReceived,
  Blocked,
  UnBlock,
  Whitelisted, 
  UnWhitelisted,
  Follow,
  UnFollow,
  Withdraw,
  Transfer
} from "../generated/UserFacet/UserFacet"



import { AmountReceivedEntity,  BlockedEntity, UnBlockedEntity,
  FollowEntity, UnFollowEntity, WhitelistedEntity, UnWhitelistedEntity, WithdrawEntity,
     AmaUserEntity, TransferEntity} from "../generated/schema"

export function handleAmountReceived(event: AmountReceived): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let entity = new AmountReceivedEntity(id)
  entity.receiver = event.params.receiver.toHexString()
  entity.value = event.params.value
  entity.createdAt = event.block.timestamp
  entity.txHash =  event.transaction.hash.toHex()
  entity.facet = "user"
  entity.save()
}


function insertUser(userAddress: string, timestamp: BigInt): AmaUserEntity{

  log.debug('New user created {}', [userAddress])
    let user = new AmaUserEntity(userAddress)
    user.address = userAddress
    user.createdAt = timestamp

    user.postsCreated = BigInt.fromI32(0)
    user.messagesCreated = BigInt.fromI32(0)
    user.tipsCreated = BigInt.fromI32(0)
    user.postTipsCreated = BigInt.fromI32(0)
    user.postTipsCreated = BigInt.fromI32(0)
    user.sessionsCreated = BigInt.fromI32(0)
    
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
    user.valueSpentOnSessions = BigInt.fromI32(0)
  

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


export { insertUser};