const { expect } = require("chai");

describe("Demotokens", function () {

  before(async function () {
    Demotokens = await ethers.getContractFactory("Demotokens");
  })
  beforeEach(async function () {
    demotokens = await Demotokens.deploy("Demotokens", "DTK");
    await demotokens.deployed();
    //getting accounts
    accounts = await ethers.getSigners();
    owner = accounts[0].address;
    receiver = accounts[1].address;
    approved = accounts[2].address;
    approvedForAll = accounts[3].address;

    mintCount = 5;
    initialMint = [];
    for (let i = 0; i < mintCount; i++) {
      let tx = await demotokens.safeMint(owner, i.toString()); //calling mint function
      await tx.wait(); //waiting for transation to go thru
      initialMint.push(i.toString());
    }
  });

  it("1. Should return correct name and symbol", async function () {
    expect(await demotokens.name()).to.equal("Demotokens");
    expect(await demotokens.symbol()).to.equal("DTK");
  });

  it("2. Should initially transfer 5 tokens to owner", async function () {
    for (let i = 0; i < mintCount; i++) {
      expect(await demotokens.ownerOf(initialMint[i])).to.equal(owner);
    }
  });

  it("3. Should approve 'approved' address when called by token owner (token id = 0). ", async function () {
    await demotokens.approve(approved, '0');
    expect(await demotokens.getApproved('0')).to.equal(approved);
  });

  it("4. Should approve address 'approvedForAll' when called by token owner (token id = 1). ", async function () {
    await demotokens.setApprovalForAll(approvedForAll, true);
    expect(await demotokens.isApprovedForAll(owner, approvedForAll)).to.equal(true);
  });

  it("5. Only owner is allowed to mint tokens", async function () {
    await expect(demotokens.connect(accounts[1]).safeMint(receiver, '100')).to.be.reverted;
  })

  it("6. Using balance of function to check owner's balance", async function () {
    expect(await demotokens.balanceOf(owner)).to.equal(initialMint.length);
  });

  it('7. Emits a transfer event for newly minted NFTs', async function () {
    await expect(demotokens.safeMint(owner, '5')) //minting new token with id = 5 ( minted until now : 0..4)
    .to.emit(demotokens, "Transfer")
    .withArgs("0x0000000000000000000000000000000000000000", owner, '5'); //NFTs are minted from zero address
  });

  it('8. Is able to transfer NFTs to another wallet when called by owner', async function () {
    let tokenId = initialMint[0].toString();
    await demotokens["safeTransferFrom(address,address,uint256)"](owner, receiver, tokenId);
    expect(await demotokens.ownerOf(tokenId)).to.equal(receiver);
  });

  it('9. Emits a Transfer event when transferring a NFT', async function () {
    let tokenId = initialMint[0].toString();
    await expect(demotokens["safeTransferFrom(address,address,uint256)"](owner, receiver, tokenId))
    .to.emit(demotokens, "Transfer")
    .withArgs(owner, receiver, tokenId);
  });
})