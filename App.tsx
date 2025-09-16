
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserRole } from './types';

// Layouts
import ClientLayout from './components/layout/ClientLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';

// Client Pages
import ClientDashboardPage from './pages/client/DashboardPage';
import NotificationsListPage from './pages/client/NotificationsListPage';
import SelectBlueprintPage from './pages/client/SelectBlueprintPage';
import NotificationEditorPage from './pages/client/NotificationEditorPage';
import EditNotificationPage from './pages/client/EditNotificationPage';
import NotificationDetailPage from './pages/client/NotificationDetailPage';
import RecipientsPage from './pages/client/RecipientsPage';
import MyTemplatesPage from './pages/client/MyTemplatesPage';
import CreditsPage from './pages/client/CreditsPage';
import ProfilePage from './pages/client/ProfilePage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminApprovalsPage from './pages/admin/AdminApprovalsPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminClientsPage from './pages/admin/AdminClientsPage';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage';
import AdminNotificationApprovalPage from './pages/admin/AdminNotificationApprovalPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';


interface ProtectedRouteProps {
  children: React.ReactElement;
  role: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || user?.role !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Client Routes */}
            <Route path="/app" element={<ProtectedRoute role={UserRole.CLIENT}><ClientLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<ClientDashboardPage />} />
                <Route path="notifications" element={<NotificationsListPage />} />
                <Route path="notifications/new" element={<SelectBlueprintPage />} />
                <Route path="notifications/new/from-blueprint/:blueprintId" element={<NotificationEditorPage />} />
                <Route path="notifications/:id" element={<NotificationDetailPage />} />
                <Route path="notifications/:id/edit" element={<EditNotificationPage />} />
                <Route path="recipients" element={<RecipientsPage />} />
                <Route path="templates" element={<MyTemplatesPage />} />
                <Route path="credits" element={<CreditsPage />} />
                <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute role={UserRole.ADMIN}><AdminLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="approvals" element={<AdminApprovalsPage />} />
                <Route path="approvals/:id" element={<AdminNotificationApprovalPage />} />
                <Route path="notifications" element={<AdminNotificationsPage />} />
                <Route path="clients" element={<AdminClientsPage />} />
                <Route path="payments" element={<AdminPaymentsPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
