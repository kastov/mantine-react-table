import clsx from 'clsx';

import classes from './MRT_TopHorizontalScrollbar.module.css';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Box } from '@mantine/core';

import { type MRT_RowData, type MRT_TableInstance } from '../../types';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface Props<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

/**
 * A secondary horizontal scrollbar rendered above the table that mirrors the
 * table container's horizontal scroll position in both directions. Setting an
 * element's `scrollLeft` to its current value does not fire a `scroll` event,
 * so mirroring both ways converges without an extra "is syncing" guard.
 */
export const MRT_TopHorizontalScrollbar = <TData extends MRT_RowData>({
  table,
}: Props<TData>) => {
  'use no memo';
  const {
    refs: { tableContainerRef },
  } = table;

  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const scrollbar = scrollbarRef.current;
    if (!scrollbar) return;

    let container: HTMLDivElement | null = null;
    let rafId = 0;
    let resizeObserver: ResizeObserver | undefined;

    const syncFromContainer = () => {
      if (container) scrollbar.scrollLeft = container.scrollLeft;
    };
    const updateWidth = () => {
      if (container) setScrollWidth(container.scrollWidth);
    };

    // The container is a sibling rendered AFTER this component, so its ref is
    // not yet populated when this layout effect first runs. Poll a frame at a
    // time until it exists, then wire everything up.
    const setup = () => {
      container = tableContainerRef.current;
      if (!container) {
        rafId = requestAnimationFrame(setup);
        return;
      }
      updateWidth();
      container.addEventListener('scroll', syncFromContainer);
      resizeObserver =
        typeof ResizeObserver !== 'undefined'
          ? new ResizeObserver(updateWidth)
          : undefined;
      resizeObserver?.observe(container);
      const tableEl = container.querySelector('table');
      if (tableEl) resizeObserver?.observe(tableEl);
    };
    setup();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container?.removeEventListener('scroll', syncFromContainer);
      resizeObserver?.disconnect();
    };
  }, [tableContainerRef]);

  const syncFromScrollbar = () => {
    const container = tableContainerRef.current;
    if (container && scrollbarRef.current) {
      container.scrollLeft = scrollbarRef.current.scrollLeft;
    }
  };

  return (
    <Box
      aria-hidden
      className={clsx('mrt-top-horizontal-scrollbar', classes.root)}
      onScroll={syncFromScrollbar}
      ref={scrollbarRef}
    >
      <Box className={classes.inner} style={{ width: scrollWidth }} />
    </Box>
  );
};
