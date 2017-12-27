import * as crypto from 'crypto-js';

class Block {
    static index = 0;
    private key = 0;
    public hash;
    private timestamp;
    private data;
    public previousHash;

    constructor(private message){
        Block.index += Block.index;
        this.timestamp = new Date();
        this.data = 
            Block.index
            + this.timestamp
            + this.message
            + this.previousHash;
    };

    createHash = function() {
        return crypto.HmacSHA256(this.data, this.key.toString());
    };

    mining(zeroes) {
        while(this.hash.toString().substring(0, zeroes) !== Array(zeroes + 1).join("0")) {
            this.key++
            this.hash = crypto.HmacSHA256(this.data, this.key.toString());
        }
    }

};


class Blockchain {
    public chain: Array<Block> = [];
    static previousHash = ''

    addBlock(block: Block) {
        block.previousHash = Blockchain.previousHash;
        block.hash = block.createHash();
        Blockchain.previousHash = block.hash;

        this.chain.push(block);
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[ i - 1 ];

            if(currentBlock.previousHash.toString() !== previousBlock.hash.toString()) {
                return 'It is a fake coin'
            }
            return 'It is a real coin'
        }
    }
};

const genesis = new Block("I am Genesis");
const tinyCoin = new Blockchain();

tinyCoin.addBlock(genesis);


const superman = new Block("Superman gave 10 coinst to Batman.")
tinyCoin.addBlock(superman);

const xman = new Block("Xman gave 10 coinst to Ironman.")
tinyCoin.addBlock(xman);

xman.mining(4);



// console.log(tinyCoin.isValid());

// console.log(tinyCoin);

// console.log(tinyCoin.chain[0].previousHash.toString());
// console.log(tinyCoin.chain[0].hash.toString());
// console.log(tinyCoin.chain[1].previousHash.toString());
// console.log(tinyCoin.chain[1].hash.toString());
// console.log(tinyCoin.chain[2].previousHash.toString());
console.log(tinyCoin.chain[2].hash.toString());




// console.log(genesis.createHash().toString());