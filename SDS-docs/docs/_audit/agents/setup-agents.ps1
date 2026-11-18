# Dựng lại các lối tắt (junction) trên máy mới (Windows). File thật ở skills-source/ — script KHÔNG chép file.
# Chạy từ thư mục gốc repo SDS (nơi có AGENTS.md):  powershell -File SDS-docs/docs/_audit/agents/setup-agents.ps1
# -Parent: thêm lối tắt cho thư mục cha (khi mở Claude Code ở thư mục chứa "SmartAds - SDS").
# Chỉ tạo mới, không xóa hay ghi đè. macOS/Linux: dùng `ln -s` cùng cặp nguồn–đích. Xem SESSIONS.md.
param([switch]$Parent)

$root = (Get-Location).Path
if (-not (Test-Path (Join-Path $root 'AGENTS.md'))) { throw 'Chạy script ở thư mục gốc repo SDS (có AGENTS.md).' }
$src = Join-Path $root 'skills-source'
if (-not (Test-Path $src)) { throw 'Thiếu skills-source/ (nguồn thật của skill).' }

function Link($path, $target) {
  if (Test-Path $path) { Write-Host "bỏ qua (đã có): $path"; return }
  if (-not (Test-Path $target)) { Write-Host "THIẾU nguồn: $target"; return }
  New-Item -ItemType Junction -Path $path -Target $target | Out-Null
  Write-Host "đã tạo: $path -> $target"
}

New-Item -ItemType Directory -Force (Join-Path $root '.claude'), (Join-Path $root '.agents') | Out-Null
Link (Join-Path $root '.claude/skills') $src   # Claude Code
Link (Join-Path $root '.agents/skills') $src   # Codex và công cụ khác

if ($Parent) {
  $up = Split-Path $root -Parent
  New-Item -ItemType Directory -Force (Join-Path $up '.claude') | Out-Null
  Link (Join-Path $up '.claude/agents') (Join-Path $root '.claude/agents')
  Link (Join-Path $up '.claude/skills') $src
  $s = Join-Path $up '.claude/settings.json'
  if (-not (Test-Path $s)) { Set-Content -Encoding utf8 $s '{ "agent": "agent-core" }'; Write-Host "đã tạo: $s" }
}
Write-Host 'Xong. Mở phiên Claude Code mới để nạp agent.'
