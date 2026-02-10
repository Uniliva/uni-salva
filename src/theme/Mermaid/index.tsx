import React, {type ReactNode, useState, useEffect, useCallback, useRef} from 'react';
import Mermaid from '@theme-original/Mermaid';
import type MermaidType from '@theme/Mermaid';
import type {WrapperProps} from '@docusaurus/types';
import {Maximize2, X} from 'lucide-react';
import styles from './styles.module.css';

type Props = WrapperProps<typeof MermaidType>;

export default function MermaidWrapper(props: Props): ReactNode {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setIsFullscreen(true), []);
  const close = useCallback(() => setIsFullscreen(false), []);

  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isFullscreen, close]);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.fullscreenBtn}
        onClick={open}
        title="Tela cheia"
        aria-label="Abrir diagrama em tela cheia">
        <Maximize2 size={16} />
      </button>
      <Mermaid {...props} />
      {isFullscreen && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (!contentRef.current?.contains(e.target as Node)) close();
          }}>
          <button
            className={styles.closeBtn}
            onClick={close}
            aria-label="Fechar tela cheia">
            <X size={24} />
          </button>
          <div className={styles.overlayContent} ref={contentRef}>
            <Mermaid {...props} />
          </div>
        </div>
      )}
    </div>
  );
}
