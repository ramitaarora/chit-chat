import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Here we import bootstrap for access to some additional styling

import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import FriendProfilePage from './pages/FriendProfilePage.jsx';
import DashboardPage from './pages/DashBoardPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

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
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
