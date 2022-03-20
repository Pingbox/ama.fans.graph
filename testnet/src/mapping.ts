import { BigInt } from "@graphprotocol/graph-ts"
import { log } from '@graphprotocol/graph-ts'

import {
  AmaFansCore,
  AmountReceived,
  Blocked,
  Paused,
  QuestionAnswered,
  QuestionCreated,
  QuestionValueClaimed,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TipCreated,
  TipValueClaimed,
  Unpaused,
  Withdraw
} from "../generated/AmaFansCore/AmaFansCore"



import { AmountReceivedEntity, QuestionAnsweredEntity, QuestionCreatedEntity, QuestionValueClaimedEntity,
  TipCreatedEntity, TipValueClaimedEntity, AmaUserEntity, BlockedEntity } from "../generated/schema"

export function handleAmountReceived(event: AmountReceived): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let entity = new AmountReceivedEntity(id)
  entity.sender = event.params.sender.toHexString()
  entity.value = event.params.value
  entity.createdAt = event.block.timestamp

  entity.save()  

}


function insertUser(userAddress: string, timestamp: BigInt): AmaUserEntity{
  log.debug('New user created {}', [userAddress])
    let user = new AmaUserEntity(userAddress)
    user.address = userAddress
    user.createdAt = timestamp


    user.questionsCreated = BigInt.fromI32(0)
    user.tipsCreated = BigInt.fromI32(0)
    user.blockuserCreated = BigInt.fromI32(0)
    user.answersCreated = BigInt.fromI32(0)
  
  
    user.questionsReceived = BigInt.fromI32(0)
    user.answersReceived = BigInt.fromI32(0)
    user.blockUserReceived = BigInt.fromI32(0)
  
  
  
    user.valueSpentOnTips = BigInt.fromI32(0)
    user.valueSpentOnQuestions = BigInt.fromI32(0)


    user.valueReceivedOnQuestions = BigInt.fromI32(0)
    user.valueReceivedOnAnswers = BigInt.fromI32(0)
    user.valueReceivedOnTips = BigInt.fromI32(0)


    user.questionsClaimedBack = BigInt.fromI32(0)
    user.tipsClaimedBack = BigInt.fromI32(0)
  
    user.questionsValueClaimedBack = BigInt.fromI32(0)
    user.tipsValueClaimedBack = BigInt.fromI32(0)
  
    user.twitterId = BigInt.fromI32(0)
    user.twitterUsername = ""

    user.madeBlock = BigInt.fromI32(0)
    user.receivedBlock = BigInt.fromI32(0)
    return user
  }



export function handleBlocked(event: Blocked): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let blocked = new BlockedEntity(id)
  blocked.sender = event.params.blocker.toHexString()
  blocked.receiver = event.params.blocked.toHexString()
  blocked.createdAt = event.block.timestamp
  blocked.save()
  let sender = AmaUserEntity.load(event.params.blocker.toHexString())
  if(sender == null){
    sender = insertUser(event.params.blocker.toHexString(), event.block.timestamp)
  }

    if (sender.madeBlock !== null){
      sender.madeBlock = sender.madeBlock.plus(BigInt.fromI32(1))
            
      }else{
        sender.madeBlock = BigInt.fromI32(1)
      }
    sender.save()

  let receiver = AmaUserEntity.load(event.params.blocked.toHexString())
  if(!receiver){
    receiver = insertUser(event.params.blocked.toHexString(), event.block.timestamp)

  } 
  if (receiver.receivedBlock){
    receiver.receivedBlock = receiver.receivedBlock.plus(BigInt.fromI32(1))
          
    }else{
      receiver.receivedBlock = BigInt.fromI32(1)
    }
  
  
  receiver.save()

}

export function handlePaused(event: Paused): void {}

