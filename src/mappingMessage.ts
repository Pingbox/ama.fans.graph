import { log } from '@graphprotocol/graph-ts'
import {insertUser} from './mappingUser'
import {BigInt, ethereum } from '@graphprotocol/graph-ts'


import {
    MessageCreated,
    MessageValueClaimed,
    TipCreated,
    TipValueClaimed,
    ResponseCreated,
    ResponseMarked,
    AmountReceived,
} from "../generated/MessageFacet/MessageFacet"



import { AmountReceivedEntity, ResponseCreatedEntity, MessageCreatedEntity, MessageValueClaimedEntity,
  TipCreatedEntity, TipValueClaimedEntity, AmaUserEntity,
    ResponseMarkedEntity, SessionCreatedEntity} from "../generated/schema"


export function handleMessageCreated(event: MessageCreated): void {
    //event MessageCreated(address indexed createdBy, address indexed recipient, bytes32 indexed messageId, bytes32 activeSessionId, string messageLink, bytes data);
    //sedner, recipient_,timelock_,messageType_,messageHash_,msg.value,_isWhiteListed
    //(address,address,uint256,uint8,string,uint256,bool)
    
    //If activeSEssionId is present i.e the message was sent when the reciever has an session in effect, 
    //Update the message counter of the session.
    if(event.params.activeSessionId){
        let session = SessionCreatedEntity.load(event.params.activeSessionId.toString())
        if(session){
            session.messagesSent  = session.messagesSent.plus(BigInt.fromI32(1))
        }
    }

    let senderId = event.params.sender.toHexString()
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
    sender.valueSpentOnMessages  = sender.valueSpentOnMessages.plus(event.params.msgValue)
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

    newMessage.recipient = event.params.recipient.toString()
    newMessage.messageId = event.params.messageId
    newMessage.createdBy = event.params.sender.toHexString()
    newMessage.value = event.params.msgValue
    newMessage.expiryTime = event.params.timelock.plus( event.block.timestamp)
    newMessage.messageLink = event.params.messageLink
    newMessage.answered = false
    newMessage.claimed = false
    newMessage.responseType = BigInt.fromI32(0)
    newMessage.messageType =  event.params.messageType
    newMessage.createdAt = event.block.timestamp
    newMessage.tips = BigInt.fromI32(0)
    newMessage.tipsTotalValue = BigInt.fromI32(0)
    newMessage.txHash =  event.transaction.hash.toHex()
    newMessage.gasLimit =  event.transaction.gasLimit
    newMessage.gasPrice =  event.transaction.gasPrice
    newMessage.activeSessionId = event.params.activeSessionId


    newMessage.save()
}

export function handleMessageValueClaimed(event: MessageValueClaimed): void {


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
      
      
    
export function handleAmountReceived(event: AmountReceived): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let entity = new AmountReceivedEntity(id)
  entity.receiver = event.params.receiver.toHexString()
  entity.value = event.params.value
  entity.createdAt = event.block.timestamp
  entity.txHash =  event.transaction.hash.toHex()
  entity.facet =  "message"
  entity.save()

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


export function handleResponseCreated(event: ResponseCreated): void {

  log.debug('QuestionAnswered: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])

  let response = new ResponseCreatedEntity(event.params.messageId.toHexString())
  response.messageId = event.params.messageId

  response.owner = event.params.owner.toHexString() 
  response.creator = event.params.creator.toHexString()
  response.responseValue = event.params.responseValue
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
    message.responseValue = event.params.responseValue;
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

