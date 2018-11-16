'use strict';

const util = require('util');
const t = require('chai').assert;
const iconv = require('iconv-lite');
const MutableBuffer = require('..').MutableBuffer;

function spit(actual: any, expected: any, message: string) {
  console.log('');
  console.log(message);
  console.log('actual ' + util.inspect(actual));
  console.log('expect ' + util.inspect(expected));
  console.log('');
}

t.equalBuffers = function (actual: any, expected: any, message: string) {
  if (actual.length !== expected.length) {
    spit(actual, expected, message);
    t.equal(actual.length, expected.length);
  }
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] !== expected[i]) {
      spit(actual, expected, message);
    }
    t.equal(actual[i], expected[i]);
  }
};

function itWriteFixedNumber(type: string, val: any, expected: any) {
  const fn = 'write' + type;

  it(fn + '(' + val + ')', function () {
    const buffer = new MutableBuffer();
    const result = buffer[fn](val).join();
    t.equalBuffers(result, expected, fn);
  });
}


function itWriteLengthNumber(type: string, val: any, length: number, expected: any) {
  const fn = 'write' + type;

  it(fn + '(' + val + ')', function () {
    const buffer = new MutableBuffer();
    const result = buffer[fn](val, length).join();
    t.equalBuffers(result, expected, fn);
  });
}


