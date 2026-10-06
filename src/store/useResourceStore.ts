import { create } from 'zustand'
import { resources, type Resource, type ResourceCategory, type Stage } from '../data/resources'

interface ResourceState {
  category: ResourceCategory | 'all'
  stage: Stage | null
  query: string
  onlyUsed: boolean
  /** Cards showing their full description */
  expanded: Record<string, boolean>
  setCategory: (category: ResourceCategory | 'all') => void
  /** Selecting the active stage again clears it */
  toggleStage: (stage: Stage) => void
  setQuery: (query: string) => void
  toggleOnlyUsed: () => void
  toggleExpanded: (id: string) => void
  clearFilters: () => void
}

export const useResourceStore = create<ResourceState>()((set) => ({
  category: 'all',
  stage: null,
  query: '',
  onlyUsed: false,
  expanded: {},
  setCategory: (category) => set({ category }),
  toggleStage: (stage) => set((s) => ({ stage: s.stage === stage ? null : stage })),
  setQuery: (query) => set({ query }),
  toggleOnlyUsed: () => set((s) => ({ onlyUsed: !s.onlyUsed })),
  toggleExpanded: (id) => set((s) => ({ expanded: { ...s.expanded, [id]: !s.expanded[id] } })),
  clearFilters: () => set({ category: 'all', stage: null, query: '', onlyUsed: false }),
}))

const normalize = (text: string) =>
  text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export const filterResources = (
  { category, stage, query, onlyUsed }: Pick<ResourceState, 'category' | 'stage' | 'query' | 'onlyUsed'>,
  locale: 'es' | 'en',
): Resource[] => {
  const q = normalize(query.trim())
  return resources.filter(
    (r) =>
      (category === 'all' || r.category === category) &&
      (!stage || r.stage === stage) &&
      (!onlyUsed || r.used) &&
      (!q || normalize(`${r.name} ${r.summary[locale]} ${r.platforms.join(' ')}`).includes(q)),
  )
}
