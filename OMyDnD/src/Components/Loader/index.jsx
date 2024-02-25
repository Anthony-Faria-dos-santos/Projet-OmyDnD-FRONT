import './style.scss'

function Loader() {

    return (
        <div id="container">
            <label className="loading-title">Loading ...</label>
            <span className="loading-circle sp1">
                <span className="loading-circle sp2">
                    <span className="loading-circle sp3"></span>
                </span>
            </span>
        </div>
    );
}

export default Loader;