import { Resolvable } from 'did-resolver';
import { DIDDocument, ResolveOpts } from '../types/SSI.types';
export declare function getResolver(opts: ResolveOpts): Resolvable;
export declare function resolveDidDocument(did: string, opts?: ResolveOpts): Promise<DIDDocument>;
