import React from "react";
import Home from "pages/Home";
import RootLayout from "layout/Root";
import ErrorPage from "./router/ErrorPage";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Users from "./pages/Users/User";
import UserEditor from "./pages/Users/UserEditor";
import Etc from "./pages/Assignments/Etc"; 
import { loadTeams } from "./pages/Assignments/Etc/Teams/Teams";
import { loadUserDataRolesAndInstitutions } from "./pages/Users/userUtil";
import ManageUserTypes, { loader as loadUsers } from "./pages/Administrator/ManageUserTypes";
import InstitutionEditor, { loadInstitution } from "./pages/Institutions/InstitutionEditor";
import Institutions, { loadInstitutions } from "./pages/Institutions/Institutions";
import RoleEditor, { loadAvailableRole } from "./pages/Roles/RoleEditor";
import Roles, { loadRoles } from "./pages/Roles/Roles";
import Login from "./pages/Authentication/Login";
import Logout from "./pages/Authentication/Logout";
import Assignment from "./pages/Assignments/Assignment"
import ProtectedRoute from "./router/ProtectedRoute";
import { ROLE } from "./utils/interfaces";
import AdministratorLayout from "./layout/Administrator";
import NotFound from "./router/NotFound";
import AssignReviews from "pages/Assignments/Etc/AssignReviewer";
import ViewSubmission from "pages/Assignments/Etc/ViewSubmission";
import Teams from "pages/Assignments/Etc/Teams/Teams"
// import AddParticipant from "pages/Assignments/Etc/AddParticipant";
// import DelayedJob from "pages/Assignments/Etc/DelayedJob";
// import ViewReports from "pages/Assignments/Etc/ViewReports";
// import ViewScores from "pages/Assignments/Etc/ViewScores";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <ProtectedRoute element={<Home />} /> },
        { path: "login", element: <Login /> },
        { path: "logout", element: <ProtectedRoute element={<Logout />} /> },
        {
          path: "assignments",
          element: <ProtectedRoute element={<Assignment />} leastPrivilegeRole={ROLE.TA} />
        },
        {
          path: "assignments/etc",
          element: <ProtectedRoute element={<Etc />} leastPrivilegeRole={ROLE.TA} />,
          children: [
            {
              path: "assignReviewer",
              element: <AssignReviews />,
            },
            {
              path: "submissions",
              element: <ViewSubmission />,
            },
            {
              path: "teams",
              element: <Teams />,
              loader: loadTeams
            }          
          ]
        },
        {
          path: "users",
          element: <ProtectedRoute element={<Users />} leastPrivilegeRole={ROLE.TA} />,
          children: [
            {
              path: "new",
              element: <UserEditor mode="create" />,
              loader: loadUserDataRolesAndInstitutions,
            },
            {
              path: "edit/:id",
              element: <UserEditor mode="update" />,
              loader: loadUserDataRolesAndInstitutions,
            },
          ],
        },
        {
          path: "administrator",
          element: (
            <ProtectedRoute element={<AdministratorLayout />} leastPrivilegeRole={ROLE.ADMIN} />
          ),
          children: [
            {
              id: "roles",
              path: "roles",
              element: <Roles />,
              loader: loadRoles,
              children: [
                {
                  path: "new",
                  element: <RoleEditor mode="create" />,
                },
                {
                  id: "edit-role",
                  path: "edit/:id",
                  element: <RoleEditor mode="update" />,
                  loader: loadAvailableRole,
                },
              ],
            },
            {
              path: "institutions",
              element: <Institutions />,
              loader: loadInstitutions,
              children: [
                {
                  path: "new",
                  element: <InstitutionEditor mode="create" />,
                },
                {
                  path: "edit/:id",
                  element: <InstitutionEditor mode="update" />,
                  loader: loadInstitution,
                },
              ],
            },
            {
              path: ":user_type",
              element: <ManageUserTypes />,
              loader: loadUsers,
              children: [
                {
                  path: "new",
                  element: <Navigate to="/users/new" />,
                },
                {
                  path: "edit/:id",
                  element: <Navigate to="/users/edit/:id" />,
                },
              ],
            },
          ],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;