import { BlockChain } from './block-chain'
import { Block } from './block'


const chain = new BlockChain()
async function bootstrap() {
    try {
        await chain.addBlock(new Block(1, Date.now().toString(), { amount: 16 }))
        await chain.addBlock(new Block(2, Date.now().toString(), { amount: 20 }))
        await chain.addBlock(new Block(3, Date.now().toString(), { amount: 10 }))
    } catch (e) {
        console.log("Error while adding a Block in the Chain: ", e)
    }
}
bootstrap().then(() => {
    console.log(JSON.stringify(chain, null, 4))
    console.log('\x1b[42m\x1b[34m%s\x1b[0m', "DONE")
})