describe('mutable-buffer', function () {

  describe('writing number', function () {

    itWriteFixedNumber('UInt8', 0, [0]);
    itWriteFixedNumber('UInt8', 255, [255]);

    itWriteFixedNumber('UInt16BE', 256, [1, 0]);
    itWriteFixedNumber('UInt16LE', 256, [0, 1]);

    itWriteFixedNumber('UInt32BE', 256, [0, 0, 1, 0]);
    itWriteFixedNumber('UInt32LE', 256, [0, 1, 0, 0]);

    itWriteFixedNumber('Int8', 0, [0]);
    itWriteFixedNumber('Int8', 127, [127]);
    itWriteFixedNumber('Int8', -126, [256 - 126]);

    itWriteFixedNumber('Int16BE', 256, [1, 0]);
    itWriteFixedNumber('Int16LE', 256, [0, 1]);
    itWriteFixedNumber('Int16BE', -256, [0xff, 0]);
    itWriteFixedNumber('Int16LE', -256, [0, 0xff]);

    itWriteFixedNumber('Int32BE', 256, [0, 0, 1, 0]);
    itWriteFixedNumber('Int32LE', 256, [0, 1, 0, 0]);
    itWriteFixedNumber('Int32BE', -256, [0xff, 0xff, 0xff, 0]);
    itWriteFixedNumber('Int32LE', -256, [0, 0xff, 0xff, 0xff]);

    itWriteFixedNumber('FloatBE', 0xcafebabe, [0x4f, 0x4a, 0xfe, 0xbb]);
    itWriteFixedNumber('FloatLE', 0xcafebabe, [0xbb, 0xfe, 0x4a, 0x4f]);

    itWriteFixedNumber('DoubleBE', 0x1234567890abcdef, [0x43, 0xb2, 0x34, 0x56, 0x78, 0x90, 0xab, 0xce]);
    itWriteFixedNumber('DoubleLE', 0x1234567890abcdef, [0xce, 0xab, 0x90, 0x78, 0x56, 0x34, 0xb2, 0x43]);

    itWriteLengthNumber('UIntBE', 0x1234567890ab, 6, [0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);
    itWriteLengthNumber('UIntLE', 0x1234567890ab, 6, [0xab, 0x90, 0x78, 0x56, 0x34, 0x12]);

    itWriteLengthNumber('IntBE', -0x1234567890ab, 6, [0xed, 0xcb, 0xa9, 0x87, 0x6f, 0x55]);
    itWriteLengthNumber('IntLE', -0x1234567890ab, 6, [0x55, 0x6f, 0x87, 0xa9, 0xcb, 0xed]);

    it('writing multiple number', function () {
      const buffer = new MutableBuffer();
      buffer.writeUInt32BE(1).writeUInt32BE(10).writeUInt32BE(0);
      t.equal(buffer.size, 12);
      t.equalBuffers(buffer.join(), [0, 0, 0, 1, 0, 0, 0, 0x0a, 0, 0, 0, 0]);
    });
  });

  describe('having to resize the buffer', function () {
    it('after resize correct result returned', function () {
      const buffer = new MutableBuffer(10, 10);
      buffer.writeUInt32BE(1).writeUInt32BE(1).writeUInt32BE(1);
      t.equal(buffer.size, 12);
      t.equal(buffer.capacity(), 20);
      t.equalBuffers(buffer.join(), [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]);
    });
  });

  describe('CString', function () {
    it('writes empty cstring', function () {
      const buffer = new MutableBuffer();
      const result = buffer.writeCString().join();
      t.equalBuffers(result, [0]);
    });

    it('writes two empty cstrings', function () {
      const buffer = new MutableBuffer();
      const result = buffer.writeCString('').writeCString('').join();
      t.equalBuffers(result, [0, 0]);
    });


    it('writes non-empty cstring', function () {
      const buffer = new MutableBuffer();
      const result = buffer.writeCString('!!!').join();
      t.equalBuffers(result, [33, 33, 33, 0]);
    });

    it('resizes if reached end', function () {
      const buffer = new MutableBuffer(3);
      const result = buffer.writeCString('!!!').join();
      t.equalBuffers(result, [33, 33, 33, 0]);
    });

    it('writes multiple cstrings', function () {
      const buffer = new MutableBuffer();
      const result = buffer.writeCString('!').writeCString('!').join();
      t.equalBuffers(result, [33, 0, 33, 0]);
    });
  });

  it('writes char', function () {
    const buffer = new MutableBuffer(2);
    const result = buffer.writeChar('a').writeChar('b').writeChar('c').join();
    t.equalBuffers(result, [0x61, 0x62, 0x63]);
  });

  it('gets correct size', function () {
    const buffer = new MutableBuffer(5);
    t.equal(buffer.size, 0);
    buffer.writeInt32BE(0);
    t.equal(buffer.size, 4);
    buffer.writeCString('!');
    t.equal(buffer.size, 6);
  });

  it('can write arbitrary buffer to the end', function () {
    const buffer = new MutableBuffer(4);
    buffer.writeCString('!!!');
    const result = buffer.write(Buffer.from('@@@')).join();
    t.equalBuffers(result, [33, 33, 33, 0, 0x40, 0x40, 0x40]);
  });

  describe('can write normal string', function () {
    const buffer = new MutableBuffer(4);
    let result = buffer.write('!').join();
    t.equalBuffers(result, [33]);
    it('can write cString too', function () {
      result = buffer.writeCString('!').join();
      t.equalBuffers(result, [33, 33, 0]);
    });
    it('can resize', function () {
      result = buffer.write('!!').join();
      t.equalBuffers(result, [33, 33, 0, 33, 33]);
    });
  });

  describe('can write custom encoding string', function () {

    it('can write utf8 string', function () {
      const buffer = new MutableBuffer();
      const result = buffer.write('你好').join();
      t.equalBuffers(result, [0xe4, 0xbd, 0xa0, 0xe5, 0xa5, 0xbd]);
    });

    it('can write gbk buffer string', function () {
      const buffer = new MutableBuffer();
      const result = buffer.write(iconv.encode('你好', 'gbk')).join();
      t.equalBuffers(result, [0xc4, 0xe3, 0xba, 0xc3]);
    });

    it('can write gbk buffer cString', function () {
      const buffer = new MutableBuffer();
      const result = buffer.writeCString(iconv.encode('你好', 'gbk')).join();
      t.equalBuffers(result, [0xc4, 0xe3, 0xba, 0xc3, 0x00]);
    });
  });

  describe('write array', function () {
    it('can write binary array', function () {
      const data = [0x01, 0x02];
      const buffer = new MutableBuffer();
      const result = buffer.write(data).join();
      t.equalBuffers(result, data);
    });
  });

  describe('write mutable buffer', function () {
    it('can write from another mutable buffer', function () {
      const data = [0x01, 0x02];
      const buffer = new MutableBuffer();
      const source = new MutableBuffer();
      source.write(data);
      const result = buffer.write(source).join();
      t.equalBuffers(result, data);
    });
  });

  describe('clearing', function () {
    const buffer = new MutableBuffer();
    buffer.writeCString('@!!#!#');
    buffer.writeInt32BE(10401);
    it('clears', function () {
      buffer.clear();
      t.equalBuffers(buffer.join(), []);
    });
    it('writing more', function () {
      const joinedResult = buffer.writeCString('!').writeInt32BE(9).writeInt16BE(2).join();
      t.equalBuffers(joinedResult, [33, 0, 0, 0, 0, 9, 0, 2]);
    });
    it('returns result', function () {
      const flushedResult = buffer.flush();
      t.equalBuffers(flushedResult, [33, 0, 0, 0, 0, 9, 0, 2]);
    });
    it('clears the writer', function () {
      t.equalBuffers(buffer.join(), []);
      t.equalBuffers(buffer.flush(), []);
    });
  });

  it('resizing to much larger', function () {
    const buffer = new MutableBuffer(2);
    const string = '!!!!!!!!';
    const result = buffer.writeCString(string).flush();
    t.equalBuffers(result, [33, 33, 33, 33, 33, 33, 33, 33, 0]);
  });

  describe('flush', function () {
    it('flush a full buffer', function () {
      const buffer = new MutableBuffer(1);
      const result = buffer.writeCString('!').flush();
      t.equalBuffers(result, [33, 0]);
      t.equal(buffer.size, 0);
    });

    it('flush a non-full buffer', function () {
      const buffer = new MutableBuffer(10).writeCString('!');
      const joinedResult = buffer.join();
      const result = buffer.flush();
      t.equalBuffers(result, [33, 0]);
      t.equalBuffers(result, joinedResult);
      t.equal(buffer.size, 0);
    });

    it('flush a buffer which requires resizing', function () {
      const result = new MutableBuffer(2).writeCString('!!!!!!!!').flush();
      t.equalBuffers(result, [33, 33, 33, 33, 33, 33, 33, 33, 0]);
    });
  });
});
