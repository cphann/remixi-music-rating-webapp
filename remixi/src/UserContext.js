// UserContext.js
import { createContext } from 'react';

const UserContext = createContext({
    username: null,
    setUserSession: () => {}
});

export default UserContext;
