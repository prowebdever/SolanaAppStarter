import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { SolanaAppStarter } from '../target/types/solana_app_starter';

describe('SolanaAppStarter', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SolanaAppStarter as Program<SolanaAppStarter>;

  it('Is initialized!', async () => {
    const baseAccount = anchor.web3.Keypair.generate();
    await program.rpc.initialize("Hello World", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Data: ', account.data);
    assert.ok(account.data === "Hello World");
    _baseAccount = baseAccount;
  });

  it('Updates a previously created account', async() => {
    const baseAccount = _baseAccount;
    await program.rpc.update("Some new data", {
      accounts: {
        baseAccount: baseAccount.publicKey
      }
    });

    const account = await program.account.baseAccount;
    console.log("Update data: ", account.data);
    assert.ok(account.data === "Some new data");
    console.log('all account data: ', account);
    console.log('All data: ', account.dataList);
    assert.ok(account.dataList.length === 2);
  })
});
