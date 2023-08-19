const{expect} = require("chai");


// describe("token contract",()=>{
//     //it block is used to create tests 
//     it("Deployment should assign total supply to deployer",async ()=>{
//         const [owner] = await ethers.getSigners();
//         console.log("signers",owner)

//         //getContractFactory helps us to create an instance of the contract
//         const Token = await ethers.getContractFactory("Token");

//         const hardhatToken = await Token.deploy()//deploying the instance

//         const ownerBalance = await hardhatToken.checkBalance(owner.address);
//         console.log("owner addr: ",owner.address)

//         //every public var in solidity has a bydefault getter function which is called below
//         expect(await hardhatToken.totalTokenCount()).to.equal(ownerBalance)//totaltokencount should be equal to owners balance

        
//     })

//     it("Should trasfer tokens accurately",async()=>{
//         const [owner,person1,person2] = await ethers.getSigners();
//         const Token = await ethers.getContractFactory("Token");
//         const hardhatToken = await Token.deploy();

//         await hardhatToken.sendTokens(person1.address,60);
        

//         expect(await hardhatToken.checkBalance(person1.address)).to.equal(60);
//         expect(await hardhatToken.checkBalance(owner.address)).to.equal(4940);


        
//     })

//     it("")
// })



//USING MOCHA HOOKS TO WRITE THE ABOVE TESTS
describe("Apoorva's Token Contract",()=>{
    let token;
    let hardHatToken;
    let owner;
    let person1;
    let person2;
    let addrs;
    //beforeEach will run before testing every line
    beforeEach(async()=>{
        token = await ethers.getContractFactory("Token");
        
        hardHatToken =await token.deploy();//this will execute the constructor function
        
        [owner,person1,person2,...addrs] = await ethers.getSigners();
        })


        describe("Deployment",function(){
            it("Should set correct owner",async function(){
                //every public variable by default has a getter funciton in solidity
                expect(await hardHatToken.owner()).to.equal(owner.address);
            })
            it("Should assign all tokens to owner",async()=>{
                expect(await hardHatToken.checkBalance(owner.address)).to.equal(5000)
            })
        })

    describe("Transactions",()=>{

        it("Should transfer tokens correctly", async () => {
            //this will send tokens from owner to person1
            await hardHatToken.sendTokens(person1.address, 500)

            //this will send tokens from person1 to perons2
            await hardHatToken.connect(person1).sendTokens(person2.address, 40);

            expect(await hardHatToken.checkBalance(person1.address)).to.equal(460)
            expect(await hardHatToken.checkBalance(person2.address)).to.equal(40)

        })

        it("insufficient tokens",async()=>{
            await hardHatToken.sendTokens(person1.address,12);//transfer 12 tokens from 
            let address1Tokens = await hardHatToken.checkBalance(person1.address);;
            expect(address1Tokens).to.equal(12);
        
            await expect( hardHatToken.connect(person1).sendTokens(person2.address, 25)).to.be.revertedWith("You have less tokens than you want to transfer");
            
            expect(await hardHatToken.checkBalance(person2.address)).to.equal(0);

        })
    })
        

})