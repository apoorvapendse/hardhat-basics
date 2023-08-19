let main = async()=>{
    const [deployer] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const hardHatToken =await Token.deploy();

    console.log("token address: ",hardHatToken.address);
    
    console.log(hardHatToken.address);
  
    

}
main()
.then(()=>process.exit(0))
.catch((err)=>{console.error(err);process.exit(1)})
