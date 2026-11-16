# Token không được component nào dùng (309)

> Nguồn: `variable-figma-export/usage.json`. Quét ngày 14/11/2026 trên 45 trang component/asset (mọi variant), tính cả bind trực tiếp, chuỗi alias ở mode Light và variable trong style đang dùng. Cập nhật 16/11/2026: sau khi gộp `color/neutral` và sau khi người dùng xóa `color/secondary light`, `color/red dark`, `color/orange` (30 token, không còn trong danh sách). **Chưa quét các trang Application UI / Website UI cho toàn bộ token**, nên trước khi xóa cần quét lại cả file.

## Primitives (112)
| Nhóm | Số | Token |
|---|---|---|
| `color/semantic tokens` | 5 | `color-ai-purple` · `color-ai-violet` · `color-ai-pink` · `color-ai-2light-blue` · `color-ai-white` |
| `color/primary` | 1 | `900` |
| `color/secondary dark` | 9 | `30` · `50` · `400` · `600` · `10` · `100` · `200` · `300` · `700` |
| `color/yellow` | 5 | `300` · `400` · `700` · `800` · `900` |
| `color/opacity` | 48 | `primary/0` · `primary/15` · `primary/20` · `primary/25` · `primary/30` · `primary/50` · `primary/75` · `primary/80` · `primary/85` · `primary/90` · `gray/0` · `yellow/0` · `green/0` · `green/10` · `green/15` · `green/20` · `gray/8` · `yellow/8` · `yellow/15` · `yellow/20` · `gray/15` · `gray/20` · `blue/0` · `blue/15` · `blue/20` · `red/0` · `red/15` · `red/20` · `red/25` · `red/30` · `red/50` · `red/70` · `red/75` · `red/80` · `red/85` · `red/90` · `gray/25` · `gray/80` · `gray/85` · `gray/90` · `black/8` · `white/0` · `white/2` · `white/4` · `white/8` · `white/10` · `white/16` · `white/18` |
| `color/blue` | 4 | `300` · `700` · `800` · `900` |
| `color/red light` | 5 | `300` · `400` · `700` · `800` · `900` |
| `color/green` | 5 | `300` · `400` · `700` · `800` · `900` |
| `color/neutral` | 1 | `650` |
| `space` | 22 | `5` · `28` · `32` · `56` · `64` · `80` · `84` · `96` · `128` · `192` · `224` · `256` · `280` · `320` · `384` · `480` · `560` · `640` · `720` · `768` · `1024` · `1600` |
| `typography/text` | 6 | `15 (size 15)` · `28 (size 28)` · `40 (size 40)` · `48 (size 48)` · `60 (size 60)` · `80 (size 80)` |
| `Subtitble` | 1 | `Subtitble` |

## Spacing (70)
| Nhóm | Số | Token |
|---|---|---|
| `spacing` | 4 | `3xl` · `6xl` · `7xl` · `8xl` |
| `radius` | 8 | `xl` · `xl-plus` · `2xl` · `3xl` · `4xl` · `5xl` · `6xl` · `7xl` |
| `icon` | 3 | `size` · `stroke` · `radius` |
| `screen` | 42 | `0 (0px)` · `1 (1px)` · `2 (2px)` · `4 (4px)` · `5 (5px)` · `6 (6px)` · `7 (7px)` · `8 (8px)` · `10 (10px)` · `12 (12px)` · `14 (14px)` · `16 (16px)` · `20 (20px)` · `24 (24px)` · `32 (32px)` · `40 (40px)` · `48 (48px)` · `56 (56px)` · `64 (64px)` · `80 (80px)` · `96 (96px)` · `120 (120px)` · `128 (128px)` · `160 (160px)` · `192 (192px)` · `224 (224px)` · `256 (256px)` · `280 (280px)` · `320 (320px)` · `384 (384px)` · `480 (480px)` · `560 (560px)` · `640 (640px)` · `720 (720px)` · `768 (768px)` · `1024 (1024px)` · `1280 (1280px)` · `1366 (1366px)` · `1440 (1440px)` · `1536 (1536px)` · `1600 (1600px)` · `1920 (1920px)` |
| `typography/text` | 13 | `text-1` · `text-2` · `text-3` · `text-4` · `text-5` · `text-6` · `text-7` · `text-8` · `text-9` · `text-10` · `text-11` · `text-12` · `text-13` |

