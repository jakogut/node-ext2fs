#include "node_ext2fs.h"

NAN_MODULE_INIT(InitAll) {
	NAN_EXPORT(target, trim);
	NAN_EXPORT(target, mount);
	NAN_EXPORT(target, umount);
	NAN_EXPORT(target, open);
	NAN_EXPORT(target, init);
	NAN_EXPORT(target, closeExt);
	NAN_EXPORT(target, close);
	NAN_EXPORT(target, read);
	NAN_EXPORT(target, fstat);
	NAN_EXPORT(target, readdir);
	NAN_EXPORT(target, write);
	NAN_EXPORT(target, unlink);
	NAN_EXPORT(target, rmdir);
}

NODE_MODULE(bindings, InitAll)
