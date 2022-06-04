import { BigInt } from "@graphprotocol/graph-ts"
import { log } from '@graphprotocol/graph-ts'
import {insertUser} from './mappingUser'

import {
    
  Withdraw,
  Transfer
} from "../generated/CommonFacet/CommonFacet"



import { WithdrawEntity, TransferEntity, AmaUserEntity} from "../generated/schema"


export function handleWithdraw(event: Withdraw): void {
  let id = event.transaction.hash.toHex()
  let withdrawEvent = new WithdrawEntity(id)
  withdrawEvent.user = event.params.sender.toHexString()
  withdrawEvent.value = event.params.amount
  withdrawEvent.createdAt = event.block.timestamp
  withdrawEvent.txHash =  event.transaction.hash.toHex()

  withdrawEvent.save()
  let user = AmaUserEntity.load(event.params.sender.toHexString())
  if(user == null){
    user = insertUser(event.params.sender.toHexString(), event.block.timestamp)
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
  transfer.value = event.params.amount
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
      sender.profileTipsValueSent = sender.profileTipsValueSent.abs().plus(event.params.amount)
        }else{
      sender.profileTipsValueSent =event.params.amount
      }
  sender.save()
  

  if (recipient.profileTipsReceived !== null){
    recipient.profileTipsReceived = recipient.profileTipsReceived.abs().plus(BigInt.fromI32(1))
      }else{
    recipient.profileTipsReceived = BigInt.fromI32(1)
    }

  if (sender.profileTipsValueReceived !== null){
      sender.profileTipsValueReceived = sender.profileTipsValueReceived.abs().plus(event.params.amount)
        }else{
      sender.profileTipsValueReceived =event.params.amount
  }

  recipient.save()

}
