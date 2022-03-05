const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains')
  const domainContract = await domainContractFactory.deploy('geek')
  await domainContract.deployed()

  console.log('Contract deployed to:', domainContract.address)

  let txn = await domainContract.register('hoang', {
    value: hre.ethers.utils.parseEther('0.001'),
  })
  await txn.wait()
  console.log('Minted domain hoang.geek')

  txn = await domainContract.setRecord('hoang', 'https://hoangtrinhj.com')
  await txn.wait()
  console.log('Set record for hoang.geek')

  const address = await domainContract.getAddress('hoang')
  console.log('Owner of domain hoang:', address)

  const balance = await hre.ethers.provider.getBalance(domainContract.address)
  console.log('Contract balance:', hre.ethers.utils.formatEther(balance))
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
