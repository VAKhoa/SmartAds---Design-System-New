// Paths are relative to the SmartAds - SDS project root.
export const aiSourceFiles = [
  { path: 'AGENTS.md', description: 'Điểm vào Codex và đường dẫn tới quy tắc SDS.' },
  { path: 'SDS-docs/SDS-RULES.md', description: 'Quy tắc về nguồn, Figma, token và website.' },
  { path: 'SDS-docs/introduction/workspace-guide.md', description: 'Cấu trúc thư mục, quy trình và lệnh kiểm tra.' },
].map(file => ({ ...file, href: `/source/${file.path}` }));
