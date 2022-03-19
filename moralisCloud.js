/*global Moralis */
/*
A unregistered user (who hasnt done twutter verification) can send a question to a 
twitterId.
Which implies that a twitterId can receive lots of questions without even being present on the 
platform.
This same user can send questions to oither twitterIds.
So Bascially, The consolidation of reputation only happens when a user would do a twitter verification.
At this verification a domainRegistered event will be emitted and a new entry will be created in AmaUser tcollection.
On this event emission, all the questionsReceived on the twitterId and the sum of values must be added to this identity.
All the questions sent by this address should be added to the AmaUser collection 
and all the tips must also be consolidated at this event emission.
*/

Moralis.settings.setAPIRateLimit({
  anonymous: 20,
  authenticated: 20,
  windowMs: 60000,
})
const logger = Moralis.Cloud.getLogger()

const toBN = async (e) => {
  const web3 = await Moralis.web3ByChain('0x1')
  return web3.utils.toBN(e + '')
}

const addWei = (weiArray = []) => {
  // eg ['4553535353535', '20000000000', '50000']
  const add = (a, b) => {
    const amount = toBN(a)

    const amountToAdd = b ? toBN(b) : false

    if (amountToAdd) {
      return amount.add(amountToAdd).toString()
      // return wei string value
    }
    // return wei string value
    return amount.toString()
  }
  const sumInWei = weiArray.reduce((acc, v, i) => {
    if (!acc) return v
    return add(acc, v)
  }, '')

  return sumInWei
}

const addSavedFlag = async (request, tableName) => {
  let db = Moralis.Object.extend(tableName)
  let query = new Moralis.Query(db)
  let transaction_hash = request.object.get('transaction_hash')
  query.equalTo('transaction_hash', transaction_hash)
  let row = await query.first()
  row.set('isAlreadyCreated', true)
  row.save().then(
    () => {
      logger.info(`${tableName} ${transaction_hash} savedFlag added `)
    },
    (error) => {
      logger.info(
        `${tableName} ${transaction_hash} savedFlag update error ` +
          error.message
      )
    }
  )
}

const checkAlreadySaved = async (request, tableName) => {
  //  use this function ONLY in afterSave trigger
  let db = Moralis.Object.extend(tableName)
  let query = new Moralis.Query(db)
  let transaction_hash = request.object.get('transaction_hash')
  query.equalTo('transaction_hash', transaction_hash)
  let row = await query.first()

  const isAlreadyCreated = row.get('isAlreadyCreated')
  if (isAlreadyCreated) {
    logger.info(`tx ${transaction_hash} in table ${tableName} is already saved`)
  } else {
    logger.info(
      `tx ${transaction_hash} in table ${tableName} has not been saved initially`
    )
  }
  return isAlreadyCreated
}

//   //SocialID is present in the AmaUser collection
//   const amaUserSocialIdPresent = async (request) => {
//     let User = Moralis.Object.extend('AmaUser')
//     let query = new Moralis.Query(User)
//     query.equalTo('twitterId', request.object.get('socialId').toString())
//     let user = await query.first()
//     if (user == undefined) {
//       return false
//     } //User is not present
//     return user //User is present
//   }

//If address is present in the AmaUser collection.
//Key is the string which has the address, ex createdBy, useraddress, creator
const amaUserAddressPresent = async (request, _key) => {
  let User = Moralis.Object.extend('AmaUser')
  let query = new Moralis.Query(User)
  query.equalTo('address', request.object.get(_key).toString())
  let user = await query.first()
  if (user == undefined) {
    return false
  } //User is not present
  return user //User is present
}

