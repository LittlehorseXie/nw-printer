import { NsisComposer, INsisComposerOptions } from './NsisComposer';
export declare class NsisDiffer extends NsisComposer {
    protected fromDir: string;
    protected toDir: string;
    constructor(fromDir: string, toDir: string, options: INsisComposerOptions);
    protected makeInstallerFiles(): Promise<string>;
    protected makeRemoveFile(rootDir: string, relativeDir: string, filename: string): Promise<string>;
    protected makeWriteFile(rootDir: string, relativeDir: string, filename: string): Promise<string>;
    protected makeRemoveDir(rootDir: string, relativeDir: string, filename: string): Promise<string>;
}
