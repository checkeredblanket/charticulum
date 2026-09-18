// Hardcoded stand-in for the "o_a" (object-attribute) data that will
// eventually come from the database. Each Course is an "Object" with
// attributes (units, term). Dependencies stand in for the "r_o_s_s"
// relationships between Objects (prereq = hard requirement, concurrent =
// can be taken at the same time, shown as a dashed line in the mockups).

export type Term = {
  id: string
  label: string
}

export type Course = {
  id: string
  code: string
  units: number
  termId: string
  /** 0 = top row, 1 = middle row, etc, within its term column */
  row: number
}

export type Dependency = {
  from: string
  to: string
  type: 'prereq' | 'concurrent'
}

export const terms: Term[] = [
  { id: 'fall25', label: 'FALL 25' },
  { id: 'spring26', label: 'SPRING 26' },
]

export const courses: Course[] = [
  { id: 'cmpsc131', code: 'CMPSC 131', units: 3, termId: 'fall25', row: 0 },
  { id: 'math140', code: 'MATH 140', units: 4, termId: 'fall25', row: 1 },
  { id: 'phys211', code: 'PHYS 211', units: 4, termId: 'fall25', row: 2 },

  { id: 'cmpsc132', code: 'CMPSC 132', units: 3, termId: 'spring26', row: 0 },
  { id: 'math141', code: 'MATH 141', units: 4, termId: 'spring26', row: 1 },
  { id: 'phys212', code: 'PHYS 212', units: 4, termId: 'spring26', row: 2 },
]

export const dependencies: Dependency[] = [
  // prereqs carrying a course from one term into the next
  { from: 'cmpsc131', to: 'cmpsc132', type: 'prereq' },
  { from: 'math140', to: 'math141', type: 'prereq' },
  { from: 'phys211', to: 'phys212', type: 'prereq' },

  // concurrent (same-term) recommendations, shown as dashed vertical links
  { from: 'cmpsc131', to: 'math140', type: 'concurrent' },
  { from: 'math140', to: 'phys211', type: 'concurrent' },
  { from: 'cmpsc132', to: 'math141', type: 'concurrent' },
  { from: 'math141', to: 'phys212', type: 'concurrent' },
]
