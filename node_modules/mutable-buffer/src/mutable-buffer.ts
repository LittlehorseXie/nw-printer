"use strict";

const DEFAULT_INITIAL_SIZE = 1024;
const DEFAULT_BLOCK_SIZE = 1024;

export class MutableBuffer {
  protected _initialSize: number;
  protected _blockSize: number;
  protected _size: number;
  protected _buffer: Buffer;

  get size() {
    return this._size;
  }

  get buffer() {
    return this._buffer;
  }

  get nativeBuffer() {
    return this._buffer;
  }

  constructor(size: number, blockSize: number) {
    if (!(this instanceof MutableBuffer)) {
      return new MutableBuffer(size, blockSize);
    }
    this._initialSize = size || DEFAULT_INITIAL_SIZE;
    this._blockSize = blockSize || DEFAULT_BLOCK_SIZE;

    this._buffer = Buffer.alloc(this._initialSize);
    this._size = 0;
  }

  //resize internal buffer if not enough size left
  _ensure(size: number) {
    const remaining = this._buffer.length - this._size;
    if (remaining < size) {
      const factor = Math.ceil((size - remaining) / this._blockSize);

      const oldBuffer = this._buffer;
      this._buffer = Buffer.alloc(oldBuffer.length + this._blockSize * factor);
      oldBuffer.copy(this._buffer);
    }
  }

  capacity() {
    return this._buffer.length;
  }

  clear() {
    this._size = 0;
  }

  join() {
    return this._buffer.slice(0, this._size);
  }

  flush() {
    const result = this.join();
    this.clear();
    return result;
  }

  write(data: any, encoding?: string) {
    if (Buffer.isBuffer(data)) {
      this._ensure(data.length);
      data.copy(this._buffer, this._size);
      this._size += data.length;
    } else if (Array.isArray(data)) {
      this._ensure(data.length);
      for (let i = 0; i < data.length; i++) {
        this._buffer[this._size + i] = data[i];
      }
      this._size += data.length;
    } else if (data && data.buffer && data.size) {
      this._ensure(data.size);
      data.buffer.copy(this._buffer, this._size);
      this._size += data.size;
    } else {
      data = data + "";
      const len = Buffer.byteLength(data, encoding);
      this._ensure(len);
      this._buffer.write(data, this._size, len, encoding);
      this._size += len;
    }
    return this;
  }

  writeCString(data?: string | Buffer, encoding?: string) {
    //just write a 0 for empty or null strings
    if (!data) {
      this._ensure(1);
    } else if (Buffer.isBuffer(data)) {
      this._ensure(data.length);
      data.copy(this._buffer, this._size);
      this._size += data.length;
    } else {
      const len = Buffer.byteLength(data, encoding);
      this._ensure(len + 1); //+1 for null terminator
      this._buffer.write(data, this._size, len, encoding);
      this._size += len;
    }

    this._buffer[this._size++] = 0; // null terminator
    return this;
  }

  writeChar(c: string) {
    this._ensure(1);
    this._buffer.write(c, this._size, 1);
    this._size++;
    return this;
  }

  writeUIntLE(value: number, byteLength: number, noAssert?: boolean) {
    this._ensure(byteLength >>> 0);
    this._size = this._buffer.writeUIntLE(
      value,
      this._size,
      byteLength,
      noAssert
    );
    return this;
  }

  writeUIntBE(value: number, byteLength: number, noAssert?: boolean) {
    this._ensure(byteLength >>> 0);
    this._size = this._buffer.writeUIntBE(
      value,
      this._size,
      byteLength,
      noAssert
    );
    return this;
  }

  writeUInt8(value: number, noAssert?: boolean) {
    this._ensure(1);
    this._size = this._buffer.writeUInt8(value, this._size, noAssert);
    return this;
  }

  writeUInt16LE(value: number, noAssert?: boolean) {
    this._ensure(2);
    this._size = this._buffer.writeUInt16LE(value, this._size, noAssert);
    return this;
  }

  writeUInt16BE(value: number, noAssert?: boolean) {
    this._ensure(2);
    this._size = this._buffer.writeUInt16BE(value, this._size, noAssert);
    return this;
  }

  writeUInt32LE(value: number, noAssert?: boolean) {
    this._ensure(4);
    this._size = this._buffer.writeUInt32LE(value, this._size, noAssert);
    return this;
  }

  writeUInt32BE(value: number, noAssert?: boolean) {
    this._ensure(4);
    this._size = this._buffer.writeUInt32BE(value, this._size, noAssert);
    return this;
  }

  writeIntLE(value: number, byteLength: number, noAssert?: boolean) {
    this._ensure(byteLength >>> 0);
    this._size = this._buffer.writeIntLE(
      value,
      this._size,
      byteLength,
      noAssert
    );
    return this;
  }

  writeIntBE(value: number, byteLength: number, noAssert?: boolean) {
    this._ensure(byteLength >>> 0);
    this._size = this._buffer.writeIntBE(
      value,
      this._size,
      byteLength,
      noAssert
    );
    return this;
  }

  writeInt8(value: number, noAssert?: boolean) {
    this._ensure(1);
    this._size = this._buffer.writeInt8(value, this._size, noAssert);
    return this;
  }

  writeInt16LE(value: number, noAssert?: boolean) {
    this._ensure(2);
    this._size = this._buffer.writeInt16LE(value, this._size, noAssert);
    return this;
  }

  writeInt16BE(value: number, noAssert?: boolean) {
    this._ensure(2);
    this._size = this._buffer.writeInt16BE(value, this._size, noAssert);
    return this;
  }

  writeInt32LE(value: number, noAssert?: boolean) {
    this._ensure(4);
    this._size = this._buffer.writeInt32LE(value, this._size, noAssert);
    return this;
  }

  writeInt32BE(value: number, noAssert?: boolean) {
    this._ensure(4);
    this._size = this._buffer.writeInt32BE(value, this._size, noAssert);
    return this;
  }

  writeFloatLE(value: number, noAssert?: boolean) {
    this._ensure(4);
    this._size = this._buffer.writeFloatLE(value, this._size, noAssert);
    return this;
  }

  writeFloatBE(value: number, noAssert?: boolean) {
    this._ensure(4);
    this._size = this._buffer.writeFloatBE(value, this._size, noAssert);
    return this;
  }

  writeDoubleLE(value: number, noAssert?: boolean) {
    this._ensure(8);
    this._size = this._buffer.writeDoubleLE(value, this._size, noAssert);
    return this;
  }

  writeDoubleBE(value: number, noAssert?: boolean) {
    this._ensure(8);
    this._size = this._buffer.writeDoubleBE(value, this._size, noAssert);
    return this;
  }
}
