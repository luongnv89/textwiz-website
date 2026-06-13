import { Navigate } from 'react-router-dom';

/** Legacy /api-keys URL → merged setup guide */
export default function ApiKeysRedirect() {
  return <Navigate to="/getting-started#gemini" replace />;
}