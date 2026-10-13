import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { StudentAuthProvider } from './context/StudentAuthContext';
import routes from './routes';
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { MotionConfig } from 'framer-motion';

function App() {
    return (
        <ErrorBoundary>
            {/* Honour the phone/computer "reduce motion" setting everywhere */}
            <MotionConfig reducedMotion="user">
            <StudentAuthProvider>
                <Suspense fallback={<p role="status" className="p-8 text-center text-[17px] text-[#2D2D2D]">Loading…</p>}>
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
                </Suspense>
            </StudentAuthProvider>
            </MotionConfig>
        </ErrorBoundary>
    );
}

export default App;