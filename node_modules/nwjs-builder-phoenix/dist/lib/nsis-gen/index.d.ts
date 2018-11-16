export * from './NsisComposer';
export * from './NsisDiffer';
export * from './Nsis7Zipper';
export interface INsisBuildOptions {
    mute: boolean;
}
export declare function nsisBuild(cwd: string, script: string, options?: INsisBuildOptions): Promise<void>;
