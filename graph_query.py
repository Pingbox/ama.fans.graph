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

def questions_created(createdBy=None, recipient=None, answered=None, claimed=None, skip=0, limit=10):
    # The Graph query - Query aave for a list of the last 10 flash loans by time stamp
    query = f"""
         {{
             questionCreatedEntities(createdBy: "{createdBy}", 
                                    recipient: "{recipient}",
                                    answered: "{answered}",
                                    claimed: "{claimed}",
                                    offset: {skip},
                                    first: {limit}, 
                                    orderBy: createdAt, 
                                    orderDirection: desc){{
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
             }}
         }}
    """

    result = run_query(query)
    return result







def questions_answered():
    query = """
        {
            questionAnsweredEntities(first: 10, orderBy: createdAt, orderDirection: desc){
                questionId
                owner
                creator
                tokenId
                answerLink
                value
                createdAt            
            }
        }
        """
    result = run_query(query)
    print('Print Result - {}'.format(result))
    print('#############')
    # pretty print the results to make it easier to read
    pprint(result)
    

def questions_claimed():
    query = """
        {
            questionValueClaimedEntities(first: 10, orderBy: createdAt, orderDirection: desc){
                id
                questionId
                createdBy
                value
                createdAt            
            }
        }
        """
    result = run_query(query)
    print('Print Result - {}'.format(result))
    print('#############')
    # pretty print the results to make it easier to read
    pprint(result)
    

def tips_created():
    query = """
        {
            tipCreatedEntities(first: 10, orderBy: createdAt, orderDirection: desc){
                id
                questionId
                tipId
                createdBy
                value
                claimed
                createdAt            
            }
        }
        """
    result = run_query(query)
    print('Print Result - {}'.format(result))
    print('#############')
    # pretty print the results to make it easier to read
    pprint(result)

def tips_claimed():
    query = """
        {
            tipValueClaimedEntities(first: 10, orderBy: createdAt, orderDirection: desc){
                id
                questionId
                tipId
                createdBy
                value
                createdAt            
            }
        }
        """
    result = run_query(query)
    print('Print Result - {}'.format(result))
    print('#############')
    # pretty print the results to make it easier to read
    pprint(result)

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
    print('Print Result - {}'.format(result))
    print('#############')
    # pretty print the results to make it easier to read
    pprint(result)


def blocked():
    query = """
        {
            blockedEntities(first: 10, orderBy: createdAt, orderDirection: desc){
                id
                sender
                receiver
                createdAt            }
        }
        """
    result = run_query(query)
    print('Print Result - {}'.format(result))
    print('#############')
    # pretty print the results to make it easier to read
    pprint(result)
