import Main from './containers/Main';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Main />
        </AuthProvider>
    );
}

export default App;
