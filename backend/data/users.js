import bcrypt from "bcryptjs";

const users = [
  {
    username: "Aditya Admin",
    email: "admin@aura.store",
    password: bcrypt.hashSync("admin123456", 10),
    isAdmin: true,
  },
  {
    username: "Aditya Customer",
    email: "customer@aura.store",
    password: bcrypt.hashSync("customer123456", 10),
    isAdmin: false,
  },
];

export default users;
