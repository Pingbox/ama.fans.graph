import requests
# pretty print is used to print the output in the console in an easy to read format
from pprint import pprint

"""
ExampleEntity
AmaUserEntity : amaUserEntities
DomainRegisteredEntity
RequestErroredEntity
RequestFulfilledEntity
QuestionCreatedEntity: questionCreatedEntities
QuestionAnsweredEntity
QuestionValueClaimedEntity
TipCreatedEntity
TipValueClaimedEntity
AmountReceivedEntity
BlockedEntity
"""


# function to use requests.post to make an API call to the subgraph url
def run_query(query):

    # endpoint where you are making the request
    request = requests.post('https://api.thegraph.com/subgraphs/name/graphicaldot/moonbasealpha'
                            '',
                            json={'query': query})
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception('Query failed. return code is {}.      {}'.format(request.status_code, query))


def ama_user(address):
    query = f"""
        {{    
            amaUserEntity (id: "{address}"){{
                questionsCreated
                tipsCreated
                blockuserCreated
                answersCreated
                questionsReceived
                answersReceived
                blockUserReceived
                valueSpentOnQuestions
                valueSpentOnTips
                valueReceivedOnQuestions
                valueReceivedOnAnswers
                valueReceivedOnTips
                questionsClaimedBack
                tipsClaimedBack
                questionsValueClaimedBack
                tipsValueClaimedBack
                madeBlock
                receivedBlock
                address
                twitterId
                createdAt
                twitterUsername
            }}
        }}
    """
    result = run_query(query)
    print('Print Result - {}'.format(result))
    print('#############')
    # pretty print the results to make it easier to read
    pprint(result)


def ama_users():
    query = """
        {    
            amaUserEntities(first: 10, orderBy: createdAt, orderDirection: desc){
                questionsCreated
                tipsCreated
                blockuserCreated
                answersCreated
                questionsReceived
                answersReceived
                blockUserReceived
                valueSpentOnQuestions
                valueSpentOnTips
                valueReceivedOnQuestions
                valueReceivedOnAnswers
                valueReceivedOnTips
                questionsClaimedBack
                tipsClaimedBack
                questionsValueClaimedBack
                tipsValueClaimedBack
                madeBlock
                receivedBlock
                address
                twitterId
                createdAt
                twitterUsername
            }
        }
    """
    result = run_query(query)
    return result

def questions_created(createdBy=None, recipient=None, answered=False, claimed=False, skip=0, limit=10):
    # The Graph query - Query aave for a list of the last 10 flash loans by time stamp
    where = ""
    if createdBy:
        where += "createdBy" + " : " + '"' + createdBy + '"' + " , "
    if recipient:
        where += "recipient" + " : " + '"' + recipient +  '"' + " , "
    if answered:
        where += "answered" + " : " + "true" + " , "
    if claimed:
        where += "claimed" + " : " + "true" + " , "
    
    query = """
         {
             questionCreatedEntities(where: {%s},
                                    skip: %s,
                                    first: %s, 
                                    orderBy: createdAt, 
                                    orderDirection: desc){
                 recipient
                 questionId
                 createdBy
                 value
                 expiryTime
                 link
                 answered
                 claimed
                 createdAt
                 tips
                 tipsTotalValue
             }
         }
    """%(where, skip, limit)
    print (query)
    result = run_query(query)
    return result







def questions_answered(owner=None, creator=None, skip=0, limit=10):
    where = ""
    if owner:
        where += "owner" + " : " + '"' + owner + '"' + " , "
    if creator:
        where += "creator" + " : " + '"' + creator +  '"' + " , "
    query = """
        {
            questionAnsweredEntities(where: {%s},
                                    skip: %s,
                                    first: %s, 
                                    orderBy: createdAt, 
                                    orderDirection: desc){
                questionId
                owner
                creator
                tokenId
                answerLink
                value
                createdAt            
            }
        }
    """%(where, skip, limit)
    result = run_query(query)
    return result   

def questions_claimed(createdBy=None, skip=0, limit=10):
    where = ""
    if createdBy:
        where += "createdBy" + " : " + '"' + createdBy + '"' + " , "


    query = """
        {
            questionValueClaimedEntities(where: {%s},
                                    skip: %s,
                                    first: %s, 
                                    orderBy: createdAt, 
                                    orderDirection: desc){
                id
                questionId
                createdBy
                value
                createdAt            
            }
        }
    """%(where, skip, limit)
    result = run_query(query)
    return result    

def tips_created(questionId=None, createdBy=None, claimed=False, skip=0, limit=10):
    where = ""
    if questionId:
        where += "questionId" + " : " + '"' + questionId + '"' + " , "
    if createdBy:
        where += "createdBy" + " : " + '"' + createdBy +  '"' + " , "
    if claimed:
        where += "claimed" + " : " + "true" + " , "


    query = """
        {
            tipCreatedEntities(where: {%s},
                                    skip: %s,
                                    first: %s, 
                                    orderBy: createdAt, 
                                    orderDirection: desc){
                id
                questionId
                tipId
                createdBy
                value
                claimed
                createdAt            
            }
        }
    """%(where, skip, limit)
    result = run_query(query)
    return result

def tips_claimed(questionId=None, createdBy=None, skip=0, limit=10):
    where = ""
    if createdBy:
        where += "createdBy" + " : " + '"' + createdBy + '"' + " , "
    if questionId:
        where += "questionId" + " : " + '"' + questionId + '"' + " , "


    query = """
        {
            tipValueClaimedEntities(where: {%s},
                                    skip: %s,
                                    first: %s, 
                                    orderBy: createdAt, 
                                    orderDirection: desc){
                id
                questionId
                tipId
                createdBy
                value
                createdAt            
            }
        }
    """%(where, skip, limit)
    result = run_query(query)
    return result

def amount_received():
    query = """
        {
            amountReceivedEntities(first: 10, orderBy: createdAt, orderDirection: desc){
                id
                sender
                value
                createdAt           
            }
        }
        """
    result = run_query(query)
    return result


def blocked(sender=None, receiver=None, skip=0, limit=10):
    where= ""
    if sender:
        where += "sender" + " : " + '"' + sender + '"' + " , "
    if receiver:
        where += "receiver" + " : " + '"' + receiver + '"' + " , "

    query = """
        {
            blockedEntities(where: {%s},
                                    skip: %s,
                                    first: %s, 
                                    orderBy: createdAt, 
                                    orderDirection: desc){
                id
                sender
                receiver
                createdAt }
        }
    """%(where, skip, limit)
    result = run_query(query)
    return result
