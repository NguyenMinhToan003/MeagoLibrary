# @meago/core

Core TypeScript dùng chung cho MeagoServer, MeagoClient và các dự án Meago tiếp theo. Package cung cấp contract ổn định cùng các primitive nền tảng, không phụ thuộc NestJS, React, TypeORM, Redis hoặc domain nghiệp vụ cụ thể.

## Phạm vi

- Response, error và pagination contract.
- Auth contract dùng chung cho JWT và stateful session.
- Result và transport-neutral error.
- Permission helpers.
- Clock, ID, hash và transaction ports.
- API path và response factory.

Framework adapter thuộc package hoặc layer khác. Không đưa controller, entity, guard hay React hook vào package này.

## Ví dụ

```ts
import {
  AuthMode,
  normalizePagination,
  ok,
  type AuthPrincipal,
  type Result,
} from '@meago/core';

const pagination = normalizePagination({ page: 1, limit: 200 }, { maxLimit: 100 });
const principal: AuthPrincipal = { subjectId: 'user-id', sessionId: 'session-id' };
const result: Result<string, Error> = ok(`${principal.subjectId}:${AuthMode.SESSION}`);
```

## Phát triển

```bash
npm install
npm run verify
```

`verify` chạy strict type-check, build ESM/CJS/declaration, smoke test và kiểm tra nội dung tarball.

## Dùng local

```bash
npm install ../MeagoLibrary
```

Consumer chỉ import từ `@meago/core`, không import `@meago/core/dist/...`.

## Phát hành

1. Chạy `npm run verify`.
2. Cập nhật `CHANGELOG.md`.
3. Tăng version theo semver.
4. Chạy `npm publish` hoặc `npm run pub`.
5. Nâng cùng version ở Server và Client, sau đó chạy test của cả hai repo.

Package được phát hành công khai với `publishConfig.access=public`. Npm account/token vẫn phải đáp ứng chính sách 2FA hoặc granular token có quyền bypass 2FA khi publish tự động.

Trên Windows có thể chạy quy trình có kiểm soát:

```powershell
.\commit.bat
```

Script chạy `verify` trước khi commit, pull bằng rebase trên branch hiện tại và hỏi riêng trước khi publish. Khi phát hành, người dùng phải chọn `patch`/`minor`/`major`; `npm version` cập nhật cả `package.json`, lockfile, tạo release commit và Git tag. Package được publish rõ ràng với `--access public`, sau đó branch/tag mới được push. Script không force-push, không tự xử lý conflict và dừng ngay khi một gate thất bại.

## Compatibility

- Patch: không đổi public contract hoặc behavior.
- Minor: thêm export hoặc field optional.
- Major: xóa/đổi export, thêm field required hoặc đổi semantics.
- Entity database không phải contract và không được export từ library.