export function handleQuestionAnswered(event: QuestionAnswered): void {
  log.debug('QuestionAnswered: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])

  let question = new QuestionAnsweredEntity(event.params.questionId.toHexString())
  question.questionId = event.params.questionId

  question.owner = event.params.owner.toHexString() 
  question.creator = event.params.creator.toHexString()
  question.tokenId = event.params.tokenId
  question.answerLink = event.params.answerLink
  question.value = event.params.value
  question.createdAt = event.block.timestamp


  //Updating QuestionCreatedEntity
  let questionCreated = QuestionCreatedEntity.load(event.params.questionId.toHexString())
  if (questionCreated){

    questionCreated.answered = true
    questionCreated.save()
  }

  //Update creator on question Answered
  let owner = AmaUserEntity.load(event.params.owner.toHexString())
  if (owner){
    if (!owner.answersReceived) {
      owner.answersReceived = BigInt.fromI32(0)  
    }
    owner.answersReceived = owner.answersReceived.plus(BigInt.fromI32(1))
    owner.save()

  }

  //Update answerer on question Answered
  let creator = AmaUserEntity.load(event.params.creator.toHexString())
  if (creator){
      if (!creator.answersCreated) {
        creator.answersCreated = BigInt.fromI32(0)  
      }

      if (!creator.valueReceivedOnAnswers) {
        creator.valueReceivedOnAnswers = BigInt.fromI32(0)  
      }

      creator.answersCreated = creator.answersCreated.plus(BigInt.fromI32(1))
      creator.valueReceivedOnAnswers = creator.valueReceivedOnAnswers.plus(event.params.value)
      creator.save()
    }
}

export function handleQuestionCreated(event: QuestionCreated): void {
  log.debug('QuestionCreated: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])

  let newQuestion = new QuestionCreatedEntity(event.params.questionId.toHexString())

  let senderId = event.params.createdBy.toHexString()
  let recipientId = event.params.recipient.toHexString()

  let sender = AmaUserEntity.load(senderId)
  let recipient = AmaUserEntity.load(recipientId)



  if (!sender) {
    log.info('Sender couldnt be found {}', [senderId])
    sender = insertUser(senderId, event.block.timestamp)
  }

  if (!sender.questionsCreated){
    sender.questionsCreated = BigInt.fromI32(0)

  }

  if (!sender.valueSpentOnQuestions){
    sender.valueSpentOnQuestions = BigInt.fromI32(0)

  }

  
  sender.questionsCreated  =  sender.questionsCreated.plus(BigInt.fromI32(1))
  sender.valueSpentOnQuestions  = sender.valueSpentOnQuestions.plus(event.params.value)
  sender.save()


  if (!recipient) {
    log.info('Recipient couldnt be found {}', [recipientId])
    recipient = insertUser(recipientId, event.block.timestamp)
    
  }

  if (!recipient.questionsReceived){
    recipient.questionsReceived = BigInt.fromI32(0)

  }

  if (!recipient.valueReceivedOnQuestions){
    recipient.valueReceivedOnQuestions = BigInt.fromI32(0)

  }

  recipient.questionsReceived  =  recipient.questionsReceived.plus(BigInt.fromI32(1))
  recipient.valueReceivedOnQuestions  = recipient.valueReceivedOnQuestions.plus(event.params.value)
  recipient.save()





  newQuestion.recipient = event.params.recipient.toHexString()
  newQuestion.questionId = event.params.questionId
  newQuestion.createdBy = event.params.createdBy.toHexString()
  newQuestion.value = event.params.value
  newQuestion.expiryTime = event.params.expiryTime
  newQuestion.link = event.params.link
  newQuestion.answered = false
  newQuestion.claimed = false
  newQuestion.createdAt = event.block.timestamp
  newQuestion.tips = BigInt.fromI32(0)
  newQuestion.tipsTotalValue = BigInt.fromI32(0)
  newQuestion.save()
}

export function handleQuestionValueClaimed(event: QuestionValueClaimed): void {
  log.debug('QuestionValueClaimed: Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), // "47596000"
    event.block.hash.toHexString(), // "0x..."
    event.transaction.hash.toHexString(), // "0x..."
  ])

  let question = new QuestionValueClaimedEntity(event.params.questionId.toHexString())
  question.questionId = event.params.questionId
  question.createdBy = event.params.createdBy.toHexString() 
  question.value = event.params.value
  question.createdAt = event.block.timestamp
  question.save()

  //Changing claimed  in QuestionCreatedEntity
  let questionCreated = QuestionCreatedEntity.load(event.params.questionId.toHexString())
  if (questionCreated){
    questionCreated.claimed = true
    questionCreated.save()
  }

  let user = AmaUserEntity.load(event.params.createdBy.toHexString())
  if (user){
    if (!user.questionsClaimedBack) {
      user.questionsClaimedBack = BigInt.fromI32(0)  
    }
    if (!user.questionsValueClaimedBack) {
      user.questionsValueClaimedBack = BigInt.fromI32(0)  
    }


    user.questionsClaimedBack = user.questionsClaimedBack.plus(BigInt.fromI32(1))
    user.questionsValueClaimedBack = user.questionsValueClaimedBack.plus(event.params.value)
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
  tip.questionId = event.params.questionId
  tip.tipId = event.params.tipId
  tip.createdBy = event.params.createdBy.toHexString()
  tip.value = event.params.value
  tip.claimed = false
  tip.createdAt = event.block.timestamp
  tip.save()
  
  let question = QuestionCreatedEntity.load(event.params.questionId.toHexString())
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
  tip.questionId = event.params.questionId
  tip.tipId = event.params.tipId
  tip.createdBy = event.params.createdBy.toHexString()
  tip.value = event.params.value
  tip.createdAt = event.block.timestamp
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

export function handleWithdraw(event: Withdraw): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}