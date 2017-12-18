import { createHash } from 'crypto';

/** 
 * @class Block
 * @description Class representing a Block in Chain.
 * @author Shady Khalifa
 */
export class Block {

    private nonce = 0 // useless parameter but important to make the chain impossible to be broken , I lie :'D
    private hash: string

    /**
    * Create a Block.
    * @constructor
    * @param {number} index - The index of Block in the chain
    * @param {string} ts - a timestamp value of when the Block Created
    * @param {object} data - The data added to the block
    * @param {string} previousHash - The Hash of the Previous Block
    */
    constructor(
        private readonly index: number,
        private readonly ts: string,
        private readonly data: object,
        private previousHash: string = ""
    ) {
        this.hash = this.calculateHash()
    }

    /**
     * Get the Hash value.
     * @public
     * @return {string} The hash value.of the current block
     */
    get Hash(): string {
        return this.hash
    }

    /**
     * Set the Hash value.
     * @public
     * @param {string} hash - the hash value
     */
    set Hash(hash: string) {
        this.hash = hash
    }
    /**
     * Set the PreviousHash value.
     * @public
     * @param {string} hash the hash value
     */
    set PreviousHash(hash: string) {
        this.previousHash = hash
    }

    /**
     * Get the PreviousHash value.
     * @public
     * @param {string} hash the hash value
     */
    get PreviousHash(): string {
        return this.previousHash
    }
    /**
     * @public
     * @method mine
     * @description used to mine new block
     * @param {number} difficulty - a number used to make some difficulty while mining.
     */
    public async mine(difficulty: number): Promise<boolean> {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            console.log('\u2717: \x1b[31m%s\x1b[0m', this.hash)
            this.Hash = this.calculateHash()
        }

        console.log('\u2713: \x1b[32m%s\x1b[0m', this.hash)
        return true
    }
    /**
     * @public
     * @method calculateHash
     * @description used to calculate a `SHA256` Hash
     * @return {string} hash in hexadecimal string
     */
    public calculateHash(): string {
        const hash = createHash("sha256")
        hash.update(this.index + JSON.stringify(this.data) + this.ts + this.previousHash + this.nonce)
        return hash.digest("hex")
    }
}