## Alias (103)
| Nhóm | Số | Token |
|---|---|---|
| `sematic/ai` | 4 | `ai-gradient-mesh-40` · `ai-gradient-mesh-100` · `ai-gradient-mesh-24` · `ai-gradient-mesh-0` |
| `border` | 9 | `primary-hover` · `primary-opacity-haf` · `primary-press` · `secondary` · `secondary-hover` · `secondary-muted` · `info-disable` · `success-disable` · `black` |
| `text` | 14 | `secondary-hover` · `secondary-inverse` · `accent` · `accent-hover` · `accent-pressed` · `accent-muted` · `info-weak` · `info-disable` · `info-muted` · `success-muted` · `danger-muted` · `warning-disable` · `warning-muted` · `link-hover` |
| `background` | 6 | `inverse` · `secondary` · `secondary-inverse` · `gray` · `primary-selected` · `sucess` |
| `foreground` | 4 | `on-bg` · `on-bg-hover` · `on-bg-press` · `on-background-muted` |
| `surface` | 6 | `accent-hover` · `accent-pressed` · `accent-muted` · `info-disable` · `success-disable` · `danger-disable` |
| `overlay/primary` | 7 | `4` · `15` · `20` · `25` · `30` · `50` · `70` |
| `overlay/default` | 4 | `10` · `15` · `20` · `25` |
| `component/skeleton` | 1 | `default` |
| `component/state layers` | 5 | `on-color/default` · `on-color/hover` · `on-color/focus` · `on-color/press` · `on-color/dragged` |
| `component/radio` | 4 | `enable` · `elevation` · `hover` · `focus-green` |
| `component/divider` | 2 | `divider-bland` · `divider-subtle` |
| `component/icon` | 16 | `common/primary-black-inverse` · `common/on-white` · `common/primary-weak-inverse` · `common/secondary` · `common/secondary-gray` · `common/warning-muted` · `common/accent` · `common/accent-hover` · `common/accent-pressed` · `common/accent-muted` · `common/info-muted` · `common/success-muted` · `common/danger-muted` · `common/link` · `common/link-hover` · `file/file-accent` |
| `overlay/danger` | 6 | `15` · `20` · `25` · `30` · `50` · `70` |
| `component/button` | 3 | `surface/gray/default` · `surface/integrity/tertiary-fg-hover` · `border/link/subtle` |
| `component/creative assets` | 2 | `border-asset` · `surface-asset` |
| `component/tags` | 1 | `surface-primary` |
| `component/badge` | 1 | `primary/surface-primary` |
| `component/toast alert` | 1 | `icon-warning-opacity` |
| `component/card` | 1 | `card-hover` |
| `component/text input` | 1 | `surface-hover` |
| `component/table` | 1 | `surface/row-hover` |
| `component/segmented control` | 1 | `press` |
| `sematic/dina` | 1 | `border-mess` |
| `overlay/black` | 2 | `4` · `10` |

## Text (6)
| Nhóm | Số | Token |
|---|---|---|
| `typography/size` | 6 | `fs-base 2` · `fs-base 3` · `fs-body` · `fs-display 2` · `fs-display` · `fs-hero` |

## Viewport Desktop (17)
| Nhóm | Số | Token |
|---|---|---|
| `Screen/Navigation` | 1 | `size-navigation-width` |
| `Screen/Container` | 1 | `size-screen-padding` |
| `Screen/Sidebar` | 1 | `Collapsed` |
| `Width` | 14 | `wd-xs` · `wd-sm` · `wd-md` · `wd-lg` · `wd-xl` · `wd-2xl` · `wd-3xl` · `wd-4xl` · `wd-5xl` · `wd-6xl` · `wd-7xl` · `wd-8xl` · `wd-9xl` · `wd-10xl` |

## Viewport Mobile Tablet (1)
| Nhóm | Số | Token |
|---|---|---|
| `Screen/Navigation` | 1 | `btn-export-report` |
