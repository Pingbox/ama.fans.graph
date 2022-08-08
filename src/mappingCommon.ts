import { BigInt } from "@graphprotocol/graph-ts"
import { log } from '@graphprotocol/graph-ts'
import {insertUser} from './mappingUser'

import {
    
  Withdraw,
  Transfer,
  FiatUserWithdraw} from "../generated/CommonFacet/CommonFacet"



import { WithdrawEntity, TransferEntity, FiatUserWithdrawEntity, 
      RoleWithdrawEntity, AmaUserEntity} from "../generated/schema"


export function handleFiatUserWithdraw(event: FiatUserWithdraw): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let amountWithdrawn = new FiatUserWithdrawEntity(id)
  amountWithdrawn.sender = event.params.sender.toHexString()
  amountWithdrawn.amount = event.params.amount
  amountWithdrawn.createdAt = event.block.timestamp
  amountWithdrawn.txHash =  event.transaction.hash.toHex()
  amountWithdrawn.gasPrice =  event.transaction.gasPrice
  amountWithdrawn.gasLimit =  event.transaction.gasLimit
  amountWithdrawn.save()

  let sender = AmaUserEntity.load(event.params.sender.toHexString())
  if(sender == null){
    sender = insertUser(event.params.sender.toHexString(), event.block.timestamp)
  }
  
  if (sender.earningsWithdrawn !== null){
    sender.earningsWithdrawn = sender.earningsWithdrawn.abs().plus(event.params.amount)
          
    }else{
      sender.earningsWithdrawn = event.params.amount
    }
  sender.save()

}
      



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

