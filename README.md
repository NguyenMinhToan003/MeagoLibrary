# @meago/core (MeagoLibrary)

Package contract dùng chung giữa **MeagoServer** (NestJS) và **MeagoClient** (Next.js) — theo mô hình `@allinsocial/automation-core` của hệ thống mẫu. Một nguồn chân lý duy nhất cho: envelope response, query phân trang, DTO auth, model interface, permission string, API path constant.

## Cấu trúc
```
src/
  constants/          # API_VERSION, API_CONTROLLERS, API_ACTIONS, PERMISSIONS (resource:action)
  enums/              # EUserStatus, ESortDir
  dto/auth/           # ILoginDto, IRegisterDto, ITokenResponse, IJwtPayload
  interfaces/common/  # IBaseResponse, IErrorResponse, IPaginatedResult, IBaseQuery, IBaseModel
  interfaces/models/  # ICurrentUser, IUser, IRole, IPermission
  index.ts            # barrel kép: named export + namespace (MeagoConstants, MeagoDto, ...)
```

## Cách vận hành

### Build
```bash
npm install
npm run build     # tsup → dist/ (CJS + ESM + .d.ts)
npm run check     # tsc --noEmit
```

### Dùng trong BE/FE khi CHƯA có npm registry (hiện tại)
Cài bằng đường dẫn local — npm tự symlink, không cần publish:
```bash
# trong MeagoServer hoặc MeagoClient
npm install ../MeagoLibrary
```
`package.json` của app sẽ có `"@meago/core": "file:../MeagoLibrary"`. Import như package thường:
```ts
import { IBaseResponse, PERMISSIONS, MeagoDto } from '@meago/core';
```

### Quy trình khi sửa/thêm contract
1. Sửa code trong `src/` của MeagoLibrary.
2. `npm run build` (app đọc từ `dist/`, KHÔNG build là app vẫn thấy type cũ).
3. Restart dev server của app (Next/Nest cache module).

### Khi có npm registry (sau này)
1. Tăng `version` trong package.json (semver: sửa contract cũ = major, thêm mới = minor).
2. `npm run pub` (build + publish, `access: restricted`).
3. BE/FE đổi `file:../MeagoLibrary` → `"@meago/core": "^x.y.z"` và `npm update`.

## Nguyên tắc
- **Chỉ chứa type/constant thuần** — không runtime dependency, không import NestJS/React/class-validator. (Khác nguồn mẫu vốn kéo cả sharp/nodemailer vào lib — tránh.)
- BE entity/DTO có thể implement interface ở đây (`class UserEntity implements IUser`) để lệch contract là TypeScript báo ngay.
- Permission string mới: thêm vào `PERMISSIONS` trước, rồi BE `@RequirePermissions(PERMISSIONS.STORY.CREATE)` và FE `can(PERMISSIONS.STORY.CREATE)` cùng đọc từ đây.
