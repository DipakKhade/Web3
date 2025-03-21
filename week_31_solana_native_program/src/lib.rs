use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    entrypoint::{self, ProgramResult},
    msg,
    pubkey::Pubkey,
    account_info::{AccountInfo, next_account_info}
};

entrypoint!(counter_contract);

#[derive(BorshSerialize, BorshDeserialize)]
struct Counter{
    count: i32
}

#[derive(BorshSerialize, BorshDeserialize)]
enum InstructionType {
    Increatment(u32),
    Decreament(u32)
}

fn counter_contract(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
)->ProgramResult{

    let account = next_account_info(&mut accounts.iter())?;

    let instruction_type = InstructionType::try_from_slice(instruction_data)?;

    let counter = Counter::try_from_slice(&account.data.borrow())?;

    match InstructionType::try_from_slice(instruction_data)? {
        InstructionType::Increatment(n) => {
            counter += n
        }

        InstructionType::Decreament(n) => {
            counter -= n
        }

        
    }
    Ok(())
}