import { Block } from './block'

/** 
 * @class BlockChain
 * @description Class representing a Chain of Blocks
 * @author Shady Khalifa
 */
export class BlockChain {

    private readonly difficulty = 2 // a number used to make some difficulty while mining a new block
    private readonly chain: Array<Block>

    /**
    * Create a Chain.
    * @constructor
    */
    constructor() {
        this.chain = [new Block(0, Date.now().toString(), {})]
    }
    /**
     * @public
     * @method addBlock
     * @description used to mine and add new block to the chain
     * @param {Block} block - the block to be added to the chain
     */
    public async addBlock(block: Block): Promise<boolean> {
        block.PreviousHash = this.getLatestBlock().Hash
        await block.mine(this.difficulty) // minning..
        this.chain.push(block)
        // then we will check if the chain is valid, if not we will remove that block
        if (!this.isChainValid()) {
            this.chain.pop()
            throw false
        } else {
            return true
        }
    }

    /**
     * @private
     * @method getLatestBlock
     * @description used to get the latest block in the chain
     * @return {Block} the last block in chain
     */
    private getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }
    /**
     * @private
     * @method isChainValid
     * @description used to validation of the chain
     * @return {boolean} true if the chain is valid otherwise false
     */
    private isChainValid(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (currentBlock.Hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.PreviousHash !== previousBlock.Hash) {
                return false
            }
        }

        return true
    }
}
