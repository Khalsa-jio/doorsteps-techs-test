export default {
  name: "experiment",
  title: "Experiment",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slugName",
      title: "Slug Name",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "isEnabled",
      title: "Is Enabled",
      type: "boolean",
    },
    {
      name: "questions",
      title: "Custom Questions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "field_label",
              title: "Question",
              type: "string",
            },
            {
              name: "field_type",
              title: "Question Type",
              type: "string",
            },
            {
              name: "field_id",
              title: "Question ID",
              type: "string",
            },
            {
              name: "field_placeholder",
              title: "Question Placeholder",
              type: "string",
            },
            {
              name: "field_mandatory",
              title: "Question Mandatory",
              type: "string",
            },
            {
              name: "field_value",
              title: "Initial Value",
              type: "string",
            },
            {
              name: "field_options",
              title: "Options",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
}
/*
fields: [
  {
    name: "question",
    title: "Question",
    type: "string",
  },
  {
    name: "type",
    title: "Question Type",
    type: "string",
  },
  {
    name: "options",
    title: "Options",
    type: "string",
  },
], */
