import { Handle, Position, type NodeProps } from '@xyflow/react'

export type CourseNodeData = {
  code: string
  units: number
}

// A single course box, styled after the mockups: rounded rectangle,
// course code centered, unit count as a small badge in the top-right corner.
// The four Handles are invisible anchor points React Flow uses to know
// where edges should touch this box: left/right for prereq arrows between
// terms, top/bottom for the dashed "concurrent" links within a term.
export function CourseNode({ data }: NodeProps & { data: CourseNodeData }) {
  return (
    <div className="relative flex h-20 w-40 items-center justify-center rounded-2xl border-2 border-slate-700 bg-white shadow-sm">
      <Handle type="target" position={Position.Top} id="top" className="!bg-slate-400" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-slate-400" />

      <span className="absolute right-1.5 top-1.5 rounded border border-slate-300 px-1 text-[10px] leading-tight text-slate-500">
        {data.units}
      </span>
      <span className="text-sm font-semibold text-slate-800">{data.code}</span>

      <Handle type="source" position={Position.Right} id="right" className="!bg-slate-400" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-slate-400" />
    </div>
  )
}
