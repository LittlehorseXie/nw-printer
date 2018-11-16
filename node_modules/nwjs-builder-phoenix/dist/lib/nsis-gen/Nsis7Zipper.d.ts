import { NsisComposer, INsisComposerOptions } from './NsisComposer';
export declare class Nsis7Zipper extends NsisComposer {
    protected path: string;
    constructor(path: string, options: INsisComposerOptions);
    protected makeInstallerFiles(): Promise<string>;
}
