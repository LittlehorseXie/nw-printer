export interface IInstaller {
    arch: string;
    path: string;
    hash: string;
    created: number;
}
export interface IUpdater {
    arch: string;
    fromVersion: string;
    path: string;
    hash: string;
    created: number;
}
export interface IVersion {
    version: string;
    changelog: string;
    source: string;
    installers: IInstaller[];
    updaters: IUpdater[];
}
export interface IVersionInfoData {
    latest: string;
    versions: IVersion[];
}
export declare class NsisVersionInfo {
    protected path: string;
    protected outputDir: string;
    protected data: IVersionInfoData;
    constructor(path: string);
    addVersion(version: string, changelog: string, source: string): Promise<void>;
    getVersions(): Promise<string[]>;
    getVersion(version: string): Promise<IVersion>;
    addInstaller(version: string, arch: string, path: string): Promise<void>;
    addUpdater(version: string, fromVersion: string, arch: string, path: string): Promise<void>;
    save(): Promise<void>;
    protected getData(): Promise<IVersionInfoData>;
    protected updateLatestVersion(): void;
    protected hashFile(type: string, path: string): Promise<string>;
}
