'use client';

import Icon from './Icon';

export function pxToRem(px, base = 16) {
  return `${Number((px / base).toFixed(5))}rem`;
}

export default function SpacingValue({ px, mode = 'inline', copy = 'rem', token, onCopy, className = '' }) {
  const rem = pxToRem(px);
  const value = copy === 'px' ? `${px}px` : copy === 'token' && token ? `var(${token})` : rem;
  return <button type="button" className={`sa-spacing-value sa-spacing-value-${mode} ${className}`.trim()}
    onClick={() => onCopy?.(value)} title={`Sao chép ${value}`}
    aria-label={`Sao chép ${value}; ${px}px bằng ${rem}`}>
    <span className="sa-spacing-value-main">{px}px</span>
    <span className="sa-spacing-value-sub">{mode === 'inline' ? `(${rem})` : rem}</span>
    <Icon name="copy" size={14} className="sa-spacing-value-icon" />
  </button>;
}
