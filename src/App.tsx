import React, {useEffect, useState} from 'react';
import {Session} from "@supabase/supabase-js";
import {ChangeLanguageContainer, PasswordRecoveryModal} from "@/components";
import {useActionCreators} from "@/hook";
import {supabase} from "@/supaBase.config";
import {userActions} from "@/store/slices/userReducer";
import {getProductsTC} from "@/store/slices/productReducer";
import {useLocation} from "react-router-dom";

function App() {
    const [session, setSession] = useState<Session | null>(null);
    const location = useLocation();
    const actions = useActionCreators({getProductsTC, ...userActions});
    const type = location.pathname.split('/')[1];
    const [productType, setProductType] = useState(type || "food");
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => setSession(session));
        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session)
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                setSession(session);
            }
        });
    }, []);

    useEffect(() => {
        if (productType !== "volunteer") {
            actions.getProductsTC(productType);
        } else {
            console.log("volunteer app")
        }
        return () => {
            console.log('return app')
        };
    }, [productType]);

    const getRoute = (route: string) => {
        setProductType(route);
    }

    if (session) {
        actions.getSession(session);
    }

    return (
        <>
            <ChangeLanguageContainer
                setProductType={setProductType}
                productType={productType}
                getRoute={getRoute}
            />
            <PasswordRecoveryModal/>
        </>

    )
}

export default App;
