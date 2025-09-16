
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// This is a re-export of the useAuth hook from the context file itself.
// In a larger app, this might be a good separation, but for simplicity,
// we could also import `useAuth` directly from `contexts/AuthContext`.
// Let's stick with this pattern for good structure.
export { useAuth } from '../contexts/AuthContext';
