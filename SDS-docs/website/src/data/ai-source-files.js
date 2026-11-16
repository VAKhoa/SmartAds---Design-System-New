// Paths are relative to the repository root.
export const aiSourceFiles = [
  { path: 'AGENTS.md', description: 'Điểm vào duy nhất: việc nào đọc file nào, cấu trúc, quyết định đã chốt, lệnh và quy tắc Figma chỉ đọc.' },
  { path: 'SDS-docs/content/rules/SDS-rules.md', description: 'Quy tắc về nguồn, Figma, token và website.' },
  { path: 'SDS-docs/content/guides/workspace-guide.md', description: 'Cấu trúc thư mục, quy trình và lệnh kiểm tra.' },
].map(file => ({ ...file, href: `/source/${file.path}` }));
