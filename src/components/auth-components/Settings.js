import { useContext, useState, useEffect } from "react";
import { AccountContext } from "./auth-components/Account";
import ChangePassword from "./auth-components/ChangePassword";
import ChangeEmail from "./auth-components/ChangeEmail";

export default () => {
    const { getSession } = useContext(AccountContext);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        getSession().then(() => {
            setLoggedIn(true);
        });
    }, []);

    return (
        <div>
            {loggedIn && (
                <>
                    <h2>Settings</h2>
                    <ChangePassword />
                    <ChangeEmail />
                </>
            )}
        </div>
    )
}