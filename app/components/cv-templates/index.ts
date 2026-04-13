import CVBold from './CVBold'
import CVClassic from './CVClassic'
import CVMinimal from './CVMinimal'
import CVModern from './CVModern'

export { default as CVClassic } from './CVClassic'
export { default as CVModern } from './CVModern'
export { default as CVMinimal } from './CVMinimal'
export { default as CVBold } from './CVBold'

export const templates = {
  classic: CVClassic,
  modern: CVModern,
  minimal: CVMinimal,
  bold: CVBold,
} as const

export const templateLabels: Record<keyof typeof templates, string> = {
  classic: 'Classique',
  modern: 'Moderne',
  minimal: 'Minimaliste',
  bold: 'Audacieux',
}