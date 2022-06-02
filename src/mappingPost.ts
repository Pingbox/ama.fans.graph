
import { log } from '@graphprotocol/graph-ts'
import {insertUser} from './mappingUser'
import {BigInt, ethereum } from '@graphprotocol/graph-ts'


import {
    AmountReceived,
  PostCreated,
  PostTipCreated,
} from "../generated/PostFacet/PostFacet"


import { AmountReceivedEntity, PostEntity, PostTipEntity, AmaUserEntity} from "../generated/schema"


export function handleAmountReceived(event: AmountReceived): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let entity = new AmountReceivedEntity(id)
    entity.receiver = event.params.receiver.toHexString()
    entity.value = event.params.value
    entity.createdAt = event.block.timestamp
    entity.txHash =  event.transaction.hash.toHex()
    entity.facet =  "post"
    entity.save()
}
      

export function handlePostCreated(event: PostCreated): void {


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
    post.gasPrice =  event.transaction.gasPrice
    post.gasLimit =  event.transaction.gasLimit
    post.save()
    
  }
  
  
  export function handlePostTipCreated(event: PostTipCreated): void {

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
  
  
  
  
  