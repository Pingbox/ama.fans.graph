// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ExampleEntity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("count", Value.fromBigInt(BigInt.zero()));
    this.set("sender", Value.fromBytes(Bytes.empty()));
    this.set("value", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ExampleEntity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ExampleEntity must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ExampleEntity", id.toString(), this);
    }
  }

  static load(id: string): ExampleEntity | null {
    return changetype<ExampleEntity | null>(store.get("ExampleEntity", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get count(): BigInt {
    let value = this.get("count");
    return value!.toBigInt();
  }

  set count(value: BigInt) {
    this.set("count", Value.fromBigInt(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value!.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}

export class AmaUser extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("createdAt", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AmaUser entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type AmaUser must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("AmaUser", id.toString(), this);
    }
  }

  static load(id: string): AmaUser | null {
    return changetype<AmaUser | null>(store.get("AmaUser", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get questionsSent(): i32 {
    let value = this.get("questionsSent");
    return value!.toI32();
  }

  set questionsSent(value: i32) {
    this.set("questionsSent", Value.fromI32(value));
  }

  get questionsReceived(): i32 {
    let value = this.get("questionsReceived");
    return value!.toI32();
  }

  set questionsReceived(value: i32) {
    this.set("questionsReceived", Value.fromI32(value));
  }

  get valueSpentOnQuestions(): BigInt | null {
    let value = this.get("valueSpentOnQuestions");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set valueSpentOnQuestions(value: BigInt | null) {
    if (!value) {
      this.unset("valueSpentOnQuestions");
    } else {
      this.set("valueSpentOnQuestions", Value.fromBigInt(<BigInt>value));
    }
  }

  get questionsClaimedBack(): i32 {
    let value = this.get("questionsClaimedBack");
    return value!.toI32();
  }

  set questionsClaimedBack(value: i32) {
    this.set("questionsClaimedBack", Value.fromI32(value));
  }

  get questionsValueClaimedBack(): BigInt | null {
    let value = this.get("questionsValueClaimedBack");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set questionsValueClaimedBack(value: BigInt | null) {
    if (!value) {
      this.unset("questionsValueClaimedBack");
    } else {
      this.set("questionsValueClaimedBack", Value.fromBigInt(<BigInt>value));
    }
  }

  get valueReceivedOnQuestions(): BigInt | null {
    let value = this.get("valueReceivedOnQuestions");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set valueReceivedOnQuestions(value: BigInt | null) {
    if (!value) {
      this.unset("valueReceivedOnQuestions");
    } else {
      this.set("valueReceivedOnQuestions", Value.fromBigInt(<BigInt>value));
    }
  }

  get answersReceived(): i32 {
    let value = this.get("answersReceived");
    return value!.toI32();
  }

  set answersReceived(value: i32) {
    this.set("answersReceived", Value.fromI32(value));
  }

  get valueSpentOnAnswers(): BigInt | null {
    let value = this.get("valueSpentOnAnswers");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set valueSpentOnAnswers(value: BigInt | null) {
    if (!value) {
      this.unset("valueSpentOnAnswers");
    } else {
      this.set("valueSpentOnAnswers", Value.fromBigInt(<BigInt>value));
    }
  }

  get answersMade(): i32 {
    let value = this.get("answersMade");
    return value!.toI32();
  }

  set answersMade(value: i32) {
    this.set("answersMade", Value.fromI32(value));
  }

  get MadeBlock(): i32 {
    let value = this.get("MadeBlock");
    return value!.toI32();
  }

  set MadeBlock(value: i32) {
    this.set("MadeBlock", Value.fromI32(value));
  }

  get ReceivedBlock(): i32 {
    let value = this.get("ReceivedBlock");
    return value!.toI32();
  }

  set ReceivedBlock(value: i32) {
    this.set("ReceivedBlock", Value.fromI32(value));
  }

  get address(): Bytes | null {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes | null) {
    if (!value) {
      this.unset("address");
    } else {
      this.set("address", Value.fromBytes(<Bytes>value));
    }
  }

  get twitterId(): i32 {
    let value = this.get("twitterId");
    return value!.toI32();
  }

  set twitterId(value: i32) {
    this.set("twitterId", Value.fromI32(value));
  }

  get createdAt(): i32 {
    let value = this.get("createdAt");
    return value!.toI32();
  }

  set createdAt(value: i32) {
    this.set("createdAt", Value.fromI32(value));
  }

  get tips(): i32 {
    let value = this.get("tips");
    return value!.toI32();
  }

  set tips(value: i32) {
    this.set("tips", Value.fromI32(value));
  }

  get valueSpentOnTips(): BigInt | null {
    let value = this.get("valueSpentOnTips");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set valueSpentOnTips(value: BigInt | null) {
    if (!value) {
      this.unset("valueSpentOnTips");
    } else {
      this.set("valueSpentOnTips", Value.fromBigInt(<BigInt>value));
    }
  }

  get twitterUsername(): string | null {
    let value = this.get("twitterUsername");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set twitterUsername(value: string | null) {
    if (!value) {
      this.unset("twitterUsername");
    } else {
      this.set("twitterUsername", Value.fromString(<string>value));
    }
  }
}

export class UnconfirmedAmaUser extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("createdAt", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UnconfirmedAmaUser entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UnconfirmedAmaUser must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("UnconfirmedAmaUser", id.toString(), this);
    }
  }

  static load(id: string): UnconfirmedAmaUser | null {
    return changetype<UnconfirmedAmaUser | null>(
      store.get("UnconfirmedAmaUser", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get questionsSent(): i32 {
    let value = this.get("questionsSent");
    return value!.toI32();
  }

  set questionsSent(value: i32) {
    this.set("questionsSent", Value.fromI32(value));
  }

  get questionsReceived(): i32 {
    let value = this.get("questionsReceived");
    return value!.toI32();
  }

  set questionsReceived(value: i32) {
    this.set("questionsReceived", Value.fromI32(value));
  }

  get valueSpentOnQuestions(): BigInt | null {
    let value = this.get("valueSpentOnQuestions");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set valueSpentOnQuestions(value: BigInt | null) {
    if (!value) {
      this.unset("valueSpentOnQuestions");
    } else {
      this.set("valueSpentOnQuestions", Value.fromBigInt(<BigInt>value));
    }
  }

  get questionsClaimedBack(): i32 {
    let value = this.get("questionsClaimedBack");
    return value!.toI32();
  }

  set questionsClaimedBack(value: i32) {
    this.set("questionsClaimedBack", Value.fromI32(value));
  }

  get questionsValueClaimedBack(): BigInt | null {
    let value = this.get("questionsValueClaimedBack");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set questionsValueClaimedBack(value: BigInt | null) {
    if (!value) {
      this.unset("questionsValueClaimedBack");
    } else {
      this.set("questionsValueClaimedBack", Value.fromBigInt(<BigInt>value));
    }
  }

  get valueReceivedOnQuestions(): BigInt | null {
    let value = this.get("valueReceivedOnQuestions");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set valueReceivedOnQuestions(value: BigInt | null) {
    if (!value) {
      this.unset("valueReceivedOnQuestions");
    } else {
      this.set("valueReceivedOnQuestions", Value.fromBigInt(<BigInt>value));
    }
  }

  get answersReceived(): i32 {
    let value = this.get("answersReceived");
    return value!.toI32();
  }

  set answersReceived(value: i32) {
    this.set("answersReceived", Value.fromI32(value));
  }

  get valueSpentOnAnswers(): BigInt | null {
    let value = this.get("valueSpentOnAnswers");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set valueSpentOnAnswers(value: BigInt | null) {
    if (!value) {
      this.unset("valueSpentOnAnswers");
    } else {
      this.set("valueSpentOnAnswers", Value.fromBigInt(<BigInt>value));
    }
  }

  get address(): Bytes | null {
    let value = this.get("address");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set address(value: Bytes | null) {
    if (!value) {
      this.unset("address");
    } else {
      this.set("address", Value.fromBytes(<Bytes>value));
    }
  }

  get twitterId(): i32 {
    let value = this.get("twitterId");
    return value!.toI32();
  }

  set twitterId(value: i32) {
    this.set("twitterId", Value.fromI32(value));
  }

  get createdAt(): i32 {
    let value = this.get("createdAt");
    return value!.toI32();
  }

  set createdAt(value: i32) {
    this.set("createdAt", Value.fromI32(value));
  }
}

export class DomainRegistered extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("useraddress", Value.fromBytes(Bytes.empty()));
    this.set("nodeHash", Value.fromBytes(Bytes.empty()));
    this.set("twitterId", Value.fromBigInt(BigInt.zero()));
    this.set("label", Value.fromString(""));
    this.set("createdAt", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DomainRegistered entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DomainRegistered must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DomainRegistered", id.toString(), this);
    }
  }

  static load(id: string): DomainRegistered | null {
    return changetype<DomainRegistered | null>(
      store.get("DomainRegistered", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get useraddress(): Bytes {
    let value = this.get("useraddress");
    return value!.toBytes();
  }

  set useraddress(value: Bytes) {
    this.set("useraddress", Value.fromBytes(value));
  }

  get nodeHash(): Bytes {
    let value = this.get("nodeHash");
    return value!.toBytes();
  }

  set nodeHash(value: Bytes) {
    this.set("nodeHash", Value.fromBytes(value));
  }

  get twitterId(): BigInt {
    let value = this.get("twitterId");
    return value!.toBigInt();
  }

  set twitterId(value: BigInt) {
    this.set("twitterId", Value.fromBigInt(value));
  }

  get twitterUsername(): string | null {
    let value = this.get("twitterUsername");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set twitterUsername(value: string | null) {
    if (!value) {
      this.unset("twitterUsername");
    } else {
      this.set("twitterUsername", Value.fromString(<string>value));
    }
  }

  get label(): string {
    let value = this.get("label");
    return value!.toString();
  }

  set label(value: string) {
    this.set("label", Value.fromString(value));
  }

  get createdAt(): i32 {
    let value = this.get("createdAt");
    return value!.toI32();
  }

  set createdAt(value: i32) {
    this.set("createdAt", Value.fromI32(value));
  }
}

export class RequestErrored extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("bytes", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save RequestErrored entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type RequestErrored must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("RequestErrored", id.toString(), this);
    }
  }

  static load(id: string): RequestErrored | null {
    return changetype<RequestErrored | null>(store.get("RequestErrored", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get bytes(): Bytes {
    let value = this.get("bytes");
    return value!.toBytes();
  }

  set bytes(value: Bytes) {
    this.set("bytes", Value.fromBytes(value));
  }
}

export class RequestFulfilled extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("bytes", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save RequestFulfilled entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type RequestFulfilled must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("RequestFulfilled", id.toString(), this);
    }
  }

  static load(id: string): RequestFulfilled | null {
    return changetype<RequestFulfilled | null>(
      store.get("RequestFulfilled", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get bytes(): Bytes {
    let value = this.get("bytes");
    return value!.toBytes();
  }

  set bytes(value: Bytes) {
    this.set("bytes", Value.fromBytes(value));
  }
}

export class QuestionCreated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("socialId", Value.fromBigInt(BigInt.zero()));
    this.set("questionId", Value.fromBytes(Bytes.empty()));
    this.set("createdBy", Value.fromBytes(Bytes.empty()));
    this.set("value", Value.fromBigInt(BigInt.zero()));
    this.set("timelimit", Value.fromBigInt(BigInt.zero()));
    this.set("link", Value.fromString(""));
    this.set("socialNetworkId", Value.fromBigInt(BigInt.zero()));
    this.set("createdAt", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save QuestionCreated entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type QuestionCreated must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("QuestionCreated", id.toString(), this);
    }
  }

  static load(id: string): QuestionCreated | null {
    return changetype<QuestionCreated | null>(store.get("QuestionCreated", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get socialId(): BigInt {
    let value = this.get("socialId");
    return value!.toBigInt();
  }

  set socialId(value: BigInt) {
    this.set("socialId", Value.fromBigInt(value));
  }

  get questionId(): Bytes {
    let value = this.get("questionId");
    return value!.toBytes();
  }

  set questionId(value: Bytes) {
    this.set("questionId", Value.fromBytes(value));
  }

  get createdBy(): Bytes {
    let value = this.get("createdBy");
    return value!.toBytes();
  }

  set createdBy(value: Bytes) {
    this.set("createdBy", Value.fromBytes(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get timelimit(): BigInt {
    let value = this.get("timelimit");
    return value!.toBigInt();
  }

  set timelimit(value: BigInt) {
    this.set("timelimit", Value.fromBigInt(value));
  }

  get link(): string {
    let value = this.get("link");
    return value!.toString();
  }

  set link(value: string) {
    this.set("link", Value.fromString(value));
  }

  get socialNetworkId(): BigInt {
    let value = this.get("socialNetworkId");
    return value!.toBigInt();
  }

  set socialNetworkId(value: BigInt) {
    this.set("socialNetworkId", Value.fromBigInt(value));
  }

  get answered(): boolean {
    let value = this.get("answered");
    return value!.toBoolean();
  }

  set answered(value: boolean) {
    this.set("answered", Value.fromBoolean(value));
  }

  get claimed(): boolean {
    let value = this.get("claimed");
    return value!.toBoolean();
  }

  set claimed(value: boolean) {
    this.set("claimed", Value.fromBoolean(value));
  }

  get createdAt(): i32 {
    let value = this.get("createdAt");
    return value!.toI32();
  }

  set createdAt(value: i32) {
    this.set("createdAt", Value.fromI32(value));
  }
}

export class QuestionAnswered extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("questionId", Value.fromBytes(Bytes.empty()));
    this.set("owner", Value.fromBytes(Bytes.empty()));
    this.set("creator", Value.fromBytes(Bytes.empty()));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("value", Value.fromBigInt(BigInt.zero()));
    this.set("createdAt", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save QuestionAnswered entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type QuestionAnswered must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("QuestionAnswered", id.toString(), this);
    }
  }

  static load(id: string): QuestionAnswered | null {
    return changetype<QuestionAnswered | null>(
      store.get("QuestionAnswered", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get questionId(): Bytes {
    let value = this.get("questionId");
    return value!.toBytes();
  }

  set questionId(value: Bytes) {
    this.set("questionId", Value.fromBytes(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get creator(): Bytes {
    let value = this.get("creator");
    return value!.toBytes();
  }

  set creator(value: Bytes) {
    this.set("creator", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get createdAt(): i32 {
    let value = this.get("createdAt");
    return value!.toI32();
  }

  set createdAt(value: i32) {
    this.set("createdAt", Value.fromI32(value));
  }
}

export class QuestionValueClaimed extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("questionId", Value.fromBytes(Bytes.empty()));
    this.set("createdBy", Value.fromBytes(Bytes.empty()));
    this.set("valueClaimed", Value.fromBigInt(BigInt.zero()));
    this.set("createdAt", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save QuestionValueClaimed entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type QuestionValueClaimed must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("QuestionValueClaimed", id.toString(), this);
    }
  }

  static load(id: string): QuestionValueClaimed | null {
    return changetype<QuestionValueClaimed | null>(
      store.get("QuestionValueClaimed", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get questionId(): Bytes {
    let value = this.get("questionId");
    return value!.toBytes();
  }

  set questionId(value: Bytes) {
    this.set("questionId", Value.fromBytes(value));
  }

  get createdBy(): Bytes {
    let value = this.get("createdBy");
    return value!.toBytes();
  }

  set createdBy(value: Bytes) {
    this.set("createdBy", Value.fromBytes(value));
  }

  get valueClaimed(): BigInt {
    let value = this.get("valueClaimed");
    return value!.toBigInt();
  }

  set valueClaimed(value: BigInt) {
    this.set("valueClaimed", Value.fromBigInt(value));
  }

  get createdAt(): i32 {
    let value = this.get("createdAt");
    return value!.toI32();
  }

  set createdAt(value: i32) {
    this.set("createdAt", Value.fromI32(value));
  }
}

export class TipCreated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("questionId", Value.fromBytes(Bytes.empty()));
    this.set("tipId", Value.fromBytes(Bytes.empty()));
    this.set("createdBy", Value.fromBytes(Bytes.empty()));
    this.set("value", Value.fromBigInt(BigInt.zero()));
    this.set("createdAt", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TipCreated entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TipCreated must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TipCreated", id.toString(), this);
    }
  }

  static load(id: string): TipCreated | null {
    return changetype<TipCreated | null>(store.get("TipCreated", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get questionId(): Bytes {
    let value = this.get("questionId");
    return value!.toBytes();
  }

  set questionId(value: Bytes) {
    this.set("questionId", Value.fromBytes(value));
  }

  get tipId(): Bytes {
    let value = this.get("tipId");
    return value!.toBytes();
  }

  set tipId(value: Bytes) {
    this.set("tipId", Value.fromBytes(value));
  }

  get createdBy(): Bytes {
    let value = this.get("createdBy");
    return value!.toBytes();
  }

  set createdBy(value: Bytes) {
    this.set("createdBy", Value.fromBytes(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get claimed(): boolean {
    let value = this.get("claimed");
    return value!.toBoolean();
  }

  set claimed(value: boolean) {
    this.set("claimed", Value.fromBoolean(value));
  }

  get createdAt(): i32 {
    let value = this.get("createdAt");
    return value!.toI32();
  }

  set createdAt(value: i32) {
    this.set("createdAt", Value.fromI32(value));
  }
}

export class TipValueClaimed extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("questionId", Value.fromBytes(Bytes.empty()));
    this.set("tipId", Value.fromBytes(Bytes.empty()));
    this.set("createdBy", Value.fromBytes(Bytes.empty()));
    this.set("value", Value.fromBigInt(BigInt.zero()));
    this.set("createdAt", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TipValueClaimed entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TipValueClaimed must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TipValueClaimed", id.toString(), this);
    }
  }

  static load(id: string): TipValueClaimed | null {
    return changetype<TipValueClaimed | null>(store.get("TipValueClaimed", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get questionId(): Bytes {
    let value = this.get("questionId");
    return value!.toBytes();
  }

  set questionId(value: Bytes) {
    this.set("questionId", Value.fromBytes(value));
  }

  get tipId(): Bytes {
    let value = this.get("tipId");
    return value!.toBytes();
  }

  set tipId(value: Bytes) {
    this.set("tipId", Value.fromBytes(value));
  }

  get createdBy(): Bytes {
    let value = this.get("createdBy");
    return value!.toBytes();
  }

  set createdBy(value: Bytes) {
    this.set("createdBy", Value.fromBytes(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get createdAt(): i32 {
    let value = this.get("createdAt");
    return value!.toI32();
  }

  set createdAt(value: i32) {
    this.set("createdAt", Value.fromI32(value));
  }
}

export class AmountReceived extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("sender", Value.fromBytes(Bytes.empty()));
    this.set("value", Value.fromBigInt(BigInt.zero()));
    this.set("createdAt", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AmountReceived entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type AmountReceived must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("AmountReceived", id.toString(), this);
    }
  }

  static load(id: string): AmountReceived | null {
    return changetype<AmountReceived | null>(store.get("AmountReceived", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value!.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get createdAt(): i32 {
    let value = this.get("createdAt");
    return value!.toI32();
  }

  set createdAt(value: i32) {
    this.set("createdAt", Value.fromI32(value));
  }
}
