const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners()
  const domainContractFactory = await hre.ethers.getContractFactory('Domains')
  const domainContract = await domainContractFactory.deploy('geek')
  await domainContract.deployed()

  console.log('Contract owner:', owner.address)

  // Let's be extra generous with our payment (we're paying more than required)
  let txn = await domainContract.register('a16z', {
    value: hre.ethers.utils.parseEther('1234'),
  })
  await txn.wait()

  let names = await domainContract.getAllNames()

  console.log('Names:', names)

  txn = await domainContract.register('a16z', {
    value: hre.ethers.utils.parseEther('1234'),
  })
  await txn.wait()
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
