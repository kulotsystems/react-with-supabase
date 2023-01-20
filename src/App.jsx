import './App.css';
import { useEffect, useState } from 'react';
import supabase from './lib/helper/supabase-client.js';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
       const getSession = async () => {
           const { data, error } = await supabase.auth.getSession();

           if(error) {

           }

           if(data) {
               setUser(data.session?.user);
           }
       };
       getSession().then(r => {});
    }, []);


    const login = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            redirectTo: window.location.origin
        });
    };

    const logout = async () => {
        const { data, error } = await supabase.auth.signOut();
        setUser(null);
    };


    return (
        <div className="App">
            { user ? (
                <div>
                    <h1>Authenticated</h1>
                    <img
                        src={ user.identities[0].identity_data.avatar_url }
                        alt={ user.identities[0].identity_data.preferred_username }
                        style={{ width: '100px', borderRadius: '50%' }}
                    />
                    <h3 style={{ margin: 0 }}>@{ user.identities[0].identity_data.preferred_username }</h3>
                    <p style={{ margin: 0 }}>{ user.email }</p>
                    <p style={{ margin: 0 }}>{ user.identities[0].identity_data.full_name}</p>

                    <button onClick={logout}>Logout</button>
                </div>
            )
            : (
                <div>
                    <h1>Unauthenticated</h1>
                    <button onClick={login}>Login with GitHub</button>
                </div>
            )}
        </div>
    )
}

export default App
