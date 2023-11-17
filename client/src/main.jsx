import ReactDOM from 'react-dom/client';
// import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Here we import bootstrap for access to some additional styling

import App from './App';
import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import FriendProfilePage from './pages/FriendProfilePage.jsx';
import DashboardPage from './pages/DashBoardPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import AddFriendPage from './pages/AddFriendPage';
import ProfilePage from './pages/ProfilePage.jsx';
import EditProfile from './pages/EditProfile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: 'user/:userID',
        element: <FriendProfilePage />,
      },
      {
        path: 'chat/:chatID',
        element: <ChatPage />,
      },
      {
        path: 'users',
        element: <AddFriendPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage/>,
      },
      {
        path: 'edit-profile',
        element: <EditProfile/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
