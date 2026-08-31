import assert from 'node:assert/strict';
import {
  AuthMode, CoreError, CoreErrorCode, createPaginatedResult, createSuccessResponse,
  err, hasAllPermissions, joinApiPath, normalizePagination, ok, unwrapResult,
} from '../dist/index.mjs';

assert.equal(AuthMode.JWT, 'jwt');
assert.equal(joinApiPath('/api/v1/', '/auth', 'me'), '/api/v1/auth/me');
assert.deepEqual(normalizePagination({ page: -1, limit: 500 }, { maxLimit: 100 }), { page: 1, limit: 100 });
assert.deepEqual(createPaginatedResult(['a'], 21, { page: 2, limit: 10 }), {
  items: ['a'], totalItems: 21, page: 2, limit: 10, totalPages: 3,
  hasNextPage: true, hasPreviousPage: true,
});
assert.equal(hasAllPermissions(['story:read', 'story:create'], ['story:read']), true);
assert.equal(unwrapResult(ok('ready')), 'ready');
assert.throws(() => unwrapResult(err(new CoreError({ code: CoreErrorCode.CONFLICT, message: 'conflict' }))));
assert.equal(createSuccessResponse(true, { timestamp: 'fixed' }).timestamp, 'fixed');

console.log('@meago/core smoke tests passed');

