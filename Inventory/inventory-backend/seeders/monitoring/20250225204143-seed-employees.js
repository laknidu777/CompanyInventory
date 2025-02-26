import { Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Employees", [
      {
        emp_name: "John Doe",
        emp_email: "johndoe@example.com",
        emp_contact_number: "0987654321",
        emp_role: "Super Admin",
        emp_designation: "CEO",
        emp_department: "Top Board",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emp_name: "Jane Smith",
        emp_email: "janesmith@example.com",
        emp_contact_number: "0987654322",
        emp_role: "Admin",
        emp_designation: "HR Manager",
        emp_department: "Human Resources",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emp_name: "Robert Brown",
        emp_email: "robertbrown@example.com",
        emp_contact_number: "0987654323",
        emp_role: "HR",
        emp_designation: "Recruitment Specialist",
        emp_department: "Human Resources",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emp_name: "Alice Green",
        emp_email: "alicegreen@example.com",
        emp_contact_number: "0987654324",
        emp_role: "Manager",
        emp_designation: "Operations Manager",
        emp_department: "Operations",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emp_name: "Michael Johnson",
        emp_email: "michaeljohnson@example.com",
        emp_contact_number: "0987654325",
        emp_role: "Viewer",
        emp_designation: "Project Supervisor",
        emp_department: "Projects",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Employees", null, {});
  },
};
