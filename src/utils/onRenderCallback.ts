import type React from 'react';

type onRender = React.ProfilerProps['onRender'];

const onRenderCallback: (
  ...args: Parameters<onRender>
) => ReturnType<onRender> = (id, phase, actualDuration) =>
  console.log(
    '[Profiler]',
    `${id} took ${actualDuration}ms`,
    `(phase: ${phase})`,
    `(now: ${performance.now()})`,
  );

export default onRenderCallback;
