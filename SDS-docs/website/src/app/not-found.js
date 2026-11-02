import Link from 'next/link';

export default function NotFound() {
  return <main className="sa-not-found"><span className="sa-status">404</span><h1>Không tìm thấy trang</h1><p>Trang bạn tìm có thể đã được chuyển hoặc chưa có trong tài liệu SDS.</p><Link className="sa-action sa-action-primary" href="/">Về Overview</Link></main>;
}
