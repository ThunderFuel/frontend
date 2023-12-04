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
export enum AssetManagerErrorsInput { Initialized = 'Initialized', OnlyOwner = 'OnlyOwner', AssetAlreadySupported = 'AssetAlreadySupported', AssetNotSupported = 'AssetNotSupported', ZeroLengthVec = 'ZeroLengthVec', IndexOutOfBound = 'IndexOutOfBound' };
export enum AssetManagerErrorsOutput { Initialized = 'Initialized', OnlyOwner = 'OnlyOwner', AssetAlreadySupported = 'AssetAlreadySupported', AssetNotSupported = 'AssetNotSupported', ZeroLengthVec = 'ZeroLengthVec', IndexOutOfBound = 'IndexOutOfBound' };
export type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput, ContractId: ContractIdOutput }>;

export type AddressInput = { value: string };
export type AddressOutput = AddressInput;
export type AssetIdInput = { value: string };
export type AssetIdOutput = AssetIdInput;
export type ContractIdInput = { value: string };
export type ContractIdOutput = ContractIdInput;
export type OwnershipRenouncedInput = { previous_owner: IdentityInput };
export type OwnershipRenouncedOutput = { previous_owner: IdentityOutput };
export type OwnershipSetInput = { new_owner: IdentityInput };
export type OwnershipSetOutput = { new_owner: IdentityOutput };
export type OwnershipTransferredInput = { new_owner: IdentityInput, previous_owner: IdentityInput };
export type OwnershipTransferredOutput = { new_owner: IdentityOutput, previous_owner: IdentityOutput };

interface AssetManagerAbiInterface extends Interface {
  functions: {
    add_asset: FunctionFragment;
    get_count_supported_assets: FunctionFragment;
    get_supported_asset: FunctionFragment;
    initialize: FunctionFragment;
    is_asset_supported: FunctionFragment;
    owner: FunctionFragment;
    remove_asset: FunctionFragment;
    renounce_ownership: FunctionFragment;
    transfer_ownership: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'add_asset', values: [AssetIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'get_count_supported_assets', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'get_supported_asset', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'initialize', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'is_asset_supported', values: [AssetIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'owner', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'remove_asset', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'renounce_ownership', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'transfer_ownership', values: [IdentityInput]): Uint8Array;

  decodeFunctionData(functionFragment: 'add_asset', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_count_supported_assets', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_supported_asset', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'initialize', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'is_asset_supported', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'owner', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'remove_asset', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'renounce_ownership', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'transfer_ownership', data: BytesLike): DecodedValue;
}

export class AssetManagerAbi extends Contract {
  interface: AssetManagerAbiInterface;
  functions: {
    add_asset: InvokeFunction<[asset: AssetIdInput], void>;
    get_count_supported_assets: InvokeFunction<[], BN>;
    get_supported_asset: InvokeFunction<[index: BigNumberish], Option<AssetIdOutput>>;
    initialize: InvokeFunction<[], void>;
    is_asset_supported: InvokeFunction<[asset: AssetIdInput], boolean>;
    owner: InvokeFunction<[], Option<IdentityOutput>>;
    remove_asset: InvokeFunction<[index: BigNumberish], void>;
    renounce_ownership: InvokeFunction<[], void>;
    transfer_ownership: InvokeFunction<[new_owner: IdentityInput], void>;
  };
}
