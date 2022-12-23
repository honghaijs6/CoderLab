
import MainLayout from "layouts/Main";
const Home = () => {

    return (
        <MainLayout >
            <div style={{ marginTop: 60 }}>

                <div className="container">
                    <div style={{ height: '75vh', width: 1000, margin: 'auto', display: 'grid', placeItems: 'center' }}>
                        <div style={{ textAlign: 'center', color: '#fff' }}>
                            <h2 className="font-62">Collaborative environment</h2>
                            <p className="mt-2 font-26">
                                Together we learn, improving, playing, and meet experts from anywhere in the world
                            </p>
                        </div>
                    </div>
                </div>

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
            </div>
        </MainLayout>
    )
}

export default Home