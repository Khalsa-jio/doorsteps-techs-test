// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export type FormData = {
  name: string
  type: string
}

export type QuestionInput = {
  _id?: string
  _key?: string
  field_label: string
  field_type: string
  field_id: string
  field_placeholder: string
  field_mandatory: string
  field_value: string
  field_options: string
}

export type Experiments = {
  _id: string
  name: string
  slugName: {
    _type: string
    current: string
  }
  description: string
  isEnabled: boolean
  questions?: Array<QuestionInput>
  masterQuestion?: Array<QuestionInput>
}

export type ExperimentInput = {
  _id?: string
  name: string
  slugName: string
  description: string
  questions?: Array<QuestionInput>
  masterQuestion?: Array<QuestionInput>
  isEnabled: boolean
}

export type QuestionFormData = {
  questions: QuestionInput[]
}

export type CheckboxMainProps = {
  isEnabled: boolean
  experimentId: string
}
