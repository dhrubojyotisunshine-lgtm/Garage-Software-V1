import { NoPermissionState, NotFoundState } from '@garage/ui'

/**
 * System pages.
 *
 * Permission failure renders an explanation, never a silent redirect —
 * silent redirects make users think the feature does not exist.
 * Ref: 02_NAVIGATION.md §16
 */

export function ForbiddenPage() {
  return <NoPermissionState what="this page" />
}

export function NotFoundPage() {
  return <NotFoundState what="page" />
}
