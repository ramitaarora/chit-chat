import ReactDOM from 'react-dom/client';
// import App from './App';
// Here we import bootstrap for access to some additional styling

import App from './App.jsx';
import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import FriendProfilePage from './pages/FriendProfilePage.jsx';
import DashboardPage from './pages/DashBoardPage.jsx';

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
