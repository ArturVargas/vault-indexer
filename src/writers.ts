import { hexStrArrToStr, toAddress } from './utils';
import type { CheckpointWriter } from '@snapshot-labs/checkpoint';

export async function handleDeploy() {
  // Run logic as at the time Contract was deployed.
}

export async function handleNewStake({ block, tx, event, mysql }: Parameters<CheckpointWriter>[0]) {
  if (!event) return;

  const sender = toAddress(event.data[0]);
  const value = event.data[1];
  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  try {
    console.log(`Event Data: ${event.data}`);
  } catch (error) {
    console.error(`failed to get data on block [${blockNumber}]: ${error}`);
    return;
  }

  // deposit object matches fields of Deposit type in schema.gql
  const deposit = {
    id: `${sender}/${tx.transaction_hash}`,
    sender,
    value,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber
  };

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync('INSERT IGNORE INTO deposits SET ?', [deposit]);
}

export async function handleWithdraw({ block, tx, event, mysql }: Parameters<CheckpointWriter>[0]) {
  if (!event) return;

  const sender = toAddress(event.data[0]);
  const value = event.data[1];
  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  try {
    console.log(`Event Data: ${event.data}`);
  } catch (error) {
    console.error(`failed to get data on block [${blockNumber}]: ${error}`);
    return;
  }

  const withdraw = {
    id: `${sender}/${tx.transaction_hash}`,
    sender,
    value,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber
  };

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync('INSERT IGNORE INTO withdraws SET ?', [withdraw]);
}

export async function handleClaimRewards({
  block,
  tx,
  event,
  mysql
}: Parameters<CheckpointWriter>[0]) {
  if (!event) return;

  const sender = toAddress(event.data[0]);
  const value = event.data[1];
  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  try {
    console.log(`Event Data: ${event.data}`);
  } catch (error) {
    console.error(`failed to get data on block [${blockNumber}]: ${error}`);
    return;
  }

  const claimReward = {
    id: `${sender}/${tx.transaction_hash}`,
    sender,
    value,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber
  };

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync('INSERT IGNORE INTO claims SET ?', [claimReward]);
}

export async function handleRebalanced({
  block,
  tx,
  event,
  mysql
}: Parameters<CheckpointWriter>[0]) {
  if (!event) return;

  const value = event.data[0];
  const timestamp = block.timestamp;
  const blockNumber = block.block_number;

  try {
    console.log(`Event Data: ${event.data}`);
  } catch (error) {
    console.error(`failed to get data on block [${blockNumber}]: ${error}`);
    return;
  }

  const rebalanced = {
    id: `${value}/${tx.transaction_hash}`,
    value,
    tx_hash: tx.transaction_hash,
    created_at: timestamp,
    created_at_block: blockNumber
  };

  // table names are `lowercase(TypeName)s` and can be interacted with sql
  await mysql.queryAsync('INSERT IGNORE INTO balances SET ?', [rebalanced]);
}
