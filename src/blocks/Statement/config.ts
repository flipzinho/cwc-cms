import type { Block } from 'payload'

export const StatementBlock: Block = {
  slug: 'statement',
  labels: {
    singular: 'Statement',
    plural: 'Statements',
  },
  fields: [
    {
      name: 'text',
      type: 'textarea', // alterado de 'text' para 'textarea' para editor simplificado
      required: true,
      label: 'Statement Text',
    },
  ],
}
