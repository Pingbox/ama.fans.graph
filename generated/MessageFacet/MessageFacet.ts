// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AmountReceived extends ethereum.Event {
  get params(): AmountReceived__Params {
    return new AmountReceived__Params(this);
  }
}

export class AmountReceived__Params {
  _event: AmountReceived;

  constructor(event: AmountReceived) {
    this._event = event;
  }

  get receiver(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class DonationMade extends ethereum.Event {
  get params(): DonationMade__Params {
    return new DonationMade__Params(this);
  }
}

export class DonationMade__Params {
  _event: DonationMade;

  constructor(event: DonationMade) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get donationAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class MessageCreated extends ethereum.Event {
  get params(): MessageCreated__Params {
    return new MessageCreated__Params(this);
  }
}

export class MessageCreated__Params {
  _event: MessageCreated;

  constructor(event: MessageCreated) {
    this._event = event;
  }

  get createdBy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get respondedBy(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get messageId(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get messageLink(): string {
    return this._event.parameters[3].value.toString();
  }

  get msgValue(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get timelock(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class MessageValueClaimed extends ethereum.Event {
  get params(): MessageValueClaimed__Params {
    return new MessageValueClaimed__Params(this);
  }
}

export class MessageValueClaimed__Params {
  _event: MessageValueClaimed;

  constructor(event: MessageValueClaimed) {
    this._event = event;
  }

  get messageId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get createdBy(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ResponseCreated extends ethereum.Event {
  get params(): ResponseCreated__Params {
    return new ResponseCreated__Params(this);
  }
}

export class ResponseCreated__Params {
  _event: ResponseCreated;

  constructor(event: ResponseCreated) {
    this._event = event;
  }

  get createdBy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get respondedBy(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get messageId(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get answerLink(): string {
    return this._event.parameters[3].value.toString();
  }

  get responseValue(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get msgValueAfterDeduction(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class ResponseMarked extends ethereum.Event {
  get params(): ResponseMarked__Params {
    return new ResponseMarked__Params(this);
  }
}

export class ResponseMarked__Params {
  _event: ResponseMarked;

  constructor(event: ResponseMarked) {
    this._event = event;
  }

  get messageId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get createdBy(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get respondedBy(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get responseType(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class TipCreated extends ethereum.Event {
  get params(): TipCreated__Params {
    return new TipCreated__Params(this);
  }
}

export class TipCreated__Params {
  _event: TipCreated;

  constructor(event: TipCreated) {
    this._event = event;
  }

  get messageId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get tipId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get createdBy(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class TipValueClaimed extends ethereum.Event {
  get params(): TipValueClaimed__Params {
    return new TipValueClaimed__Params(this);
  }
}

export class TipValueClaimed__Params {
  _event: TipValueClaimed;

  constructor(event: TipValueClaimed) {
    this._event = event;
  }

  get messageId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get tipId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get createdBy(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class MessageFacet__geMessageIdsResult {
  value0: Array<Bytes>;
  value1: BigInt;

  constructor(value0: Array<Bytes>, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytesArray(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class MessageFacet__getMessageResult {
  value0: string;
  value1: string;
  value2: BigInt;
  value3: BigInt;
  value4: Address;
  value5: Address;
  value6: BigInt;
  value7: BigInt;
  value8: BigInt;
  value9: BigInt;

  constructor(
    value0: string,
    value1: string,
    value2: BigInt,
    value3: BigInt,
    value4: Address,
    value5: Address,
    value6: BigInt,
    value7: BigInt,
    value8: BigInt,
    value9: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromAddress(this.value4));
    map.set("value5", ethereum.Value.fromAddress(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    map.set("value8", ethereum.Value.fromUnsignedBigInt(this.value8));
    map.set("value9", ethereum.Value.fromUnsignedBigInt(this.value9));
    return map;
  }
}

export class MessageFacet__getTipIdsResult {
  value0: Array<Bytes>;
  value1: BigInt;

  constructor(value0: Array<Bytes>, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytesArray(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class MessageFacet__getTipIdsOfMessageResult {
  value0: Array<Bytes>;
  value1: BigInt;

  constructor(value0: Array<Bytes>, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytesArray(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class MessageFacet extends ethereum.SmartContract {
  static bind(address: Address): MessageFacet {
    return new MessageFacet("MessageFacet", address);
  }

  geMessageIds(
    skip_: BigInt,
    limit_: BigInt
  ): MessageFacet__geMessageIdsResult {
    let result = super.call(
      "geMessageIds",
      "geMessageIds(uint256,uint256):(bytes32[],uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(skip_),
        ethereum.Value.fromUnsignedBigInt(limit_)
      ]
    );

    return new MessageFacet__geMessageIdsResult(
      result[0].toBytesArray(),
      result[1].toBigInt()
    );
  }

  try_geMessageIds(
    skip_: BigInt,
    limit_: BigInt
  ): ethereum.CallResult<MessageFacet__geMessageIdsResult> {
    let result = super.tryCall(
      "geMessageIds",
      "geMessageIds(uint256,uint256):(bytes32[],uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(skip_),
        ethereum.Value.fromUnsignedBigInt(limit_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new MessageFacet__geMessageIdsResult(
        value[0].toBytesArray(),
        value[1].toBigInt()
      )
    );
  }

  getMessage(messageId_: Bytes): MessageFacet__getMessageResult {
    let result = super.call(
      "getMessage",
      "getMessage(bytes32):(string,string,uint256,uint256,address,address,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromFixedBytes(messageId_)]
    );

    return new MessageFacet__getMessageResult(
      result[0].toString(),
      result[1].toString(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toAddress(),
      result[5].toAddress(),
      result[6].toBigInt(),
      result[7].toBigInt(),
      result[8].toBigInt(),
      result[9].toBigInt()
    );
  }

  try_getMessage(
    messageId_: Bytes
  ): ethereum.CallResult<MessageFacet__getMessageResult> {
    let result = super.tryCall(
      "getMessage",
      "getMessage(bytes32):(string,string,uint256,uint256,address,address,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromFixedBytes(messageId_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new MessageFacet__getMessageResult(
        value[0].toString(),
        value[1].toString(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toAddress(),
        value[5].toAddress(),
        value[6].toBigInt(),
        value[7].toBigInt(),
        value[8].toBigInt(),
        value[9].toBigInt()
      )
    );
  }

  getTipIds(skip_: BigInt, limit_: BigInt): MessageFacet__getTipIdsResult {
    let result = super.call(
      "getTipIds",
      "getTipIds(uint256,uint256):(bytes32[],uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(skip_),
        ethereum.Value.fromUnsignedBigInt(limit_)
      ]
    );

    return new MessageFacet__getTipIdsResult(
      result[0].toBytesArray(),
      result[1].toBigInt()
    );
  }

  try_getTipIds(
    skip_: BigInt,
    limit_: BigInt
  ): ethereum.CallResult<MessageFacet__getTipIdsResult> {
    let result = super.tryCall(
      "getTipIds",
      "getTipIds(uint256,uint256):(bytes32[],uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(skip_),
        ethereum.Value.fromUnsignedBigInt(limit_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new MessageFacet__getTipIdsResult(
        value[0].toBytesArray(),
        value[1].toBigInt()
      )
    );
  }

  getTipIdsOfMessage(
    messageId_: Bytes,
    skip_: BigInt,
    limit_: BigInt
  ): MessageFacet__getTipIdsOfMessageResult {
    let result = super.call(
      "getTipIdsOfMessage",
      "getTipIdsOfMessage(bytes32,uint256,uint256):(bytes32[],uint256)",
      [
        ethereum.Value.fromFixedBytes(messageId_),
        ethereum.Value.fromUnsignedBigInt(skip_),
        ethereum.Value.fromUnsignedBigInt(limit_)
      ]
    );

    return new MessageFacet__getTipIdsOfMessageResult(
      result[0].toBytesArray(),
      result[1].toBigInt()
    );
  }

  try_getTipIdsOfMessage(
    messageId_: Bytes,
    skip_: BigInt,
    limit_: BigInt
  ): ethereum.CallResult<MessageFacet__getTipIdsOfMessageResult> {
    let result = super.tryCall(
      "getTipIdsOfMessage",
      "getTipIdsOfMessage(bytes32,uint256,uint256):(bytes32[],uint256)",
      [
        ethereum.Value.fromFixedBytes(messageId_),
        ethereum.Value.fromUnsignedBigInt(skip_),
        ethereum.Value.fromUnsignedBigInt(limit_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new MessageFacet__getTipIdsOfMessageResult(
        value[0].toBytesArray(),
        value[1].toBigInt()
      )
    );
  }
}

export class ClaimBackMessageValueCall extends ethereum.Call {
  get inputs(): ClaimBackMessageValueCall__Inputs {
    return new ClaimBackMessageValueCall__Inputs(this);
  }

  get outputs(): ClaimBackMessageValueCall__Outputs {
    return new ClaimBackMessageValueCall__Outputs(this);
  }
}

export class ClaimBackMessageValueCall__Inputs {
  _call: ClaimBackMessageValueCall;

  constructor(call: ClaimBackMessageValueCall) {
    this._call = call;
  }

  get data_(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get signature_(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class ClaimBackMessageValueCall__Outputs {
  _call: ClaimBackMessageValueCall;

  constructor(call: ClaimBackMessageValueCall) {
    this._call = call;
  }
}

export class ClaimBackTipValueCall extends ethereum.Call {
  get inputs(): ClaimBackTipValueCall__Inputs {
    return new ClaimBackTipValueCall__Inputs(this);
  }

  get outputs(): ClaimBackTipValueCall__Outputs {
    return new ClaimBackTipValueCall__Outputs(this);
  }
}

export class ClaimBackTipValueCall__Inputs {
  _call: ClaimBackTipValueCall;

  constructor(call: ClaimBackTipValueCall) {
    this._call = call;
  }

  get data_(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get signature_(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class ClaimBackTipValueCall__Outputs {
  _call: ClaimBackTipValueCall;

  constructor(call: ClaimBackTipValueCall) {
    this._call = call;
  }
}

export class CreateMessageCall extends ethereum.Call {
  get inputs(): CreateMessageCall__Inputs {
    return new CreateMessageCall__Inputs(this);
  }

  get outputs(): CreateMessageCall__Outputs {
    return new CreateMessageCall__Outputs(this);
  }
}

export class CreateMessageCall__Inputs {
  _call: CreateMessageCall;

  constructor(call: CreateMessageCall) {
    this._call = call;
  }

  get data_(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get signature_(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class CreateMessageCall__Outputs {
  _call: CreateMessageCall;

  constructor(call: CreateMessageCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class CreateResponseCall extends ethereum.Call {
  get inputs(): CreateResponseCall__Inputs {
    return new CreateResponseCall__Inputs(this);
  }

  get outputs(): CreateResponseCall__Outputs {
    return new CreateResponseCall__Outputs(this);
  }
}

export class CreateResponseCall__Inputs {
  _call: CreateResponseCall;

  constructor(call: CreateResponseCall) {
    this._call = call;
  }

  get data_(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get signature_(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class CreateResponseCall__Outputs {
  _call: CreateResponseCall;

  constructor(call: CreateResponseCall) {
    this._call = call;
  }
}

export class CreateTipCall extends ethereum.Call {
  get inputs(): CreateTipCall__Inputs {
    return new CreateTipCall__Inputs(this);
  }

  get outputs(): CreateTipCall__Outputs {
    return new CreateTipCall__Outputs(this);
  }
}

export class CreateTipCall__Inputs {
  _call: CreateTipCall;

  constructor(call: CreateTipCall) {
    this._call = call;
  }

  get data_(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get signature_(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class CreateTipCall__Outputs {
  _call: CreateTipCall;

  constructor(call: CreateTipCall) {
    this._call = call;
  }
}

export class InitMessageCall extends ethereum.Call {
  get inputs(): InitMessageCall__Inputs {
    return new InitMessageCall__Inputs(this);
  }

  get outputs(): InitMessageCall__Outputs {
    return new InitMessageCall__Outputs(this);
  }
}

export class InitMessageCall__Inputs {
  _call: InitMessageCall;

  constructor(call: InitMessageCall) {
    this._call = call;
  }

  get feeNumerator_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get baseURI_(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class InitMessageCall__Outputs {
  _call: InitMessageCall;

  constructor(call: InitMessageCall) {
    this._call = call;
  }
}

export class MarkResponseCall extends ethereum.Call {
  get inputs(): MarkResponseCall__Inputs {
    return new MarkResponseCall__Inputs(this);
  }

  get outputs(): MarkResponseCall__Outputs {
    return new MarkResponseCall__Outputs(this);
  }
}

export class MarkResponseCall__Inputs {
  _call: MarkResponseCall;

  constructor(call: MarkResponseCall) {
    this._call = call;
  }

  get data_(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get signature_(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class MarkResponseCall__Outputs {
  _call: MarkResponseCall;

  constructor(call: MarkResponseCall) {
    this._call = call;
  }
}

export class SetMessageBaseURICall extends ethereum.Call {
  get inputs(): SetMessageBaseURICall__Inputs {
    return new SetMessageBaseURICall__Inputs(this);
  }

  get outputs(): SetMessageBaseURICall__Outputs {
    return new SetMessageBaseURICall__Outputs(this);
  }
}

export class SetMessageBaseURICall__Inputs {
  _call: SetMessageBaseURICall;

  constructor(call: SetMessageBaseURICall) {
    this._call = call;
  }

  get _baseURI(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetMessageBaseURICall__Outputs {
  _call: SetMessageBaseURICall;

  constructor(call: SetMessageBaseURICall) {
    this._call = call;
  }
}
