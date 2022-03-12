export default {
  name: "formResponse",
  title: "Form Response",
  type: "document",
  fields: [
    {
      name: "experiment",
      title: "Experiment",
      type: "reference",
      to: [{ type: "experiment" }],
    },
    {
      name: "response",
      title: "Response",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
            },
            {
              name: "answer",
              title: "Answer",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
}
