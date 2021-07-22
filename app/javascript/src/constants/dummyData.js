export default {
  notes: [
    {
      id: 1,
      title: "Test Note",
      description: "This is a test description",
      created_date: "Wed 21 July, 2021",
      due_date: "Thu 22 July 2021",
      tag: {
        id: 1,
        value: "internal",
        label: "Internal",
      },
      contact: {
        id: 1,
        value: "Mohit Harshan",
        label: "Mohit Harshan",
      },
    },
  ],
  contacts: [
    {
      id: 1,
      name: "Mohit Harshan",
      email: "mohit@gmail.com",
      contact_number: "949576566",
      department: { id: 1, value: "Engineering", label: "Engineering" },
    },
  ],
};
