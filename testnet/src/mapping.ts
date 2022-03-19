import { BigInt } from "@graphprotocol/graph-ts"
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

import {
  DomainRegistered,
  RequestErrored,
  RequestFulfilled
} from "../generated/AmaChainlinkTwitterClient/AmaChainlinkTwitterClient"


import { ExampleEntity, QuestionAnsweredEntity, QuestionCreatedEntity, QuestionValueClaimedEntity,
  TipCreatedEntity, TipValueClaimedEntity, AmaUserEntity, DomainRegisteredEntity, RequestErroredEntity } from "../generated/schema"

export function handleAmountReceived(event: AmountReceived): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)
  entity.count = entity.count.plus(BigInt.fromI32(1))


  // Entity fields can be set based on event parameters
  entity.sender = event.params.sender
  entity.value = event.params.value

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.GOVERNANCE_ROLE(...)
  // - contract.ZERO_BYTES32(...)
  // - contract.balance(...)
  // - contract.blockList(...)
  // - contract.createFreeQuestion(...)
  // - contract.defaultQuestionTimeLimit(...)
  // - contract.feeCollector(...)
  // - contract.feeNumerator(...)
  // - contract.freeQuestions(...)
  // - contract.getQuestionTipIds(...)
  // - contract.getRoleAdmin(...)
  // - contract.getRoleMember(...)
  // - contract.getRoleMemberCount(...)
  // - contract.getUserQuestionIds(...)
  // - contract.getUserQuestionIdsLength(...)
  // - contract.getUserTipIds(...)
  // - contract.hasRole(...)
  // - contract.isTrustedForwarder(...)
  // - contract.maxExtendLimit(...)
  // - contract.minTimeLock(...)
  // - contract.minimumBid(...)
  // - contract.nftContract(...)
  // - contract.paused(...)
  // - contract.questionIdToSocialId(...)
  // - contract.questions(...)
  // - contract.socialNetworkIds(...)
  // - contract.socialNetworkVerification(...)
  // - contract.socialNetworks(...)
  // - contract.supportsInterface(...)
  // - contract.tips(...)
  // - contract.userBalance(...)
  // - contract.userMinimumBid(...)
}

export function handleBlocked(event: Blocked): void {}

export function handlePaused(event: Paused): void {}

export function handleQuestionAnswered(event: QuestionAnswered): void {

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
    owner.answersReceived = owner.answersReceived.plus(BigInt.fromI32(1))
    owner.save()

  }

  //Update answerer on question Answered
  let creator = AmaUserEntity.load(event.params.creator.toHexString())
  if (creator){
      creator.answersCreated = creator.answersCreated.plus(BigInt.fromI32(1))
      creator.valueReceivedOnAnswers = creator.valueReceivedOnAnswers.plus(event.params.value)
      creator.save()
    }
}

