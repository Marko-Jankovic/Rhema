'use strict';

const assert = require('@rhema/testing').assert;
const loadByAppPaths = require('../');

describe('# LoadByAppPaths', () => {
    it('should throw exception', () => {
        assert.throws(() => {
            loadByAppPaths('fileToFind', []);
        });

        assert.throws(() => {
            loadByAppPaths(undefined, []);
        });

        assert.throws(() => {
            loadByAppPaths('notFound', ['./tests/folder1']);
        });
    });

    it('should find file in test4', () => {
        const file = loadByAppPaths('fileToFind', [
            './tests/folder1/folder4',
            './tests/folder1'
        ]);

        assert.equal(file(), 4);
    });

    it('should find file in test1', () => {
        const file = loadByAppPaths('fileToFind', [
            './tests/folder3',
            './tests/folder1',
            './tests/folder1/folder4'
        ]);

        assert.equal(file(), 1);
    });

    it('should find static file', () => {
        const file1 = loadByAppPaths('style.css', ['./tests/folder1']);
    });
});