const newAmaUserQuestionSent = async (request) => {
  let User = Moralis.Object.extend('AmaUser')
  let user = new User()
  const initKeys = {
      answersMade: 0,
      valueReceivedOnAnswers: 0,
      madeBlock: 0,
      receivedBlock: 0,
      questionSent: 0,
      questionsReceived: 0,
      valueSpentOnQuestions: 0,
      valueReceivedOnQuestions: 0,
      valueSpentOnTip: 0,
      questionsClaimedBack: 0,
      questionsValueClaimedBack: 0,
      tipsValueClaimedBack: 0,
      tipsClaimedBack: 0,
      valueSpentOnAnswers: 0,
      tips: 0,
    }

  Object.keys(initKeys).forEach((key) => user.set(key, initKeys[key]))
  user.set('address', request.object.get('createdBy'))
  user.set('questionsSent', 1)

  user.set('valueSpentOnQuestions', parseInt(request.object.get('value')))
  await user.save().then(
    (user) => {
      logger.info('newAmaUserQuestionSent: User created')
    },
    (error) => {
      logger.info(
        'newAmaUserQuestionSent: Failed to create new user ' + error.message
      )
    }
  )
}


const newAmaUserQuestionReceived = async (request) => {
  let User = Moralis.Object.extend('AmaUser')
  let user = new User()
  const initKeys = {
      answersMade: 0,
      valueReceivedOnAnswers: 0,
      madeBlock: 0,
      receivedBlock: 0,
      questionSent: 0,
      questionsReceived: 0,
      valueSpentOnQuestions: 0,
      valueReceivedOnQuestions: 0,
      valueSpentOnTip: 0,
      questionsClaimedBack: 0,
      questionsValueClaimedBack: 0,
      tipsValueClaimedBack: 0,
      tipsClaimedBack: 0,
      valueSpentOnAnswers: 0,
      tips: 0,
  }

  Object.keys(initKeys).forEach((key) => user.set(key, initKeys[key]))
  user.set('address', request.object.get('recipient'))
  user.set('questionsReceived', 1)


  user.set('valueReceivedOnQuestions', parseInt(request.object.get('value')))
  await user.save().then(
    (user) => {
      logger.info('newAmaUserQuestionReceived: User created')
    },
    (error) => {
      logger.info(
        'newAmaUserQuestionReceived: Failed to create new user ' + error.message
      )
    }
  )
}



const updateAmaUserQuestionSent = async (user, request) => {
  user.increment('questionsSent')
  //let Value = addWei([user.get('valueSpentOnQuestions'), request.object.get("value")])
  // let Value =
  //   parseInt(user.get('valueSpentOnQuestions')) +
  //   parseInt(request.object.get('value'))

    let value = 
      parseInt(user.get('valueSpentOnQuestions')) +
      parseInt(request.object.get('value'))


  user.set('valueSpentOnQuestions', value)
  user.save().then(
    (session) => {
      logger.info('updateAmaUserQuestionSent: User updated')
    },
    (error) => {
      logger.info(
        'updateAmaUserQuestionSent: Failed to update ' + error.message
      )
    }
  )
}



//Update the user in AmaUser when he receives a question
const updateAmaUserQuestionReceived = async (user, request) => {
  user.increment('questionsReceived')
  // let value =
  //   parseInt(user.get('valueReceivedOnQuestions')) +
  //   parseInt(request.object.get('value'))



    let value = 
      parseInt(user.get('valueReceivedOnQuestions')) +
      parseInt(request.object.get('value'))


  user.set('valueReceivedOnQuestions', value)
  user.save().then(
    (session) => {
      logger.info('updateAmaUserQuestionReceived: User updated')
    },
    (error) => {
      logger.info(
        'updateAmaUserQuestionReceived: Failed to update user ' + error.message
      )
    }
  )
}

///*************************************| QUESTION CREATED  |***********************************************/

Moralis.Cloud.afterSave('QuestionCreated', async function (request) {
  let confirmed = request.object.get('confirmed')
  let tableName = 'QuestionCreated'
  if (confirmed) {
    const alreadyCreated = await checkAlreadySaved(request, tableName)
    if (alreadyCreated) {
      return
    }
    logger.info('New Question created request incoming')
    await addSavedFlag(request, tableName)
    let amaUser = await amaUserAddressPresent(request, 'createdBy')

    if (amaUser) {
      logger.info('Question sender AmaUser found')
      updateAmaUserQuestionSent(amaUser, request)
    } else {
      logger.info('Question sender AmaUser not found')
      newAmaUserQuestionSent(request)
    }

    //FOr the recipient we nly have the socialId
    let recipient = await amaUserAddressPresent(request, 'recipient')

    if (recipient) {
      logger.info('Question recipient AmaUser found')
      updateAmaUserQuestionReceived(recipient, request)
    } else {
      //to check whether the user is already present in the UnconfirmedUser collection
      //or not
      logger.info('Question recipient AmaUser not found')
      newAmaUserQuestionReceived(request)

    }
  }
})

