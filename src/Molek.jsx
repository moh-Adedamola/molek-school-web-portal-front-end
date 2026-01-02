import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StudentAuthProvider } from './context/StudentAuthContext';
import routes from './routes';
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {
    return (
        <ErrorBoundary>
            <StudentAuthProvider>
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        >
                            {route.children?.map((child, childIndex) => (
                                <Route
                                    key={childIndex}
                                    index={child.index}
                                    path={child.path}
                                    element={child.element}
                                />
                            ))}
                        </Route>
                    ))}
                </Routes>
            </StudentAuthProvider>
        </ErrorBoundary>
    );
}

export default App;