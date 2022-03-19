


- #### DomainRegistered(address,bytes32,uint256,string,string)

```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"address",
         "name":"useraddress",
         "type":"address"
      },
      {
         "indexed":true,
         "internalType":"bytes32",
         "name":"nodehash",
         "type":"bytes32"
      },
      {
         "indexed":true,
         "internalType":"uint256",
         "name":"twitterId",
         "type":"uint256"
      },
      {
         "indexed":false,
         "internalType":"string",
         "name":"twitterUsername",
         "type":"string"
      },
      {
         "indexed":false,
         "internalType":"string",
         "name":"label",
         "type":"string"
      }
   ],
   "name":"DomainRegistered",
   "type":"event"
}
```

- #### RequestErrored(address,bytes)

```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"address",
         "name":"address",
         "type":"address"
      },
      {
         "indexed":false,
         "internalType":"bytes",
         "name":"data",
         "type":"bytes"
      }
   ],
   "name":"RequestErrored",
   "type":"event"
}
```

- #### RequestFulfilled(address,bytes)
```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"address",
         "name":"address",
         "type":"address"
      },
      {
         "indexed":false,
         "internalType":"bytes",
         "name":"data",
         "type":"bytes"
      }
   ],
   "name":"RequestFulfilled",
   "type":"event"
}
```





- #### OfferingPlaced(bytes32,address,uint256,address,uint256,string)
```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"bytes32",
         "name":"offeringId",
         "type":"bytes32"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"seller",
         "type":"address"
      },
      {
         "indexed":true,
         "internalType":"uint256",
         "name":"tokenId",
         "type":"uint256"
      },
      {
         "indexed":false,
         "internalType":"address",
         "name":"nftContract",
         "type":"address"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"price",
         "type":"uint256"
      },
      {
         "indexed":false,
         "internalType":"string",
         "name":"uri",
         "type":"string"
      }
   ],
   "name":"OfferingPlaced",
   "type":"event"
}
```


- #### OfferingClosed(bytes32,address,address,uint256,uint256)
```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"bytes32",
         "name":"offeringId",
         "type":"bytes32"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"buyer",
         "type":"address"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"nftCreator",
         "type":"address"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"price",
         "type":"uint256"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"royaltyAmount",
         "type":"uint256"
      }
   ],
   "name":"OfferingClosed",
   "type":"event"
}
```


- #### OfferingCancelled(bytes32,address)

```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"bytes32",
         "name":"offeringId",
         "type":"bytes32"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"seller",
         "type":"address"
      }
   ],
   "name":"OfferingCancelled",
   "type":"event"
}
```




- #### QuestionCreated(uint256,bytes32,address,uint256,uint256,string,uint256)

```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"uint256",
         "name":"socialId",
         "type":"uint256"
      },
      {
         "indexed":true,
         "internalType":"bytes32",
         "name":"questionId",
         "type":"bytes32"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"createdBy",
         "type":"address"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"value",
         "type":"uint256"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"timelimit",
         "type":"uint256"
      },
      {
         "indexed":false,
         "internalType":"string",
         "name":"link",
         "type":"string"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"socialNetworkId",
         "type":"uint256"
      }
   ],
   "name":"QuestionCreated",
   "type":"event"
}
```


- #### QuestionAnswered(bytes32,address,address,uint256,uint256)

```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"bytes32",
         "name":"questionId",
         "type":"bytes32"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"owner",
         "type":"address"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"creator",
         "type":"address"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"tokenId",
         "type":"uint256"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"value",
         "type":"uint256"
      }
   ],
   "name":"QuestionAnswered",
   "type":"event"
}
```



- #### QuestionValueClaimed(bytes32,address,uint256)
```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"bytes32",
         "name":"questionId",
         "type":"bytes32"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"createdBy",
         "type":"address"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"valueClaimed",
         "type":"uint256"
      }
   ],
   "name":"QuestionValueClaimed",
   "type":"event"
}
```

- #### TipCreated(bytes32,bytes32,address,uint256)
```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"bytes32",
         "name":"questionId",
         "type":"bytes32"
      },
      {
         "indexed":true,
         "internalType":"bytes32",
         "name":"tipId",
         "type":"bytes32"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"createdBy",
         "type":"address"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"value",
         "type":"uint256"
      }
   ],
   "name":"TipCreated",
   "type":"event"
}
```

- #### TipValueClaimed(bytes32,bytes32,address,uint256)
```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"bytes32",
         "name":"questionId",
         "type":"bytes32"
      },
      {
         "indexed":true,
         "internalType":"bytes32",
         "name":"tipId",
         "type":"bytes32"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"createdBy",
         "type":"address"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"value",
         "type":"uint256"
      }
   ],
   "name":"TipValueClaimed",
   "type":"event"
}
```


- #### Withdraw(receiver,value)
```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"address",
         "name":"receiver",
         "type":"address"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"value",
         "type":"uint256"
      }
   ],
   "name":"Withdraw",
   "type":"event"
}
```

- #### AmountReceived(address,uint256)
```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"address",
         "name":"sender",
         "type":"address"
      },
      {
         "indexed":false,
         "internalType":"uint256",
         "name":"value",
         "type":"uint256"
      }
   ],
   "name":"AmountReceived",
   "type":"event"
}
```


- ### NFT contracts:

- #### Transfer(address,address,uint256)
```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"address",
         "name":"from",
         "type":"address"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"to",
         "type":"address"
      },
      {
         "indexed":true,
         "internalType":"uint256",
         "name":"tokenId",
         "type":"uint256"
      }
   ],
   "name":"Transfer",
   "type":"event"
}
```


- #### Approval(address,address,uint256)
```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"address",
         "name":"owner",
         "type":"address"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"approved",
         "type":"address"
      },
      {
         "indexed":true,
         "internalType":"uint256",
         "name":"tokenId",
         "type":"uint256"
      }
   ],
   "name":"Approval",
   "type":"event"
}
```

- #### ApprovalForAll(adddress,address,bool)
```
{
   "anonymous":false,
   "inputs":[
      {
         "indexed":true,
         "internalType":"address",
         "name":"owner",
         "type":"address"
      },
      {
         "indexed":true,
         "internalType":"address",
         "name":"operator",
         "type":"address"
      },
      {
         "indexed":false,
         "internalType":"bool",
         "name":"approved",
         "type":"bool"
      }
   ],
   "name":"ApprovalForAll",
   "type":"event"
}
```