///****************************************************************************************************/
///*******************************| Domain REGISTERED  |***********************************************/


Moralis.Cloud.afterSave('DomainRegistered', async function (request) {
  let confirmed = request.object.get('confirmed')

  if (confirmed) {
    let User = Moralis.Object.extend('AmaUser')
    let amaUser = await amaUserAddressPresent(request, 'useraddress')

    amaUser.set('twitterUsername', request.object.get('twitterUsername'))
    amaUser.set('twitterId', request.object.get('twitterId'))
    amaUser.set('nodehash', request.object.get('nodehash'))
    amaUser.set('createdAt', request.object.get('createdAt'))


    amaUser.save().then(
      (user) => {
        logger.info(
          'User created on new domain registration' +
            user.id +
            request.object.get('twitterUsername')
        )
      },
      (error) => {
        logger.info(
          'Failed to create new user:' +
            error.message +
            request.object.get('twitterUsername')
        )
      }
    )


  }
})

//****************************************************************************** */
//*****************************************************Blocked ***************** */
Moralis.Cloud.afterSave('Blocked', async function (request) {
  let confirmed = request.object.get('confirmed')
  if (confirmed) {
    // Add
    let User = Moralis.Object.extend('AmaUser')
    let query = new Moralis.Query(User)
    query.equalTo('address', request.object.get('blocker'))
    let user = await query.first()
    user.increment('madeBlock')
    user.save()

    User = Moralis.Object.extend('AmaUser')
    query = new Moralis.Query(User)
    query.equalTo('address', request.object.get('blocked'))
    user = await query.first()

    user.increment('receivedBlock')
    user.save()
  }
})
/******************************************************************************** */

const findQuestion = async (request) => {
  let Question = Moralis.Object.extend('QuestionCreated')
  let query = new Moralis.Query(Question)
  query.equalTo('questionId', request.object.get('questionId'))
  let question = await query.first()
  return question
}

///*************************************| QUESTION ANSWERED  |*****************************************************/
const updateCreatorOnQuestionAnswered = async (request) => {
  let user = await amaUserAddressPresent(request, 'creator')
  user.increment('answersMade')

  if (!user.get('valueReceivedOnAnswers')) {
    user.set('valueReceivedOnAnswers', parseInt(request.object.get('value')))
  } else {

      // let value = addWei([
      //     user.get('valueReceivedOnAnswers'),
      //     request.object.get('value'),
      //   ])
      let value = 
      parseInt(user.get('valueReceivedOnAnswers')) +
      parseInt(request.object.get('value'))



    user.set('valueReceivedOnAnswers', value)
  }
  user.save().then(
    (session) => {
      logger.info(
        'updateCreatorOnQuestionAnswered user[creator] updated:' + user.id
      )
    },
    (error) => {
      logger.info(
        'updateCreatorOnQuestionAnswered user[creator] update error:' +
          error.message
      )
    }
  )
}

const updateQuestionOnAnswer = async (request) => {
  let question = await findQuestion(request)

  question.set('answered', true)
  question.save().then(
    (question) => {
      logger.info('updateQuestionOnAnswer: Question updated', question.answered)
    },
    (error) => {
      logger.info(
        'updateQuestionOnAnswer question update error' + error.message
      )
    }
  )
}


const updateReceiverOnQuestionAnswered = async (request) => {
  let user = await amaUserAddressPresent(request, 'owner')

  user.increment('answersReceived')
  if (!user.get('valueSpentOnAnswers')) {
    user.set('valueSpentOnAnswers', request.object.get('value'))
  } else {
  //   let value = addWei([
  //     user.get('valueSpentOnAnswers'),
  //     request.object.get('value'),
  //   ])

    let value = 
    parseInt(user.get('valueSpentOnAnswers')) +
    parseInt(request.object.get('value'))
    
    user.set('valueSpentOnAnswers', value)
  }
  user.save().then(
    (session) => {
      logger.info('updateReceiverOnQuestionAnswered user updated:')
    },
    (error) => {
      logger.info(
        'updateReceiverOnQuestionAnswered user failed user update' +
          error.message
      )
    }
  )
}

