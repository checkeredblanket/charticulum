import {
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { CourseNode, type CourseNodeData } from './components/CourseNode'
import { TermHeaderNode, type TermHeaderNodeData } from './components/TermHeaderNode'
import { courses, dependencies, terms } from './data/sampleChart'

const nodeTypes = {
  course: CourseNode,
  termHeader: TermHeaderNode,
}

const TERM_COLUMN_WIDTH = 260
const ROW_HEIGHT = 140
const COURSES_START_Y = 90

const termIndexById = new Map(terms.map((term, index) => [term.id, index]))

const headerNodes: Node<TermHeaderNodeData>[] = terms.map((term) => ({
  id: `header-${term.id}`,
  type: 'termHeader',
  position: { x: (termIndexById.get(term.id) ?? 0) * TERM_COLUMN_WIDTH, y: 0 },
  data: { label: term.label },
  draggable: false,
  selectable: false,
}))

const courseNodes: Node<CourseNodeData>[] = courses.map((course) => ({
  id: course.id,
  type: 'course',
  position: {
    x: (termIndexById.get(course.termId) ?? 0) * TERM_COLUMN_WIDTH,
    y: COURSES_START_Y + course.row * ROW_HEIGHT,
  },
  data: { code: course.code, units: course.units },
}))

const nodes = [...headerNodes, ...courseNodes]

const edges: Edge[] = dependencies.map((dependency) => {
  const isPrereq = dependency.type === 'prereq'

  return {
    id: `${dependency.from}-${dependency.to}`,
    source: dependency.from,
    target: dependency.to,
    sourceHandle: isPrereq ? 'right' : 'bottom',
    targetHandle: isPrereq ? 'left' : 'top',
    style: isPrereq
      ? { stroke: '#334155', strokeWidth: 2 }
      : { stroke: '#94a3b8', strokeWidth: 1.5, strokeDasharray: '4 4' },
    markerEnd: isPrereq
      ? { type: MarkerType.ArrowClosed, color: '#334155' }
      : undefined,
  }
})

function App() {
  return (
    <div className="h-screen w-screen bg-slate-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        nodesDraggable
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default App
