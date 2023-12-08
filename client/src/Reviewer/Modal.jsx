import './Modal.css';

export default function Modal({ setIsModalOpen, commentary, JSONscoreArr }) {

    return (
        <>
            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <span className="close-button" onClick={() => setIsModalOpen(false)}>
                        &times;
                    </span>
                    <h4>Impact: {JSONscoreArr[0]}</h4>
                    <h4>Self: {JSONscoreArr[1]}</h4>
                    <h4>Examples: {JSONscoreArr[2]}</h4>
                    <h4>Prompt: {JSONscoreArr[3]}</h4>
                    <h4>Grammar: {JSONscoreArr[4]}</h4>
                    {commentary}
                </div>
            </div>
        </>
    );
}