Moralis.Cloud.afterSave('QuestionAnswered', async function (request) {
  let confirmed = request.object.get('confirmed')
  if (confirmed) {
    await updateQuestionOnAnswer(request)
    await updateCreatorOnQuestionAnswered(request)
    await updateReceiverOnQuestionAnswered(request)

  }
})

/******************************************************************************************************************/

///*************************************| QUESTION VALUE CLAIMED  |***********************************************/

//When the user claimed back the question and is present in the AmaUser collection
const updateAmaUserQuestionClaimed = async (user, request) => {
  user.increment('questionsClaimedBack')
  if (!user.get('questionsValueClaimedBack')) {
    user.set('questionsValueClaimedBack', parseInt(request.object.get('value')))
  } else {
      // let value = addWei([
      //     user.get('questionsValueClaimedBack'),
      //     request.object.get('valueClaimed'),
      //   ])

      let value = 
      parseInt(user.get('questionsValueClaimedBack')) +
      parseInt(request.object.get('value'))

    user.set('questionsValueClaimedBack', value)
  }
  user.save().then(
    (session) => {
      logger.info('updateAmaUserQuestionClaimed user updated')
    },
    (error) => {
      logger.info(
        'updateAmaUserQuestionClaimed user update error' + error.message
      )
    }
  )
}


Moralis.Cloud.afterSave('QuestionValueClaimed', async function (request) {
  let confirmed = request.object.get('confirmed')
  if (confirmed) {
    // Adding claimed flag to the querstionId
    let question = await findQuestion(request)
    question.set('claimed', true)
    question.save().then(
      (question) => {
        logger.info('QuestionValueClaimed question updated ' + question.id)
      },
      (error) => {
        logger.info(
          'QuestionValueClaimed question update error ' + error.message
        )
      }
    )

    // Increamenting user questionsClaimedBack value
  let user = await amaUserAddressPresent(request, 'createdBy')
  updateAmaUserQuestionClaimed(user, request)
   
  }
})

/*******************************************************************************************************/

///*************************************| TIP CREATED  |***********************************************/
const updateQuestionOnTip = async (request) => {
  let Question = Moralis.Object.extend('QuestionCreated')
  let query = new Moralis.Query(Question)
  query.equalTo('questionId', request.object.get('questionId'))
  let question = await query.first()
  if (question.get('tips')) {
    question.increment('tips')
  } else {
    question.set('tips', 1)
  }

  if (question.get('tipsTotalValue')) {
    logger.info('tipsTotal value found ' + question.get('tipsTotalValue'))

      // let value = addWei([
      //     question.get('tipsTotalValue'),
      //     request.object.get('value'),
      //   ])

  
  let value = 
      parseInt(question.get('tipsTotalValue')) +
      parseInt(request.object.get('value'))



    question.set('tipsTotalValue', value)
  } else {
    logger.info('tipsTotal value not found ' + question.get('tipsTotalValue'))
    question.set('tipsTotalValue', parseInt(request.object.get('value')))
  }

  logger.info('About to save this question')
  question.save().then(
    (question) => {
      logger.info('TipCreated question updated' + question.id)
    },
    (error) => {
      logger.info('TipCreated question update error' + error.message)
    }
  )
}

const amaUserTipCreated = async (user, request) => {
  user.increment('tips')
  if (!user.get('valueSpentOnTip')) {
    user.set('valueSpentOnTip', parseInt(request.object.get('value')))
  } else {


  let value =
      parseInt(user.get('valueSpentOnTip')) +
      parseInt(request.object.get('value'))

    user.set('valueSpentOnTip', value)
  }
  user.save().then(
    (session) => {
      logger.info('amaUserTipCreated: TipCreated user updated')
    },
    (error) => {
      logger.info(
        'amaUserTipCreated: TipCreated user update error' + error.message
      )
    }
  )
}



