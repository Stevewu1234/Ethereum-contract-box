## A learning record of contract and etherjs interaction.

***It's my pleasure if this repo can help anyone who is planning to step into ethereum dApp development.***

### contract sign messageHash generation and signature verify

the keys you need to notify when you generate a offchain signature:

1. check signing message and hashed message
- use ethers.utils._TypedDataEncoder to encode signing typed message(equal to abi.encodePacked()).
- use ethers.utils.keccak256() to hash encoded message.(equal to keccak256(abi.encodePacked())).
- use ethers.utils.AbiCoder to encode simple message(equal to abi.encode()).

2. sign typed data directly
- utilize the signer._signTypedData() to sign typedData directly.
- utilize the signer.signMessage() to sign simple message.

3. generate three type of signature(based on ECDSA.sol)
- type1: bytesLik signature
- type2: r, s, v signature
- type3: r, vs signature