export function handleQuestionCreated(event: QuestionCreated): void {


  let newQuestion = new QuestionCreatedEntity(event.params.questionId.toHexString())

  let senderId = event.params.createdBy.toHexString()
  let recipientId = event.params.recipient.toHexString()

  let sender = AmaUserEntity.load(senderId)
  let recipient = AmaUserEntity.load(recipientId)



  if (!sender) {
    sender = new AmaUserEntity(senderId)
    sender.address = event.params.createdBy.toHexString()
    sender.createdAt = event.block.timestamp


    sender.questionsCreated = BigInt.fromI32(0)
    sender.tipsCreated = BigInt.fromI32(0)
    sender.blockuserCreated = BigInt.fromI32(0)
    sender.answersCreated = BigInt.fromI32(0)
  
  
    sender.questionsReceived = BigInt.fromI32(0)
    sender.answersReceived = BigInt.fromI32(0)
    sender.blockUserReceived = BigInt.fromI32(0)
  
  
  
    sender.valueSpentOnTips = BigInt.fromI32(0)
    sender.valueSpentOnQuestions = BigInt.fromI32(0)


    sender.valueReceivedOnQuestions = BigInt.fromI32(0)
    sender.valueReceivedOnAnswers = BigInt.fromI32(0)
    sender.valueReceivedOnTips = BigInt.fromI32(0)


    sender.questionsClaimedBack = BigInt.fromI32(0)
    sender.tipsClaimedBack = BigInt.fromI32(0)
  
    sender.questionsValueClaimedBack = BigInt.fromI32(0)
    sender.tipsValueClaimedBack = BigInt.fromI32(0)
  
    sender.twitterId = BigInt.fromI32(0)
    sender.twitterUsername = ""

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
    recipient = new AmaUserEntity(recipientId)
    recipient.address = event.params.recipient.toHexString()
    recipient.createdAt = event.block.timestamp


    recipient.questionsCreated = BigInt.fromI32(0)
    recipient.tipsCreated = BigInt.fromI32(0)
    recipient.blockuserCreated = BigInt.fromI32(0)
    recipient.answersCreated = BigInt.fromI32(0)
  
  
    recipient.questionsReceived = BigInt.fromI32(0)
    recipient.answersReceived = BigInt.fromI32(0)
    recipient.blockUserReceived = BigInt.fromI32(0)
  
  
  
    recipient.valueSpentOnQuestions = BigInt.fromI32(0)
    recipient.valueSpentOnTips = BigInt.fromI32(0)

    recipient.valueReceivedOnQuestions = BigInt.fromI32(0)
    recipient.valueReceivedOnAnswers = BigInt.fromI32(0)
    recipient.valueReceivedOnTips = BigInt.fromI32(0)

  
    recipient.questionsClaimedBack = BigInt.fromI32(0)
    recipient.tipsClaimedBack = BigInt.fromI32(0)
  
    recipient.questionsValueClaimedBack = BigInt.fromI32(0)
    recipient.tipsValueClaimedBack = BigInt.fromI32(0)
  
    recipient.twitterId = BigInt.fromI32(0)
    recipient.twitterUsername = ""

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
    user.questionsClaimedBack = user.questionsClaimedBack.plus(BigInt.fromI32(1))
    user.questionsValueClaimedBack = user.questionsValueClaimedBack.plus(event.params.value)
    user.save()
  }


}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleTipCreated(event: TipCreated): void {

  let senderId = event.params.createdBy.toHexString()

  let sender = AmaUserEntity.load(senderId)

  if (!sender) {
    sender = new AmaUserEntity(senderId)
    sender.address = event.params.createdBy.toHexString()
    sender.createdAt = event.block.timestamp


    sender.questionsCreated = BigInt.fromI32(0)
    sender.tipsCreated = BigInt.fromI32(0)
    sender.blockuserCreated = BigInt.fromI32(0)
    sender.answersCreated = BigInt.fromI32(0)
  
  
    sender.questionsReceived = BigInt.fromI32(0)
    sender.answersReceived = BigInt.fromI32(0)
    sender.blockUserReceived = BigInt.fromI32(0)
  
  
  
    sender.valueSpentOnTips = BigInt.fromI32(0)
    sender.valueSpentOnQuestions = BigInt.fromI32(0)


    sender.valueReceivedOnQuestions =BigInt.fromI32(0)
    sender.valueReceivedOnAnswers =BigInt.fromI32(0)
    sender.valueReceivedOnTips = BigInt.fromI32(0)


    sender.questionsClaimedBack = BigInt.fromI32(0)
    sender.tipsClaimedBack = BigInt.fromI32(0)
  
    sender.questionsValueClaimedBack = BigInt.fromI32(0)
    sender.tipsValueClaimedBack = BigInt.fromI32(0)
  
    sender.twitterId = BigInt.fromI32(0)
    sender.twitterUsername = ""

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
      user.valueReceivedOnTips = user.valueReceivedOnTips?.plus(event.params.value)
      user.save()

    }
    
  }

}








export function handleTipValueClaimed(event: TipValueClaimed): void {
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
    user.tipsClaimedBack = user.tipsClaimedBack.plus(BigInt.fromI32(1))
    user.tipsValueClaimedBack = user.tipsValueClaimedBack.plus(event.params.value)
    user.save()
  }

}

export function handleUnpaused(event: Unpaused): void {}

export function handleWithdraw(event: Withdraw): void {}


