// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() { 
  const EventTest = await hre.ethers.getContractFactory("Deleivery");
  const eventTest = await EventTest.deploy();

  await eventTest.deployed();

  eventTest.on("Deposit", (sender, number) => {
    console.log(`New deposit: ${sender} ${number} `);
  })

  eventTest.on("Ship", (sender, number,receiver) => {
    console.log(`Parcel Shipped: ${sender} ${number} ${receiver} `);
  })

  eventTest.on("Return", (receiver, number , sender) => {
    console.log(`Parcel Returned: ${receiver} ${number} ${sender} `);
  })

  console.log(
    `Contract deployed to ${eventTest.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
