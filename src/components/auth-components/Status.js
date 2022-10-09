import { useContext, useState, useEffect } from "react";

import { AccountContext } from "./auth-components/Account";

const Status = () => {
    const [status, setStatus] = useState(false);
    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession().then(session => {
            setStatus(true);
        });
    }, []);

    return <div>
        { status ? <button onClick={logout}>Logout</button> : "Please Login again" }
    </div>

};

export default Status;