'use strict';

const Module = require('./libext2fs');
const { CODE_TO_ERRNO } = require('./wasi');
const {
	ErrnoException,
	ccallThrow,
	ccallThrowAsync,
	promiseToCallback,
	withHeapBuffer,
	withPathAsHeapBuffer,
} = require('./util');

function getCallback(req) {
	if (!req || (typeof req.oncomplete !== 'function')) {
		throw new Error('A callback is required.');
	}
	return req.oncomplete.bind(req);
}

const unimplemented = name => {
	throw new Error(`\`${name}\` not implemented.`)
}

module.exports = function(constants, fsPointer) {
	const {
		X_OK = 0,
		O_RDONLY,
		O_NOFOLLOW,
		S_IXUSR,
		S_IXGRP,
		S_IXOTH,
	} = constants;


	async function close(fd) {
		checkFd(fd, 'node_ext2fs_close', [fd]);
		await ccallThrowAsync('node_ext2fs_close', 'number', ['number'], [fd]);
		openFiles.delete(fd);
	}

	exports.close = function(fd, req) {
		promiseToCallback(
			close(fd),
			getCallback(req),
		);
	};


	exports.fchown = function(fd, uid, gid, req) {
		promiseToCallback(
			fchown(fd, uid, gid),
			getCallback(req),
		);
	};


	exports.lstat = function(path, req) {
		promiseToCallback(
			lstat(path),
			getCallback(req),
		);
	};


	promises.open = open;
	exports.open = function(path, flags, mode, req) {
		promiseToCallback(
			open(path, flags, mode),
			getCallback(req),
		);
	};


	exports.read = function(fd, buffer, offset, length, position, req) {
		promiseToCallback(
			read(
				fd,
				buffer,
				offset,
				length,
				(typeof position !== 'number') ? -1 : position,
			),
			getCallback(req),
		);
	};

	const rename = exports.rename = unimplemented('rename');

	const StatWatcher = exports.StatWatcher = unimplemented('StatWatcher');


	exports.unlink = function(path, req) {
		promiseToCallback(
			unlink(path, 0),
			getCallback(req),
		);
	};

	return [exports, {
		access,
		chmod,
		chown,
		close,
		chmod,
		fchown,
		fstat,
		lstat,
		fsync,
		ftruncate,
		link,
		mkdir,
		mkdirtemp,
		open,
		read,
		readdir,
		readlink,
		rename,
		unlink,
		stat,
		symlink,
		StatWatcher,
	}];
};
