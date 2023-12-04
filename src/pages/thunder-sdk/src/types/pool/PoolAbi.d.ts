/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.57.0
  Forc version: 0.44.0
  Fuel-Core version: 0.20.4
*/

import type {
  BigNumberish,
  BN,
  BytesLike,
  Contract,
  DecodedValue,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from 'fuels';

import type { Option, Enum } from "./common";

export enum AccessErrorInput { CannotReinitialized = 'CannotReinitialized', NotOwner = 'NotOwner' };
export enum AccessErrorOutput { CannotReinitialized = 'CannotReinitialized', NotOwner = 'NotOwner' };
export type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput, ContractId: ContractIdOutput }>;
export enum PoolErrorsInput { OnlyOwner = 'OnlyOwner', Initialized = 'Initialized', AssetNotSupported = 'AssetNotSupported', AmountHigherThanBalance = 'AmountHigherThanBalance', CallerMustBeTheExchange = 'CallerMustBeTheExchange', IdentityMustBeNonZero = 'IdentityMustBeNonZero' };
export enum PoolErrorsOutput { OnlyOwner = 'OnlyOwner', Initialized = 'Initialized', AssetNotSupported = 'AssetNotSupported', AmountHigherThanBalance = 'AmountHigherThanBalance', CallerMustBeTheExchange = 'CallerMustBeTheExchange', IdentityMustBeNonZero = 'IdentityMustBeNonZero' };

export type AddressInput = { value: string };
export type AddressOutput = AddressInput;
export type AssetIdInput = { value: string };
export type AssetIdOutput = AssetIdInput;
export type ContractIdInput = { value: string };
export type ContractIdOutput = ContractIdInput;
export type DepositInput = { address: IdentityInput, asset: AssetIdInput, amount: BigNumberish };
export type DepositOutput = { address: IdentityOutput, asset: AssetIdOutput, amount: BN };
export type OwnershipRenouncedInput = { previous_owner: IdentityInput };
export type OwnershipRenouncedOutput = { previous_owner: IdentityOutput };
export type OwnershipSetInput = { new_owner: IdentityInput };
export type OwnershipSetOutput = { new_owner: IdentityOutput };
export type OwnershipTransferredInput = { new_owner: IdentityInput, previous_owner: IdentityInput };
export type OwnershipTransferredOutput = { new_owner: IdentityOutput, previous_owner: IdentityOutput };
export type TransferInput = { from: IdentityInput, to: IdentityInput, asset: AssetIdInput, amount: BigNumberish };
export type TransferOutput = { from: IdentityOutput, to: IdentityOutput, asset: AssetIdOutput, amount: BN };
export type WithdrawalInput = { address: IdentityInput, asset: AssetIdInput, amount: BigNumberish };
export type WithdrawalOutput = { address: IdentityOutput, asset: AssetIdOutput, amount: BN };

interface PoolAbiInterface extends Interface {
  functions: {
    balance_of: FunctionFragment;
    deposit: FunctionFragment;
    get_asset_manager: FunctionFragment;
    get_exchange: FunctionFragment;
    initialize: FunctionFragment;
    owner: FunctionFragment;
    renounce_ownership: FunctionFragment;
    set_asset_manager: FunctionFragment;
    set_exchange: FunctionFragment;
    total_supply: FunctionFragment;
    transfer_from: FunctionFragment;
    transfer_ownership: FunctionFragment;
    withdraw: FunctionFragment;
    withdraw_all: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'balance_of', values: [IdentityInput, AssetIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'deposit', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'get_asset_manager', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'get_exchange', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'initialize', values: [ContractIdInput, ContractIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'owner', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'renounce_ownership', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'set_asset_manager', values: [ContractIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'set_exchange', values: [ContractIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'total_supply', values: [AssetIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'transfer_from', values: [IdentityInput, IdentityInput, AssetIdInput, BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'transfer_ownership', values: [IdentityInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'withdraw', values: [AssetIdInput, BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'withdraw_all', values: []): Uint8Array;

  decodeFunctionData(functionFragment: 'balance_of', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'deposit', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_asset_manager', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_exchange', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'initialize', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'owner', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'renounce_ownership', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'set_asset_manager', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'set_exchange', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'total_supply', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'transfer_from', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'transfer_ownership', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'withdraw', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'withdraw_all', data: BytesLike): DecodedValue;
}

export class PoolAbi extends Contract {
  interface: PoolAbiInterface;
  functions: {
    balance_of: InvokeFunction<[account: IdentityInput, asset: AssetIdInput], BN>;
    deposit: InvokeFunction<[], void>;
    get_asset_manager: InvokeFunction<[], ContractIdOutput>;
    get_exchange: InvokeFunction<[], ContractIdOutput>;
    initialize: InvokeFunction<[exchange: ContractIdInput, asset_manager: ContractIdInput], void>;
    owner: InvokeFunction<[], Option<IdentityOutput>>;
    renounce_ownership: InvokeFunction<[], void>;
    set_asset_manager: InvokeFunction<[asset_manager: ContractIdInput], void>;
    set_exchange: InvokeFunction<[exchange_contract: ContractIdInput], void>;
    total_supply: InvokeFunction<[asset: AssetIdInput], BN>;
    transfer_from: InvokeFunction<[from: IdentityInput, to: IdentityInput, asset: AssetIdInput, amount: BigNumberish], boolean>;
    transfer_ownership: InvokeFunction<[new_owner: IdentityInput], void>;
    withdraw: InvokeFunction<[asset: AssetIdInput, amount: BigNumberish], void>;
    withdraw_all: InvokeFunction<[], void>;
  };
}
