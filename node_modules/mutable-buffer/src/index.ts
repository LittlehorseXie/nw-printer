export * from "./mutable-buffer";
import {MutableBuffer} from "./mutable-buffer";

export default function (size: number, blockSize: number) {
  return new MutableBuffer(size, blockSize);
}
