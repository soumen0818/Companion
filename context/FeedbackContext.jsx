import React, { createContext, useContext, useState } from 'react';

const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {
    const [feedbackData, setFeedbackData] = useState([]);

    return (
        <FeedbackContext.Provider value={{ feedbackData, setFeedbackData }}>
            {children}
        </FeedbackContext.Provider>
    );
}

export function useFeedback() {
    const context = useContext(FeedbackContext);
    if (context === null) {
        throw new Error('useFeedback must be used within a FeedbackProvider');
    }
    return context;
}