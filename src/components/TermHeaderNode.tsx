import type { NodeProps } from '@xyflow/react'

export type TermHeaderNodeData = {
  label: string
}

// A non-interactive label sitting above each semester column.
// It's a React Flow node (not plain HTML) so it scrolls/zooms with the
// rest of the chart instead of staying fixed on screen.
export function TermHeaderNode({ data }: NodeProps & { data: TermHeaderNodeData }) {
  return (
    <div className="w-40 rounded-t-lg bg-slate-700 px-3 py-2 text-center text-sm font-bold tracking-wide text-white">
      {data.label}
    </div>
  )
}
