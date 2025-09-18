# 🧩 Lab Auth Joins
This project demonstrates the use of **MySQL JOINs** with a Node.js + Express backend. It includes user authentication and reporting endpoints.

# 📌 JOINs Implemented
- **INNER JOIN** – Returns users who have at least one role.
- **LEFT JOIN** – Returns all users, along with their profile info if available.
- **RIGHT JOIN** – Returns all roles, including those not assigned to any user.
- **FULL OUTER JOIN (emulated)** – Combines users and profiles, showing all even if missing on either side.
- **CROSS JOIN** – Returns every possible combination of users and roles.
- **SELF JOIN** – Shows user referrals (who referred whom).
- **LEFT JOIN + Subquery** – Returns the latest login per user.

# 🚀 API Endpoints (`/api/reports`)
| Endpoint | Join Type | Purpose 
- `/users-with-roles` | INNER JOIN | List users and their assigned roles
- `/users-with-profiles` | LEFT JOIN | List all users with profile info if available
- `/roles-right-join` | RIGHT JOIN | List all roles and associated users, including unassigned roles
- `/profiles-full-outer` | FULL OUTER JOIN | Show all users and profiles, including missing ones
- `/user-role-combos` | CROSS JOIN| Show all possible user × role combinations
- `/referrals` | SELF JOIN | Show referrals between users
- `/latest-login` | LEFT JOIN + subquery | Show latest login info per user 

