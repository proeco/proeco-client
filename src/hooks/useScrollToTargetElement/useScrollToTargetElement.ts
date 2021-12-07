import { RefObject, useEffect } from 'react';

/**
 * 指定された要素が画面表示領域内に入るよう、ウインドウを自動スクロールするhooks
 *
 * @param enabled ウインドウの自動スクロールを有効にするか否か
 * @param targetRef 対象要素のRefObject
 * @param scrollYOffset 縦方向のスクロール位置のウインドウ上端からのオフセット距離（px）
 * @param onScrolled スクロール時に実行する関数
 */
export const useScrollToTargetElement = ({
  enabled,
  targetRef,
  scrollYOffset = 0,
  onScrolled,
}: {
  enabled: boolean;
  targetRef: RefObject<HTMLElement>;
  scrollYOffset?: number;
  onScrolled?: () => void;
}): void => {
  useEffect(() => {
    if (!enabled || !targetRef.current) {
      return;
    }

    window.scrollTo({
      top: targetRef.current.getBoundingClientRect().top - scrollYOffset,
      behavior: 'smooth',
    });
    onScrolled?.();
  }, [enabled, onScrolled, scrollYOffset, targetRef]);
};
