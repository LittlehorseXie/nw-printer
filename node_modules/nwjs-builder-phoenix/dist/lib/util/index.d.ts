export * from './archive';
export declare function mergeOptions(defaults: any, options: any): any;
export declare function findExecutable(platform: string, runtimeDir: string): Promise<string>;
export declare function findFFmpeg(platform: string, dir: string): Promise<string>;
export declare function findRuntimeRoot(platform: string, runtimeDir: string): Promise<string>;
export declare function findExcludableDependencies(dir: string, pkg: any): Promise<string[]>;
export declare function tmpName(options?: any): Promise<string>;
export declare function tmpFile(options?: any): Promise<{
    path: string;
    fd: number;
    cleanup: () => void;
}>;
export declare function tmpDir(options?: any): Promise<{
    path: string;
    cleanup: () => void;
}>;
export declare function fixWindowsVersion(version: string, build?: number): string;
export declare function copyFileAsync(src: string, dest: string): Promise<void>;
export declare function spawnAsync(executable: string, args: string[], options?: any): Promise<{
    code: number;
    signal: string;
}>;
export declare function execAsync(command: string, options?: any): Promise<{
    stdout: string;
    stderr: string;
}>;
