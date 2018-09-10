const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "10/09/2018", "genesis block", "0");
    }

    getLastestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
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
testCoin.addBlock(new Block(1, "11/09/2018", {amount: 4}));
testCoin.addBlock(new Block(1, "12/09/2018", {amount: 5}));

console.log(testCoin.isChainValide());
console.log(JSON.stringify(testCoin, null, 4));