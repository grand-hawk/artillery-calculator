import type React from 'react';

type onRender = React.ProfilerProps['onRender'];

export default function onRenderCallback(
  ...args: Parameters<onRender>
): ReturnType<onRender> {
  const [id, phase, actualDuration] = args;

  console.log(
    '[Profiler]',
    `${id} took ${actualDuration}ms`,
    `(phase: ${phase})`,
    `(now: ${performance.now()})`,
  );
}
