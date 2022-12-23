
import { signIn } from "next-auth/react";
const LoginGate = () => {

    return (
        <>
            <figure className="fullscreen box-center " >
                <div>
                    <div>
                        <div className="text-organge" style={{ fontSize: 30, fontWeight: 300, marginBottom: 30 }}>
                            {`<CoderLab/>`}
                        </div>
                        <h4 style={{ marginBottom: 30 }}>Please try to login using your google account</h4>

                        <button onClick={() => signIn('google')} className="btn btn-primary">
                            Login with google
                        </button>
                    </div>


                </div>

            </figure>
            <div className="area" >
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div >
        </>
    )
}

export default LoginGate; 