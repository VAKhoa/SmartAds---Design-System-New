'use client';

import siteInfo from '../data/site.generated.json';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { navigation, plannedNavigation } from '../lib/navigation';
import { figmaResourcePage } from '../lib/figma-resources';
import Icon from './Icon';
import Logo from './Logo';
import SourceFileLinks from './SourceFileLinks';

const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
const statuses = { draft: 'Bản nháp', 'in-review': 'Chờ duyệt', beta: 'Beta', stable: 'Ổn định' };

export default function DocsShell({ document: doc, searchIndex, previous, next, children, sourceFiles = null, empty = false, resource = false }) {
  const searchDialog = useRef(null);
  const menuDialog = useRef(null);
  const searchInput = useRef(null);
  const copyTimeout = useRef(null);
  const [query, setQuery] = useState('');
  const [copyState, setCopyState] = useState('');
  const [activeHeading, setActiveHeading] = useState('');
  const [dark, setDark] = useState(false);

  function openSearch() {
    menuDialog.current?.close();
    setQuery('');
    searchDialog.current?.showModal();
    searchInput.current?.focus();
  }
  function closeDialogs() { searchDialog.current?.close(); menuDialog.current?.close(); }

  useEffect(() => {
    setDark(window.document.documentElement.dataset.theme === 'dark');
    const onKey = event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (searchDialog.current?.open) searchDialog.current.close(); else openSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(copyTimeout.current); };
  }, []);

  useEffect(() => {
    setActiveHeading('');
    setCopyState('');
    closeDialogs();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActiveHeading(entry.target.id);
    }, { rootMargin: '-80px 0px -65% 0px' });
    doc.headings.forEach(heading => {
      const element = window.document.getElementById(heading.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [doc.id, doc.headings]);

  const results = useMemo(() => {
    const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
    return [...searchIndex, figmaResourcePage].filter(item => {
      const text = normalize(`${item.title} ${item.description} ${item.searchText}`);
      return words.every(word => text.includes(word));
    });
  }, [query, searchIndex]);

  function toggleTheme() {
    const value = !dark;
    setDark(value);
    window.document.documentElement.dataset.theme = value ? 'dark' : 'light';
    try { localStorage.setItem('sds-theme', value ? 'dark' : 'light'); } catch {}
  }

  async function copyPage() {
    try { await navigator.clipboard.writeText(doc.markdown); setCopyState('Đã sao chép'); }
    catch { setCopyState('Không thể sao chép. Hãy chọn và sao chép nội dung trực tiếp.'); }
    clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopyState(''), 4000);
  }

  function SidebarContent() {
    return <>
      <section className="sa-nav-group">
        <h2 className="sa-sidebar-heading">Getting Started</h2>
        <nav aria-label="Introduction"><ul className="sa-nav-list">{navigation.map(item =>
          <li key={item.id}><Link href={item.href} onClick={closeDialogs} aria-current={doc.id === item.id ? 'page' : undefined}>{item.title}</Link></li>
        )}</ul></nav>
      </section>
      <section className="sa-nav-group">
        <h2 className="sa-sidebar-heading">Resource</h2>
        <Link className="sa-resource-link" href={figmaResourcePage.href} onClick={closeDialogs} aria-current={doc.id === figmaResourcePage.id ? 'page' : undefined}>Figma file</Link>
      </section>
      {plannedNavigation.map(group => <section className="sa-nav-group" key={group.title}>
        <h2 className="sa-sidebar-heading">{group.title}</h2>
        <ul className="sa-nav-list">{group.items.map(title => <li key={title.id}><Link href={title.href} onClick={closeDialogs} aria-current={doc.id === title.id ? 'page' : undefined}>{title.title}</Link></li>)}</ul>
      </section>)}

    </>;
  }

  function TocLinks({ mobile = false }) {
    return <nav aria-label={mobile ? 'Mục lục trên điện thoại' : 'Mục lục trang'}><ul>{doc.headings.map(heading =>
      <li key={heading.id}><a href={`#${heading.id}`} aria-current={activeHeading === heading.id ? 'location' : undefined} onClick={event => {
        setActiveHeading(heading.id);
        if (mobile) event.currentTarget.closest('details').open = false;
      }}>{heading.text}</a></li>
    )}</ul></nav>;
  }

  return <>
    <a className="sa-skip-link" href="#main-content">Đến nội dung chính</a>
    <header className="sa-header">
      <div className="sa-header-inner">
        <Link href="/" className="sa-brand" aria-label="SmartAds Design System — trang chủ"><Logo dark={dark}/></Link>
        <span className="sa-header-divider" aria-hidden="true"/>
        <Link className="sa-header-docs" href="/">Design System <span>SDS</span></Link>
        <div className="sa-header-tools">
          <button className="sa-search-trigger" onClick={openSearch} aria-label="Tìm kiếm tài liệu" aria-keyshortcuts="Control+K Meta+K"><Icon name="search" size={dark ? 18 : 16} stroke={1.75}/><span>Tìm trong tài liệu...</span><kbd>Ctrl K</kbd></button>
          <a className="sa-header-github" href="https://github.com/VAKhoa/SmartAds---Design-System-New" target="_blank" rel="noopener noreferrer"><img className="sa-github-icon" src={dark ? '/brand/github-dark.svg' : '/brand/github-light.svg'} width="20" height="20" alt=""/><span>View on GitHub</span><span className="sr-only"> (mở tab mới)</span></a>
          <button className="sa-icon-button sa-theme-toggle" onClick={toggleTheme} aria-label={dark ? 'Chuyển giao diện sáng' : 'Chuyển giao diện tối'} aria-pressed={dark}><Icon name="theme" size={18}/></button>
          <button className="sa-icon-button sa-menu-toggle" onClick={() => menuDialog.current?.showModal()} aria-label="Mở menu Introduction" aria-haspopup="dialog"><Icon name="menu"/></button>
        </div>
      </div>
    </header>

    <div className="sa-workspace">
      <aside className="sa-sidebar" aria-label="Điều hướng tài liệu"><SidebarContent/></aside>
      <div className={`sa-reading-layout${empty ? ' sa-reading-layout-empty' : ''}${resource ? ' sa-reading-layout-resource' : ''}`}>
        <main id="main-content" className={`sa-main${resource ? ' sa-main-resource' : ''}`} tabIndex="-1" aria-label={empty ? doc.title : undefined}>
          {resource && <>
            <nav className="sa-breadcrumb sa-resource-breadcrumb" aria-label="Đường dẫn trang"><span>Resource</span><Icon name="chevron" size={13}/><span aria-current="page">Figma files</span></nav>
            <div className="sa-title-block"><h1>{doc.title}</h1><p className="sa-lead">{doc.description}</p></div>
            {children}
          </>}
          {!empty && !resource && <>
          <div className="sa-page-toolbar">
            <nav className="sa-breadcrumb" aria-label="Đường dẫn trang"><Link href="/">{doc.section || 'Introduction'}</Link><Icon name="chevron" size={13}/><span>{doc.title}</span></nav>
            <div className="sa-page-tools">
              <button className="sa-copy-button" onClick={copyPage} aria-label="Sao chép nội dung trang"><Icon name={copyState === 'Đã sao chép' ? 'check' : 'copy'} size={15}/><span>{copyState === 'Đã sao chép' ? 'Đã sao chép' : 'Sao chép trang'}</span></button>
              <div className="sa-compact-pagination">
                {previous ? <Link href={previous.href} className="sa-small-button" aria-label={`Trang trước: ${previous.title}`}><Icon name="back" size={15}/></Link> : <button className="sa-small-button" disabled aria-label="Không có trang trước"><Icon name="back" size={15}/></button>}
                {next ? <Link href={next.href} className="sa-small-button" aria-label={`Trang sau: ${next.title}`}><Icon name="arrow" size={15}/></Link> : <button className="sa-small-button" disabled aria-label="Không có trang sau"><Icon name="arrow" size={15}/></button>}
              </div>
            </div>
          </div>
          <span className="sr-only" role="status">{copyState}</span>
          <div className="sa-title-block">
            <div className="sa-title-row"><h1>{doc.id === 'overview' ? 'SmartAds Design System' : doc.title}</h1><span className="sa-status">{statuses[doc.status]}</span></div>
            <p className="sa-lead">{doc.description}</p>
          </div>
          {sourceFiles?.length > 0 && <SourceFileLinks files={sourceFiles}/>}
          <details className="sa-mobile-toc"><summary>Trên trang này <Icon name="down" size={16}/></summary><TocLinks mobile/></details>
          <article aria-label={doc.title}>{children}</article>
          <div className="sa-article-meta"><span>Cập nhật {doc.updated}</span><span>Nguồn: {doc.sources.map((source, i) => <span key={source.url}>{i > 0 && ' · '}<a href={source.url} target="_blank" rel="noreferrer">{source.label}<span className="sr-only"> (tab mới)</span></a></span>)}</span></div>
          <nav className="sa-pagination" aria-label="Trang trước và sau">
            {previous ? <Link href={previous.href} aria-label={`Trang trước: ${previous.title}`}><Icon name="back" size={16}/><span>{previous.title}</span></Link> : <span/>}
            {next ? <Link href={next.href} className="sa-pagination-next" aria-label={`Trang sau: ${next.title}`}><span>{next.title}</span><Icon name="arrow" size={16}/></Link> : <span/>}
          </nav>
          </>}
          {!empty && <footer className="sa-footer"><div className="sa-footer-brand"><Logo dark={dark}/><span>SmartAds Design System <span className="sa-footer-version">v{siteInfo.version}</span></span></div><span className="sa-footer-update">Last update <time dateTime={siteInfo.updatedAt} title="UTC+07:00">{siteInfo.label}</time></span></footer>}
        </main>
        {!empty && !resource && <aside className="sa-toc" aria-label="Trên trang này"><p>Trên trang này</p><TocLinks/><div className="sa-toc-help"><Icon name="book" size={18}/><strong>Mới làm quen với SDS?</strong><span>Tìm điểm bắt đầu theo vai trò của bạn.</span><Link href="/introduction/getting-started/">Getting Started <Icon name="arrow" size={14}/></Link></div></aside>}
      </div>
    </div>

    <dialog ref={menuDialog} className="sa-menu-dialog" aria-label="Menu tài liệu" onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <div className="sa-menu-inner"><div className="sa-mobile-menu-header"><Link href="/" onClick={closeDialogs} aria-label="SmartAds Design System — trang chủ"><Logo dark={dark}/></Link><button className="sa-icon-button" onClick={() => menuDialog.current?.close()} aria-label="Đóng menu"><Icon name="close"/></button></div><SidebarContent/></div>
    </dialog>

    <dialog ref={searchDialog} className="sa-search-dialog" aria-label="Tìm kiếm tài liệu" onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <div className="sa-search-input-row"><Icon name="search" size={20}/><input ref={searchInput} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Tìm trang, thuật ngữ, hướng dẫn..." aria-label="Tìm trong tài liệu SDS" autoComplete="off" onKeyDown={event => {
        if (event.key === 'ArrowDown') { event.preventDefault(); searchDialog.current?.querySelector('.sa-search-result')?.focus(); }
      }}/>{query && <button className="sa-icon-button" aria-label="Clear search" onClick={() => { setQuery(''); searchInput.current?.focus(); }}><Icon name="close"/></button>}<button className="sa-search-close" onClick={() => searchDialog.current?.close()} aria-label="Đóng tìm kiếm">Esc</button></div>
      <div className="sa-search-results"><p className="sa-search-caption" role="status">{query ? `${results.length} trang phù hợp` : 'Introduction'}</p>
        {results.length ? results.map((item, index) => <Link className="sa-search-result" href={item.href} key={item.id} onClick={closeDialogs} onKeyDown={event => {
          const elements = searchDialog.current?.querySelectorAll('.sa-search-result');
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (event.key === 'ArrowUp' && index === 0) searchInput.current?.focus();
            else elements[(index + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length]?.focus();
          }
        }}><Icon name={item.icon} size={19}/><span><strong>{item.title}</strong><small>{item.description}</small></span><Icon name="arrow" size={16}/></Link>) : <div className="sa-search-empty"><Icon name="search" size={28}/><strong>Chưa tìm thấy nội dung phù hợp</strong><p>Thử từ khóa “Figma”, “token” hoặc “Codex”.</p></div>}
      </div><div className="sa-search-footer"><span><kbd><Icon name="up" size={12}/></kbd><kbd><Icon name="arrow-down" size={12}/></kbd> di chuyển</span><span><kbd>Enter</kbd> mở trang</span><span><kbd>Esc</kbd> đóng</span></div>
    </dialog>
  </>;
}
