export interface IExtractOptions {
    overwrite: boolean;
}
export declare function extractGeneric(archive: string, dest?: string, options?: IExtractOptions): Promise<string>;
export declare function compress(dir: string, files: string[], type: string, archive: string): Promise<number>;
