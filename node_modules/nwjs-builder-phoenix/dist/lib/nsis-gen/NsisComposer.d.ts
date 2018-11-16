export interface INsisComposerOptions {
    appName: string;
    companyName: string;
    description: string;
    version: string;
    copyright: string;
    icon: string;
    unIcon: string;
    compression: 'zlib' | 'bzip2' | 'lzma';
    solid: boolean;
    languages: string[];
    installDirectory: string;
    output: string;
}
export declare class NsisComposer {
    protected options: INsisComposerOptions;
    static DIVIDER: string;
    static STRINGS: any;
    protected fixedVersion: string;
    constructor(options: INsisComposerOptions);
    make(): Promise<string>;
    protected makeStrings(): Promise<string>;
    protected makeGeneral(): Promise<string>;
    protected makeModernUI(): Promise<string>;
    protected makeVersioning(): Promise<string>;
    protected makeHooks(): Promise<string>;
    protected makeInstallSection(): Promise<string>;
    protected makeUninstallSection(): Promise<string>;
    protected makeInstallerFiles(): Promise<string>;
}
