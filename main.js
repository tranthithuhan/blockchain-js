const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce ++;
            this.hash = this.calculateHash();
        }

        console.log("block mined: ", this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, "10/09/2018", "genesis block", "0");
    }

    getLastestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValide() {
        for(let i = 1; i < this.chain.length; i ++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i -1];

            if (currentBlock.hash !== currentBlock.calculateHash() ||
                currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            return true;
        }
    }
}

let testCoin = new Blockchain();


console.log("mining block 1 ...");
testCoin.addBlock(new Block(1, "11/09/2018", {amount: 4}));

console.log("mining block 2 ...");
testCoin.addBlock(new Block(1, "12/09/2018", {amount: 5}));

//console.log(testCoin.isChainValide());
// console.log(JSON.stringify(testCoin, null, 4));