const newUserTipCreated = async (request) => {
  let User = Moralis.Object.extend('AmaUser')
  let user = new User()
  const initKeys = {
      answersMade: 0,
      valueReceivedOnAnswers: 0,
      madeBlock: 0,
      receivedBlock: 0,
      questionSent: 0,
      questionsReceived: 0,
      valueSpentOnQuestions: 0,
      valueReceivedOnQuestions: 0,
      valueSpentOnTip: 0,
      questionsClaimedBack: 0,
      questionsValueClaimedBack: 0,
      tipsValueClaimedBack: 0,
      tipsClaimedBack: 0,
      valueSpentOnAnswers: 0,
      tips: 0,
    }

  Object.keys(initKeys).forEach((key) => user.set(key, initKeys[key]))
  user.set('address', request.object.get('createdBy'))
  user.set('tips', 1)
  if (request.object.get('value')) {
    user.set('valueSpentOnTip', parseInt(request.object.get('value')))
  } 
  user.save().then(
      (session) => {
        logger.info('newUserTipCreated: New user created on Tip')
      },
      (error) => {
        logger.info(
          'newUserTipCreated: New user creation failed' + error.message
        )
      }
    )  }

// This is somehow causing a bug, When claimed is being actually called when the the tip is being claimed
// This false remained false and didnt changed to true
// Moralis.Cloud.beforeSave("TipCreated", async function(request) {
//     request.object.set("claimed", false);
//     logger.info("Adding fields to the tip beforeSaving to the class")
// })

Moralis.Cloud.afterSave('TipCreated', async function (request) {
  let confirmed = request.object.get('confirmed')
  const tableName = 'TipCreated'
  if (confirmed) {
    // Increamenting question tips with this tip,
    // No need to check because question must be present in QuestionCreated collection
    // fot tip to be created

    const alreadyCreated = await checkAlreadySaved(request, tableName)
    if (alreadyCreated) {
      return
    }
    await addSavedFlag(request, tableName)

    updateQuestionOnTip(request)

    let user = await amaUserAddressPresent(request, 'createdBy')
    if (user){
  
      amaUserTipCreated(user, request) //Update the user who is already present in the AmaUser collection
    } else {
      //to check whether the user is already present in the UnconfirmedTips collection
      //or not, We are keeping the records seperate for UnconfirmedTips and UncofirmedTips

      newUserTipCreated(request)
    }
  }
})

/*******************************************************************************************************/

///*************************************| TIP VALUE CLAIMED  |***********************************************/

//When the user claimed back the question and is present in the AmaUser collection
const amaUserTipClaimed = async (user, request) => {
  user.increment('tipsClaimedBack')
  if (!user.get('tipsValueClaimedBack')) {
    user.set('tipsValueClaimedBack', parseInt(request.object.get('value')))
  } else {
      let value =
          parseInt(user.get('tipsValueClaimedBack')) +
          parseInt(request.object.get('value'))

    user.set('tipsValueClaimedBack', value)
  }
  user.save().then(
    (session) => {
      logger.info('amaUserTipClaimed user updated')
    },
    (error) => {
      logger.info('amaUserTipClaimed user update error' + error.message)
    }
  )
}



Moralis.Cloud.afterSave('TipValueClaimed', async function (request) {
  let confirmed = request.object.get('confirmed')
  if (confirmed) {
    let Tip = Moralis.Object.extend('TipCreated')
    let query = new Moralis.Query(Tip)
    query.equalTo('tipId', request.object.get('tipId'))
    let tip = await query.first()
    tip.set('claimed', true)

    tip.save().then(
      (tip) => {
        logger.info('TipValueClaimed tip updated' + tip.id)
      },
      (error) => {
        logger.info('TipValueClaimed tip updated error' + error.message)
      }
    )

    let user = await amaUserAddressPresent(request, 'createdBy')
      //User is present in the amaUser collection
      amaUserTipClaimed(request)
  }
})

/*******************************************************************************************************/
