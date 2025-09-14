import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {
    return (
        <ErrorBoundary>
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
                            index={child.index} // Pass the index prop if it exists
                            path={child.path} // Pass path if it exists
                            element={child.element}
                        />
                    ))}
                </Route>
            ))}
        </Routes>
        </ErrorBoundary>
    );
}

export default App;