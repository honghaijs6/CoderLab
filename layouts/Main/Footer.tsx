import Icon from "components/Icon";

const LIST = [
    'About',
    'Blog',
    'FAQs',
    'Private & term'
]
const Footer = () => {



    /*const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    */

    return (
        <footer className='site-footer'>
            <div className='container wrapper'>
                {
                    LIST.map((item, index) => {
                        return (
                            <a href="#" className="item text-white" key={index}>{item}</a>
                        )
                    })
                }
            </div>


            {/*<button onClick={scrollToTop} className="btn btn-rounded">
                <Icon name="arrowUp" style={{ marginLeft: 4, marginTop: -1 }} color="#777777" />
            </button>*/}

        </footer>
    )
}

export default Footer