import { MockedData, MockingParams } from './interfaces';
export * from './interfaces';
export declare const encodeValue: (value: any) => string;
export declare const decodeValue: <T>(value: string) => T;
export declare const format: <T extends MockingParams, K extends keyof T>(params: T) => string;
export declare const parse: (cuid: string) => MockedData;
