/**
 * Generic status state machine.
 *
 * ~25 entities in this ERP have a status lifecycle. Every one of them declares
 * its legal transitions here rather than allowing free-form status writes.
 *
 * The frontend uses this to render only legal actions.
 * The backend will use the SAME definition to enforce them.
 *
 * Ref: 06_MERN_IMPLEMENTATION_PLAN.md §4.7, Workshop §159-160
 */

export interface TransitionRule<S extends string> {
  to: S
  /** Label shown on the action that performs this transition. */
  label: string
  /** Permission required, e.g. "workshop:job-card:approve". */
  permission?: string
  /** Require a reason from the user (e.g. cancellation, hold). */
  requiresReason?: boolean
  /** Show a confirm dialog before transitioning. */
  confirm?: boolean
  /** Destructive — rendered in error red. */
  danger?: boolean
}

export type TransitionTable<S extends string> = Record<S, TransitionRule<S>[]>

export class StateMachine<S extends string> {
  constructor(
    readonly name: string,
    private readonly table: TransitionTable<S>,
  ) {}

  /** Transitions legally reachable from `from`. */
  transitionsFrom(from: S): TransitionRule<S>[] {
    return this.table[from] ?? []
  }

  can(from: S, to: S): boolean {
    return this.transitionsFrom(from).some((t) => t.to === to)
  }

  rule(from: S, to: S): TransitionRule<S> | undefined {
    return this.transitionsFrom(from).find((t) => t.to === to)
  }

  /**
   * Filter transitions by the permissions a user holds.
   * Used to render only the actions a user may actually perform.
   */
  allowed(from: S, permissions: string[]): TransitionRule<S>[] {
    return this.transitionsFrom(from).filter(
      (t) => !t.permission || permissions.includes(t.permission),
    )
  }

  /** Throws on an illegal transition. Server-side enforcement entry point. */
  assert(from: S, to: S): void {
    if (!this.can(from, to)) {
      throw new Error(`[${this.name}] Illegal transition: "${from}" → "${to}"`)
    }
  }

  /** Statuses with no outgoing transitions. */
  terminalStates(): S[] {
    return (Object.keys(this.table) as S[]).filter((s) => this.transitionsFrom(s).length === 0)
  }
}

export function defineStateMachine<S extends string>(
  name: string,
  table: TransitionTable<S>,
): StateMachine<S> {
  return new StateMachine(name, table)
}

/**
 * Process stage is a SEPARATE axis from operational status.
 * Workshop §160: "Do NOT treat them as identical."
 *
 * A job card can be at stage "Repair" while its status is "Waiting for Parts".
 */
export type StageState = 'complete' | 'current' | 'pending' | 'skipped' | 'error'

export interface StageDefinition {
  key: string
  label: string
}

/** Derive stage states from an ordered stage list and the current stage key. */
export function deriveStages(
  stages: StageDefinition[],
  currentKey: string,
  opts?: { skipped?: string[]; error?: string[] },
): Array<StageDefinition & { state: StageState }> {
  const currentIndex = stages.findIndex((s) => s.key === currentKey)
  return stages.map((stage, i) => {
    if (opts?.error?.includes(stage.key)) return { ...stage, state: 'error' as const }
    if (opts?.skipped?.includes(stage.key)) return { ...stage, state: 'skipped' as const }
    if (currentIndex === -1) return { ...stage, state: 'pending' as const }
    if (i < currentIndex) return { ...stage, state: 'complete' as const }
    if (i === currentIndex) return { ...stage, state: 'current' as const }
    return { ...stage, state: 'pending' as const }
  })
}
